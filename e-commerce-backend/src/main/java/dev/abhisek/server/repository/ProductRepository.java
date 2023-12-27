package dev.abhisek.server.repository;

import dev.abhisek.server.entity.Category;
import dev.abhisek.server.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    Optional<Product> findProductById(String id);

    List<Product> findAllByCategory(Category category);
}
