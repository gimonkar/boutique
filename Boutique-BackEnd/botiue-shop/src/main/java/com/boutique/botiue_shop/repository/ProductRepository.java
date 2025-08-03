package com.boutique.botiue_shop.repository;



import com.boutique.botiue_shop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    // Find products by category
    List<Product> findByCategoryIgnoreCase(String category);

    // Find products by name containing (case insensitive)
    List<Product> findByNameContainingIgnoreCase(String name);

    // Find products in stock
    List<Product> findByInStockTrue();

    // Find products on sale
    List<Product> findBySaleTrue();

    // Find products by price range
    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

    // Find products by category and in stock
    List<Product> findByCategoryIgnoreCaseAndInStockTrue(String category);

    // Custom query to search products by name or description
    @Query("SELECT p FROM Product p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Product> searchProducts(@Param("searchTerm") String searchTerm);

    // Find products by multiple categories
    @Query("SELECT p FROM Product p WHERE p.category IN :categories")
    List<Product> findByCategories(@Param("categories") List<String> categories);

    // Find featured products (in stock and not on sale)
    @Query("SELECT p FROM Product p WHERE p.inStock = true ORDER BY p.createdAt DESC")
    List<Product> findFeaturedProducts();

    // Count products by category
    @Query("SELECT COUNT(p) FROM Product p WHERE p.category = :category")
    Long countByCategory(@Param("category") String category);

    // Find products with original price (on sale)
    @Query("SELECT p FROM Product p WHERE p.originalPrice IS NOT NULL AND p.sale = true")
    List<Product> findSaleProducts();

    // Find products by price range and category
    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :minPrice AND :maxPrice " +
            "AND (:category IS NULL OR p.category = :category)")
    List<Product> findByPriceRangeAndCategory(
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("category") String category
    );
}