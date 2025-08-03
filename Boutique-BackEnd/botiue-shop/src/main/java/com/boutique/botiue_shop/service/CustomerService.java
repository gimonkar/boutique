package com.boutique.botiue_shop.service;



import com.boutique.botiue_shop.entity.Customer;
import com.boutique.botiue_shop.repository.CustomerRepository;
import com.boutique.botiue_shop.exception.ResourceNotFoundException;
import com.boutique.botiue_shop.exception.DuplicateResourceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    // Get all customers
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Get customer by ID
    public Customer getCustomerById(String id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));
    }

    // Get customer by email
    public Customer getCustomerByEmail(String email) {
        return customerRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with email: " + email));
    }

    // Create new customer
    public Customer createCustomer(Customer customer) {
        validateCustomer(customer);

        // Check if email already exists
        if (customerRepository.existsByEmail(customer.getEmail())) {
            throw new DuplicateResourceException("Customer with email " + customer.getEmail() + " already exists");
        }

        return customerRepository.save(customer);
    }

    // Update existing customer
    public Customer updateCustomer(String id, Customer customerDetails) {
        Customer customer = getCustomerById(id);

        // Check if email is being changed and if new email already exists
        if (!customer.getEmail().equals(customerDetails.getEmail()) &&
                customerRepository.existsByEmail(customerDetails.getEmail())) {
            throw new DuplicateResourceException("Customer with email " + customerDetails.getEmail() + " already exists");
        }

        customer.setEmail(customerDetails.getEmail());
        customer.setFirstName(customerDetails.getFirstName());
        customer.setLastName(customerDetails.getLastName());
        customer.setPhone(customerDetails.getPhone());

        return customerRepository.save(customer);
    }

    // Delete customer
    public void deleteCustomer(String id) {
        Customer customer = getCustomerById(id);
        customerRepository.delete(customer);
    }

    // Search customers
    public List<Customer> searchCustomers(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getAllCustomers();
        }
        return customerRepository.searchCustomers(searchTerm.trim());
    }

    // Check if customer exists by email
    public boolean existsByEmail(String email) {
        return customerRepository.existsByEmail(email);
    }

    // Get customers with orders
    public List<Customer> getCustomersWithOrders() {
        return customerRepository.findCustomersWithOrders();
    }

    // Find customers by first name
    public List<Customer> getCustomersByFirstName(String firstName) {
        return customerRepository.findByFirstNameContainingIgnoreCase(firstName);
    }

    // Find customers by last name
    public List<Customer> getCustomersByLastName(String lastName) {
        return customerRepository.findByLastNameContainingIgnoreCase(lastName);
    }

    // Private validation method
    private void validateCustomer(Customer customer) {
        if (customer.getEmail() == null || customer.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Customer email is required");
        }
        if (!isValidEmail(customer.getEmail())) {
            throw new IllegalArgumentException("Invalid email format");
        }
        if (customer.getFirstName() != null && customer.getFirstName().trim().length() < 2) {
            throw new IllegalArgumentException("First name must be at least 2 characters long");
        }
        if (customer.getLastName() != null && customer.getLastName().trim().length() < 2) {
            throw new IllegalArgumentException("Last name must be at least 2 characters long");
        }
    }

    private boolean isValidEmail(String email) {
        return email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    }
}