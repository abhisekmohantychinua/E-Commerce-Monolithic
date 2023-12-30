package dev.abhisek.server.repository;

import dev.abhisek.server.entity.Order;
import dev.abhisek.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findAllByUser(User user);

    Optional<Order> findByIdAndUser(String id, User user);


}
