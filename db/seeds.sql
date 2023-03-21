INSERT INTO department (name)
VALUES ('Tech'),
       ('Finance'),
       ('Legal'),
       ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Recruiter', 70000, 4),
       ('Salesperson', 90000, 4),
       ('Sr Engineer', 170000, 1),
       ('Software Developer', 130000, 1),
       ('Account Bp', 200000, 2),
       ('Accountant', 140000, 2),
       ('Legal Ass', 85000, 3),
       ('Lawyer', 180000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Max', 'Rave', 1, 1),
       ('Jose', 'Vasquez', 2, NULL),
       ('Alex', 'Lopez', 3, 5),
       ('Karen', 'Chavez', 4, NULL),
       ('Graig', 'Love', 5, 3),
       ('Tom', 'Hawk', 6, NULL),
       ('Lary', 'Mars', 7, NULL),
       ('Harvy', 'Homes', 8, 7);