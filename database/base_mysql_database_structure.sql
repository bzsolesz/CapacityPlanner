/*
    - Run this script as root or similar admin user with permissions like: create user, create database etc.
    - This script was tested with MySQL database. If needed please create separated file for other DBMS
    - All users are created with temporary password that has to be reset at first login time by:
        mysql -u ${username} -p
        ALTER USER USER() IDENTIFIED BY '${new_password}';
*/

CREATE DATABASE capacity_planner;

CREATE USER 'capacity_planner'@'localhost' IDENTIFIED BY 'password123' PASSWORD EXPIRE;
CREATE USER 'child_service'@'localhost' IDENTIFIED BY 'password123' PASSWORD EXPIRE;

GRANT ALL ON capacity_planner.* TO 'capacity_planner'@'localhost' WITH GRANT OPTION;
