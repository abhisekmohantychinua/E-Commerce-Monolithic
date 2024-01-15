package dev.abhisek.server.repository;

import dev.abhisek.server.entity.Category;
import dev.abhisek.server.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    Page<Product> findAllByCategory(Category category, Pageable pageable);
}
