package com.boutique.botiue_shop.service;


import com.boutique.botiue_shop.entity.Product;
import com.boutique.botiue_shop.repository.ProductRepository;
import com.boutique.botiue_shop.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@Transactional

public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get product by ID
    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    // Create new product
    public Product createProduct(Product product) {
        validateProduct(product);
        return productRepository.save(product);
    }

    // Update existing product
    public Product updateProduct(String id, Product productDetails) {
        Product product = getProductById(id);

        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setOriginalPrice(productDetails.getOriginalPrice());
        product.setImage(productDetails.getImage());
        product.setCategory(productDetails.getCategory());
        product.setSale(productDetails.getSale());
        product.setInStock(productDetails.getInStock());

        return productRepository.save(product);
    }

    // Delete product
    public void deleteProduct(String id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }

    // Get products by category
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryIgnoreCase(category);
    }

    // Search products by name or description
    public List<Product> searchProducts(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getAllProducts();
        }
        return productRepository.searchProducts(searchTerm.trim());
    }

    // Get products in stock
    public List<Product> getInStockProducts() {
        return productRepository.findByInStockTrue();
    }

    // Get products on sale
    public List<Product> getSaleProducts() {
        return productRepository.findBySaleTrue();
    }

    // Get products by price range
    public List<Product> getProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return productRepository.findByPriceRangeAndCategory(minPrice, maxPrice, null);
    }

    // Get products by price range and category
    public List<Product> getProductsByPriceRangeAndCategory(BigDecimal minPrice, BigDecimal maxPrice, String category) {
        return productRepository.findByPriceRangeAndCategory(minPrice, maxPrice, category);
    }

    // Get featured products
    public List<Product> getFeaturedProducts() {
        return productRepository.findFeaturedProducts();
    }

    // Check if product exists
    public boolean existsById(String id) {
        return productRepository.existsById(id);
    }

    // Get product count by category
    public Long getProductCountByCategory(String category) {
        return productRepository.countByCategory(category);
    }

    // Update product stock status
    public Product updateStockStatus(String id, boolean inStock) {
        Product product = getProductById(id);
        product.setInStock(inStock);
        return productRepository.save(product);
    }

    // Update product sale status
    public Product updateSaleStatus(String id, boolean onSale, BigDecimal originalPrice) {
        Product product = getProductById(id);
        product.setSale(onSale);
        if (onSale && originalPrice != null) {
            product.setOriginalPrice(originalPrice);
        } else if (!onSale) {
            product.setOriginalPrice(null);
        }
        return productRepository.save(product);
    }

    // Private validation method
    private void validateProduct(Product product) {
        if (product.getName() == null || product.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Product name is required");
        }
        if (product.getPrice() == null || product.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Product price must be greater than 0");
        }
        if (product.getCategory() == null || product.getCategory().trim().isEmpty()) {
            throw new IllegalArgumentException("Product category is required");
        }
        if (product.getOriginalPrice() != null &&
                product.getOriginalPrice().compareTo(product.getPrice()) <= 0) {
            throw new IllegalArgumentException("Original price must be greater than current price");
        }
    }
}
