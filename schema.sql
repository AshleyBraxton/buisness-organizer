drop database if exists business_db;
create database business_db;

use business_db;

create table departments (
    id int not null primary key,
    name varchar(30) not null
);

create table roles (
    id int not null primary key,
    title varchar(30),
    salary decimal,
    department_id int,
    foreign key (department_id)
    references departments(id)
    on delete set null
);

create table employees (
    id int not null primary key,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int,
    foreign key (role_id)
    references roles(id)
    on delete set null,
    foreign key (manager_id)
    references employees(id)
    on delete set null
);

