package dev.abhisek.server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String address;
    private String city;
    @Column(length = 6)
    private String zip;
    @Column(length = 10)
    private String phone;
}
