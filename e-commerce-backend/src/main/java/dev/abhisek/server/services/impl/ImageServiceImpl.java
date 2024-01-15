package dev.abhisek.server.services.impl;

import dev.abhisek.server.services.ImageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageServiceImpl implements ImageService {

    public static final String PATH = "." + File.separator + "uploads";

    @Override
    public String saveImage(MultipartFile image) throws IOException {
        byte[] bytes = image.getBytes();
        String extension = image.getOriginalFilename().split("\\.")[1];
        String name = UUID.randomUUID() + "." + extension;

        File file = new File(PATH);
        if (!file.exists()) {
            file.mkdir();
        }

        Files.copy(image.getInputStream(), Paths.get(PATH + File.separator + name));

        return name;
    }

    @Override
    public void removeImage(String name) {
        File file = new File(PATH + File.separator + name);
        if (file.exists()) {
            file.delete();
        }
    }

    @Override
    public InputStream fetchImage(String name) throws FileNotFoundException {
        InputStream inputStream = new FileInputStream(PATH + File.separator + name);
        return inputStream;
    }
}
