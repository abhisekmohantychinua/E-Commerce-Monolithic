package dev.abhisek.server.repository;

import dev.abhisek.server.entity.Category;
import dev.abhisek.server.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    List<Product> findAllByCategory(Category category);
}
