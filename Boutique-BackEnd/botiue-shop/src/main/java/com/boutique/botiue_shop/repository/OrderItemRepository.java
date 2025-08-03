package com.boutique.botiue_shop.repository;


import com.boutique.botiue_shop.entity.OrderItem;
import com.boutique.botiue_shop.entity.Order;
import com.boutique.botiue_shop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, String> {

    // Find order items by order
    List<OrderItem> findByOrder(Order order);

    // Find order items by product
    List<OrderItem> findByProduct(Product product);

    // Find order items by order ID
    List<OrderItem> findByOrderId(String orderId);

    // Find order items by product ID
    List<OrderItem> findByProductId(String productId);

    // Custom query to find best selling products
    @Query("SELECT oi.product, SUM(oi.quantity) as totalSold FROM OrderItem oi " +
            "GROUP BY oi.product ORDER BY totalSold DESC")
    List<Object[]> findBestSellingProducts();

    // Calculate total quantity sold for a product
    @Query("SELECT SUM(oi.quantity) FROM OrderItem oi WHERE oi.product.id = :productId")
    Long getTotalQuantitySoldForProduct(@Param("productId") String productId);

    // Find order items with quantity greater than specified amount
    @Query("SELECT oi FROM OrderItem oi WHERE oi.quantity > :quantity")
    List<OrderItem> findByQuantityGreaterThan(@Param("quantity") Integer quantity);
}