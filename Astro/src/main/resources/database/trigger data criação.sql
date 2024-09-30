use astro_database;

delimiter $$

create trigger creation_date
before insert on cliente
for each row
begin
set New.cliente_creationDate = Now();
set New.cliente_lastAcess = New.cliente_creationDate;
end $$

delimiter ;

insert into cliente (cliente_email, cliente_hashword, cliente_username) 
values ('kaique@kaique', 'Love123', 'kaique123');