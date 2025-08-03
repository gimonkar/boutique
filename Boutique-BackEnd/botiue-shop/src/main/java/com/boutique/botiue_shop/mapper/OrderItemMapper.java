
package com.boutique.botiue_shop.mapper;

import com.boutique.botiue_shop.dto.OrderItemDTO;
import com.boutique.botiue_shop.entity.OrderItem;

public class OrderItemMapper {
    public static OrderItemDTO toDTO(OrderItem item) {
        if (item == null) return null;

        OrderItemDTO dto = new OrderItemDTO();
        dto.setId(item.getId());
        dto.setQuantity(item.getQuantity());
        dto.setSubtotal(item.getSubtotal());
        dto.setProduct(ProductMapper.toDTO(item.getProduct()));
        return dto;
    }
}
