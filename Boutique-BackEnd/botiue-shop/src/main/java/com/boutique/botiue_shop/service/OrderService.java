package com.boutique.botiue_shop.service;


import com.boutique.botiue_shop.entity.Order;
import com.boutique.botiue_shop.entity.OrderItem;
import com.boutique.botiue_shop.entity.Customer;
import com.boutique.botiue_shop.entity.Product;
import com.boutique.botiue_shop.repository.OrderRepository;
import com.boutique.botiue_shop.repository.OrderItemRepository;
import com.boutique.botiue_shop.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ProductService productService;

    // Get all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get order by ID
    public Order getOrderById(String id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
    }

    // Create new order
    public Order createOrder(Order order) {
        validateOrder(order);

        // Calculate total from order items
        BigDecimal calculatedTotal = calculateOrderTotal(order.getOrderItems());
        order.setTotal(calculatedTotal);

        Order savedOrder = orderRepository.save(order);

        // Save order items
        if (order.getOrderItems() != null) {
            for (OrderItem item : order.getOrderItems()) {
                item.setOrder(savedOrder);
                orderItemRepository.save(item);
            }
        }

        return savedOrder;
    }

    // Update order status
    public Order updateOrderStatus(String id, Order.OrderStatus status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        return orderRepository.save(order);
    }

    // Update order
    public Order updateOrder(String id, Order orderDetails) {
        Order order = getOrderById(id);

        order.setTotal(orderDetails.getTotal());
        order.setStatus(orderDetails.getStatus());
        order.setShippingAddress(orderDetails.getShippingAddress());

        return orderRepository.save(order);
    }

    // Delete order
    public void deleteOrder(String id) {
        Order order = getOrderById(id);
        orderRepository.delete(order);
    }

    // Get orders by customer
    public List<Order> getOrdersByCustomer(String customerId) {
        Customer customer = customerService.getCustomerById(customerId);
        return orderRepository.findByCustomer(customer);
    }

    // Get orders by customer email
    public List<Order> getOrdersByCustomerEmail(String email) {
        return orderRepository.findByCustomerEmail(email);
    }

    // Get orders by status
    public List<Order> getOrdersByStatus(Order.OrderStatus status) {
        return orderRepository.findByStatus(status);
    }

    // Get orders by date range
    public List<Order> getOrdersByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return orderRepository.findByCreatedAtBetween(startDate, endDate);
    }

    // Get recent orders
    public List<Order> getRecentOrders() {
        return orderRepository.findRecentOrders();
    }

    // Add item to order
    public Order addItemToOrder(String orderId, String productId, Integer quantity) {
        Order order = getOrderById(orderId);
        Product product = productService.getProductById(productId);

        if (!product.getInStock()) {
            throw new IllegalArgumentException("Product is out of stock");
        }

        OrderItem orderItem = new OrderItem(order, product, quantity, product.getPrice());
        orderItemRepository.save(orderItem);

        // Recalculate order total
        List<OrderItem> orderItems = orderItemRepository.findByOrder(order);
        BigDecimal newTotal = calculateOrderTotal(orderItems);
        order.setTotal(newTotal);

        return orderRepository.save(order);
    }

    // Remove item from order
    public Order removeItemFromOrder(String orderId, String orderItemId) {
        Order order = getOrderById(orderId);
        OrderItem orderItem = orderItemRepository.findById(orderItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Order item not found with id: " + orderItemId));

        orderItemRepository.delete(orderItem);

        // Recalculate order total
        List<OrderItem> orderItems = orderItemRepository.findByOrder(order);
        BigDecimal newTotal = calculateOrderTotal(orderItems);
        order.setTotal(newTotal);

        return orderRepository.save(order);
    }

    // Get order items by order
    public List<OrderItem> getOrderItemsByOrder(String orderId) {
        Order order = getOrderById(orderId);
        return orderItemRepository.findByOrder(order);
    }

    // Calculate total revenue
    public BigDecimal calculateTotalRevenue() {
        BigDecimal revenue = orderRepository.calculateTotalRevenue();
        return revenue != null ? revenue : BigDecimal.ZERO;
    }

    // Get order count by status
    public Long getOrderCountByStatus(Order.OrderStatus status) {
        return orderRepository.countByStatus(status);
    }

    // Get best selling products
    public List<Object[]> getBestSellingProducts() {
        return orderItemRepository.findBestSellingProducts();
    }

    // Private helper methods
    private BigDecimal calculateOrderTotal(List<OrderItem> orderItems) {
        if (orderItems == null || orderItems.isEmpty()) {
            return BigDecimal.ZERO;
        }

        return orderItems.stream()
                .map(OrderItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private void validateOrder(Order order) {
        if (order.getCustomer() == null) {
            throw new IllegalArgumentException("Order must have a customer");
        }
        if (order.getOrderItems() == null || order.getOrderItems().isEmpty()) {
            throw new IllegalArgumentException("Order must have at least one item");
        }

        // Validate each order item
        for (OrderItem item : order.getOrderItems()) {
            if (item.getProduct() == null) {
                throw new IllegalArgumentException("Order item must have a product");
            }
            if (item.getQuantity() == null || item.getQuantity() <= 0) {
                throw new IllegalArgumentException("Order item quantity must be greater than 0");
            }
            if (item.getPrice() == null || item.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
                throw new IllegalArgumentException("Order item price must be greater than 0");
            }
        }
    }
}
