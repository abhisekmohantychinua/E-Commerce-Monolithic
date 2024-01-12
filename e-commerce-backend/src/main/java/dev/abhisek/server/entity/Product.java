package dev.abhisek.server.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class Product {
    @Id
    private String id;
    private String name;
    @Enumerated
    private Category category;
    private Integer price;
    private Integer quantity;
    private String imgUrl;

}
