
package com.boutique.botiue_shop.mapper;

import com.boutique.botiue_shop.dto.ProductDTO;
import com.boutique.botiue_shop.entity.Product;

public class ProductMapper {
    public static ProductDTO toDTO(Product product) {
        if (product == null) return null;

        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        return dto;
    }
}
