package com.example.Astro.Model;

import org.apache.catalina.User;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;

public class DAO {
    private DataSource dataSource;
    /*

    ---------------------------------------------------------------------------------------------------------------
        Criando Objeto para acessar a classe UserBeans
    ---------------------------------------------------------------------------------------------------------------

     */

    public ArrayList<UserBeans> listarUser() {
        // Criando um objeto para acessar a classe UserBeans
        ArrayList<UserBeans> clientes = new ArrayList<>();
        String read = "Select * from cliente";

        try {
            // Abrindo Conexão com o Banco de Dados
            Connection con = dataSource.getConnection();

            // Preparar a query para a execução no banco de dados
            PreparedStatement pst = con.prepareStatement(read);
            ResultSet rs = pst.executeQuery();
            // O laço abaixo será executado enquanto houver clientes a serem listados
            while (rs.next()) {
                // Variáveis de apoio que recebem os dados da Data Base
                String id_cliente = rs.getString(1);
                String cliente_email = rs.getString(2);
                String cliente_hashword = rs.getString(3);
                String cliente_username = rs.getString(4);
                String cliente_creationDate = rs.getString(5);
                String cliente_lastAcess = rs.getString(6);

                // populando o arraylist
                clientes.add(new UserBeans(id_cliente,cliente_email,cliente_hashword,cliente_username,
                        cliente_creationDate, cliente_lastAcess));

            }

            con.close();
            return clientes;

        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    /*

    ---------------------------------------------------------------------------------------------------------------
        CRUD - CREATE
            USUÁRIO
    ---------------------------------------------------------------------------------------------------------------

     */

    public void insertUser(UserBeans usuario) {
        String insert = "insert into cliente (cliente_email, cliente_hashword, cliente_username) values " +
                "(?, ?, ?)";
        try {
            // Abrindo Conexão
            Connection con = dataSource.getConnection();
            //Preparando a query
            PreparedStatement pst = con.prepareStatement(insert);
            //Substituir parâmetros (?) pelo contudo das variaveis
            pst.setString(1, usuario.getClienteEmail());
            pst.setString(2, usuario.getClienteHashWord());
            pst.setString(3, usuario.getClienteUsername());
            //Executar a query
            pst.executeUpdate();
            //Encerrando conexão com database
            con.close();


        } catch (Exception e) {
            System.out.println(e);
        }
    }
}