/*
package com.example.Astro.Service;


import com.example.Astro.Model.DAO;
import com.example.Astro.Model.User;
import com.example.Astro.Repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.io.IOException;

@Service
public class UserService {

    User usuario;

    public UserService() {
        User usuario = new User(12345L, "kaiqu@kaique", "kaique123", "Kaique-2704");
        DAO dao = new DAO();



        private void novoUsuario(@ModelAttribute User){

            // setar as variaveis JavaBeans
            usuario.setClienteUsername();
            usuario.setClienteEmail(request.getParameter("email"));
            usuario.setClienteHashWord(request.getParameter("password"));

            // invocar o método inserirContato passando o objeto contato
            dao.insertUser(usuario);

            dao.listarUser(usuario);
            usuario.setId(usuario.getId());


            // redirecionar para o documento home.jsp
            response.sendRedirect("./home.jsp");
        }

    }

    /*
    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        user.setClienteHashWord(user.getClienteHashWord());
        return userRepository.save(user);
    }


}
*/