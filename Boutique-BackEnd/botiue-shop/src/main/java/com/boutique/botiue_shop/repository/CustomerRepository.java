package com.boutique.botiue_shop.repository;



import com.boutique.botiue_shop.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {

    // Find customer by email
    Optional<Customer> findByEmail(String email);

    // Check if email exists
    boolean existsByEmail(String email);

    // Find customers by first name
    List<Customer> findByFirstNameContainingIgnoreCase(String firstName);

    // Find customers by last name
    List<Customer> findByLastNameContainingIgnoreCase(String lastName);

    // Find customers by phone
    Optional<Customer> findByPhone(String phone);

    // Custom query to search customers by name or email
    @Query("SELECT c FROM Customer c WHERE " +
            "LOWER(c.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(c.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(c.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Customer> searchCustomers(@Param("searchTerm") String searchTerm);

    // Find customers with orders
    @Query("SELECT DISTINCT c FROM Customer c JOIN c.orders o")
    List<Customer> findCustomersWithOrders();
}
