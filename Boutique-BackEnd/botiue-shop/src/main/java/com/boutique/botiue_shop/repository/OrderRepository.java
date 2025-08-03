package com.boutique.botiue_shop.repository;


import com.boutique.botiue_shop.entity.Order;
import com.boutique.botiue_shop.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    // Find orders by customer
    List<Order> findByCustomer(Customer customer);

    // Find orders by customer ID
    List<Order> findByCustomerId(String customerId);

    // Find orders by status
    List<Order> findByStatus(Order.OrderStatus status);

    // Find orders by date range
    List<Order> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);

    // Find orders by customer and status
    List<Order> findByCustomerAndStatus(Customer customer, Order.OrderStatus status);

    // Find orders by total amount range
    List<Order> findByTotalBetween(BigDecimal minTotal, BigDecimal maxTotal);

    // Custom query to find recent orders
    @Query("SELECT o FROM Order o ORDER BY o.createdAt DESC")
    List<Order> findRecentOrders();

    // Find orders by customer email
    @Query("SELECT o FROM Order o WHERE o.customer.email = :email")
    List<Order> findByCustomerEmail(@Param("email") String email);

    // Calculate total revenue
    @Query("SELECT SUM(o.total) FROM Order o WHERE o.status != 'CANCELLED'")
    BigDecimal calculateTotalRevenue();

    // Count orders by status
    @Query("SELECT COUNT(o) FROM Order o WHERE o.status = :status")
    Long countByStatus(@Param("status") Order.OrderStatus status);

    // Find top customers by order count
    @Query("SELECT o.customer, COUNT(o) as orderCount FROM Order o " +
            "GROUP BY o.customer ORDER BY orderCount DESC")
    List<Object[]> findTopCustomersByOrderCount();
}