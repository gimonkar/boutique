package com.boutique.botiue_shop.controller;


import com.boutique.botiue_shop.entity.Product;
import com.boutique.botiue_shop.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "https://laxmi-boutique.onrender.com")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Get all products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    // Create new product
    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) {
        Product createdProduct = productService.createProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    // Update existing product
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id,
                                                 @Valid @RequestBody Product productDetails) {
        Product updatedProduct = productService.updateProduct(id, productDetails);
        return ResponseEntity.ok(updatedProduct);
    }

    // Delete product
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    // Get products by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category) {
        List<Product> products = productService.getProductsByCategory(category);
        return ResponseEntity.ok(products);
    }

    // Search products
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String q) {
        List<Product> products = productService.searchProducts(q);
        return ResponseEntity.ok(products);
    }

    // Get products in stock
    @GetMapping("/in-stock")
    public ResponseEntity<List<Product>> getInStockProducts() {
        List<Product> products = productService.getInStockProducts();
        return ResponseEntity.ok(products);
    }

    // Get products on sale
    @GetMapping("/sale")
    public ResponseEntity<List<Product>> getSaleProducts() {
        List<Product> products = productService.getSaleProducts();
        return ResponseEntity.ok(products);
    }

    // Get featured products
    @GetMapping("/featured")
    public ResponseEntity<List<Product>> getFeaturedProducts() {
        List<Product> products = productService.getFeaturedProducts();
        return ResponseEntity.ok(products);
    }

    // Get products by price range
    @GetMapping("/price-range")
    public ResponseEntity<List<Product>> getProductsByPriceRange(
            @RequestParam BigDecimal minPrice,
            @RequestParam BigDecimal maxPrice,
            @RequestParam(required = false) String category) {

        List<Product> products;
        if (category != null && !category.isEmpty()) {
            products = productService.getProductsByPriceRangeAndCategory(minPrice, maxPrice, category);
        } else {
            products = productService.getProductsByPriceRange(minPrice, maxPrice);
        }
        return ResponseEntity.ok(products);
    }

    // Update product stock status
    @PatchMapping("/{id}/stock")
    public ResponseEntity<Product> updateStockStatus(@PathVariable String id,
                                                     @RequestParam boolean inStock) {
        Product updatedProduct = productService.updateStockStatus(id, inStock);
        return ResponseEntity.ok(updatedProduct);
    }

    // Update product sale status
    @PatchMapping("/{id}/sale")
    public ResponseEntity<Product> updateSaleStatus(@PathVariable String id,
                                                    @RequestParam boolean onSale,
                                                    @RequestParam(required = false) BigDecimal originalPrice) {
        Product updatedProduct = productService.updateSaleStatus(id, onSale, originalPrice);
        return ResponseEntity.ok(updatedProduct);
    }

    // Get product count by category
    @GetMapping("/count/category/{category}")
    public ResponseEntity<Long> getProductCountByCategory(@PathVariable String category) {
        Long count = productService.getProductCountByCategory(category);
        return ResponseEntity.ok(count);
    }
}
