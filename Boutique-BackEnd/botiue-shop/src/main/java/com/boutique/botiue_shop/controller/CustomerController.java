
package com.boutique.botiue_shop.controller;

import com.boutique.botiue_shop.dto.CustomerDTO;
import com.boutique.botiue_shop.entity.Customer;
import com.boutique.botiue_shop.mapper.CustomerMapper;
import com.boutique.botiue_shop.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public ResponseEntity<List<CustomerDTO>> getAllCustomers() {
        List<Customer> customers = customerService.getAllCustomers();
        List<CustomerDTO> customerDTOs = customers.stream()
                .map(CustomerMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(customerDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerDTO> getCustomerById(@PathVariable String id) {
        Customer customer = customerService.getCustomerById(id);
        if (customer == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(CustomerMapper.toDTO(customer));
    }

    @PostMapping
    public ResponseEntity<CustomerDTO> createCustomer(@Valid @RequestBody Customer customer) {
        Customer created = customerService.createCustomer(customer);
        return new ResponseEntity<>(CustomerMapper.toDTO(created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerDTO> updateCustomer(@PathVariable String id, @Valid @RequestBody Customer customer) {
        Customer updated = customerService.updateCustomer(id, customer);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(CustomerMapper.toDTO(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable String id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }
}
