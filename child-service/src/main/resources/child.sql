create table child (
    id int auto_increment primary key not null,
    first_name varchar(50) not null,
    surname varchar(50) not null,
    date_of_birth date not null
);

insert into child (first_name, surname, date_of_birth) values ("Zsolt", "Balogh", str_to_date("07/07/1980", "%d/%m/%Y"));
insert into child (first_name, surname, date_of_birth) values ("Dorina", "Dinnyesi", str_to_date("26/01/1981", "%d/%m/%Y"));