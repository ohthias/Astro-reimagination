package com.example.Astro;

import com.example.Astro.Model.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AstroApplication {

	public static void main(String[] args) {
		SpringApplication.run(AstroApplication.class, args);
	}

}
