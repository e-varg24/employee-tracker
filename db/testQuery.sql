-- shows all department
SELECT
    id,
    name
FROM
    department
ORDER BY
    id ASC;

-- shows all rows query
SELECT
    role.id,
    role.title,
    department.name AS department,
    role.salary
FROM
    role
    LEFT JOIN department ON department.id = role.department_id
ORDER BY
    role.id ASC;

-- employee querry
SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    department.name AS department,
    role.salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
From
    employee
    LEFT JOIN role ON role.id = employee.role_id
    LEFT JOIN department ON department.id = role.department_id
    LEFT Join employee AS manager ON manager.id = employee.manager_id
ORDER BY
    employee.id ASC;

-- employees shown by manager
SELECT
    manager.id,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager,
    department.name AS department,
    COUNT(employee.id) AS total_num_of_employee,
    GROUP_CONCAT(
        DISTINCT CONCAT(employee.first_name, ' ', employee.last_name)
        ORDER BY employee.first_name
        SEPARATOR ', '
        ) AS employees
From
    employee
    LEFT JOIN role ON role.id = employee.role_id
    LEFT JOIN department ON department.id = role.department_id
    LEFT Join employee AS manager ON manager.id = employee.manager_id
WHERE
    manager.id IS NOT NULL
GROUP BY
    manager.id
ORDER BY
    manager.id ASC;

-- employes showen by dep
SELECT
    department.id,
    department.name AS department,
    COUNT(employee.id) AS total_num_of_employee,
    GROUP_CONCAT(
        DISTINCT CONCAT(employee.first_name, ' ', employee.last_name)
        ORDER BY employee.first_name
        SEPARATOR ', '
        ) AS employees
From
    department
    LEFT JOIN role ON role.department_id = department.id
    LEFT JOIN employee ON employee.role_id = role.id
    LEFT Join employee AS manager ON manager.id = employee.manager_id
GROUP BY
    department.name
ORDER BY
    department.id ASC;

-- deparment budget querry
SELECT
    department.id,
    department.name AS department,
    SUM(role.salary) AS total_utilized_budget
From
    department
    LEFT JOIN role ON role.department_id = department.id
    LEFT JOIN employee ON employee.role_id = role.id
    LEFT Join employee AS manager ON manager.id = employee.manager_id
GROUP BY
    department.name
ORDER BY
    department.id ASC;