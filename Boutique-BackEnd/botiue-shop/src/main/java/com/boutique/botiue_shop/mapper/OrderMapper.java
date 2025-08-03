
package com.boutique.botiue_shop.mapper;

import com.boutique.botiue_shop.dto.*;
import com.boutique.botiue_shop.entity.Order;
import com.boutique.botiue_shop.entity.Customer;
import com.boutique.botiue_shop.entity.OrderItem;

import java.util.List;
import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderDTO toDTO(Order order) {
        if (order == null) return null;

        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setTotal(order.getTotal());
        dto.setStatus(order.getStatus().toString());
        dto.setShippingAddress(order.getShippingAddress());
        dto.setCreatedAt(order.getCreatedAt());

        Customer customer = order.getCustomer();
        if (customer != null) {
            CustomerSimpleDTO customerDTO = new CustomerSimpleDTO();
            customerDTO.setId(customer.getId());
            customerDTO.setFirstName(customer.getFirstName());
            customerDTO.setLastName(customer.getLastName());
            dto.setCustomer(customerDTO);
        }

        List<OrderItem> items = order.getOrderItems();
        if (items != null) {
            dto.setOrderItems(items.stream()
                .map(OrderItemMapper::toDTO)
                .collect(Collectors.toList()));
        }

        return dto;
    }
}
