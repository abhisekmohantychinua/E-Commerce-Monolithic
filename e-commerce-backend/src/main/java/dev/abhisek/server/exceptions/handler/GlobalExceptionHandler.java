package dev.abhisek.server.exceptions.handler;

import dev.abhisek.server.dto.ExceptionDto;
import dev.abhisek.server.exceptions.OrderException;
import dev.abhisek.server.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler({OrderException.class})
    public ResponseEntity<ExceptionDto> handleOrderException(OrderException e) {
        return new ResponseEntity<>(new ExceptionDto(e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ResourceNotFoundException.class})
    public ResponseEntity<ExceptionDto> handleResourceNotFoundException(ResourceNotFoundException e) {
        return new ResponseEntity<>(new ExceptionDto(e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({UsernameNotFoundException.class})
    public ResponseEntity<ExceptionDto> handleUsernameNotFoundException(UsernameNotFoundException e) {
        return new ResponseEntity<>(new ExceptionDto(e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity<ExceptionDto> handleAccessDeniedException(AccessDeniedException e) {
        return new ResponseEntity<>(new ExceptionDto("Access denied!"), HttpStatus.FORBIDDEN);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionDto> handleAnyException(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(new ExceptionDto("Some error occurred!"), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
