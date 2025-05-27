package com.pi.emma;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.pi.emma.view.Home;

import javax.swing.*;

@SpringBootApplication
public class EmmaApplication {
    public static void main(String[] args) {
        SpringApplication.run(EmmaApplication.class, args);
    }
}