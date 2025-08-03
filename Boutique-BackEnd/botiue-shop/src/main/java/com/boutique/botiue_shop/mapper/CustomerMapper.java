
package com.boutique.botiue_shop.mapper;

import com.boutique.botiue_shop.dto.CustomerDTO;
import com.boutique.botiue_shop.entity.Customer;
import com.boutique.botiue_shop.entity.Order;

import java.util.List;
import java.util.stream.Collectors;

public class CustomerMapper {

    public static CustomerDTO toDTO(Customer customer) {
        if (customer == null) return null;

        CustomerDTO dto = new CustomerDTO();
        dto.setId(customer.getId());
        dto.setEmail(customer.getEmail());
        dto.setFirstName(customer.getFirstName());
        dto.setLastName(customer.getLastName());
        dto.setPhone(customer.getPhone());
        dto.setCreatedAt(customer.getCreatedAt());

        List<Order> orders = customer.getOrders();
        if (orders != null) {
            dto.setOrders(orders.stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList()));
        }

        return dto;
    }
}
