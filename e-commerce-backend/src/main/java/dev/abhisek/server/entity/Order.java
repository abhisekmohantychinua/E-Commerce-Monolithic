package dev.abhisek.server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;

@Entity
@Table(name = "orders")
public class Order {
    @Setter
    @Getter
    @Id
    private String id;
    @Setter
    @Getter
    @ManyToOne
    private User user;
    @Setter
    @Getter
    @ManyToOne(fetch = FetchType.EAGER)
    private Product product;
    @Setter
    @Getter
    private Integer quantity;
    @Setter
    @Getter
    @CreatedDate
    private Date createdAt;
    private boolean isDelivered;
    @Setter
    @Getter
    @ManyToOne(fetch = FetchType.EAGER)
    private Address address;

    public Order() {
    }

    public boolean isDelivered() {
        return isDelivered;
    }

    public void setDelivered(boolean delivered) {
        isDelivered = delivered;
    }

}
