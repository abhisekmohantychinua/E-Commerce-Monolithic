package dev.abhisek.server.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

public interface ImageService {
    String saveImage(MultipartFile image) throws IOException;

    void removeImage(String name);

    InputStream fetchImage(String url) throws FileNotFoundException;
}
