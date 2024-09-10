package com.example.Astro;

import com.example.Astro.Model.DAO;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AstroApplication {

	public static void main(String[] args) {

		DAO dao = new DAO();
		dao.testeConexao();


	}

}
