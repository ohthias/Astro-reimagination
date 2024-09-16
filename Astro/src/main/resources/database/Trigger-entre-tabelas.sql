use astro_database;

DELIMITER $$

CREATE TRIGGER after_cliente_insert
AFTER INSERT ON cliente
FOR EACH ROW
BEGIN
    -- Inserção na tabela linking
    INSERT INTO linking (id_cliente, linking_vinculo)
    VALUES (NEW.id_cliente, 0); -- 0 é o valor padrão que estou assumindo para "linking_vinculo". Altere conforme necessário.

    -- Inserção na tabela access_level
    INSERT INTO access_level (id_cliente, acces_leve_admAccess, access_level_add_music)
    VALUES (NEW.id_cliente, 0, 0); -- Assumindo que ambos os campos de nível de acesso começam com 0, altere conforme necessário.
END$$

DELIMITER ;

insert into cliente (cliente_email, cliente_hashword, cliente_username)
values ('matheus@matheus', 'matheus123', 'ohthias');