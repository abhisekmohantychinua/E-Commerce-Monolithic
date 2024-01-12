package dev.abhisek.server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Entity
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private String phone;
    @Enumerated
    private Role role;

    @OneToMany
    private List<Cart> carts;
    @OneToMany(fetch = FetchType.EAGER)
    private List<Address> addresses;

    @OneToMany(mappedBy = "user")
    private List<Order> orders;

    public User() {
    }

}
