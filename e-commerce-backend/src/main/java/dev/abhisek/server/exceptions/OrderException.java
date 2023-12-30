package dev.abhisek.server.exceptions;

public class OrderException extends RuntimeException {
    public OrderException(String message) {
        super(message);
    }
}
