CREATE VIEW cliente_info AS
SELECT 
    c.id_cliente, 
    c.cliente_username, 
    l.linking_vinculo, 
    a.acces_leve_admAccess, 
    a.access_level_add_music
FROM 
    cliente c
JOIN 
    linking l ON c.id_cliente = l.id_cliente
JOIN 
    access_level a ON c.id_cliente = a.id_cliente;
