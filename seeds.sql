insert into departments (id, name)
values (01, 'Legal'),
       (02, 'Sales'),
       (03, 'Marketing'),
       (04, 'Finance'),
       (05, 'Engineering');

insert into roles (id, title, salary, department_id)
values (001, 'Legal Team Lead', 190000, 01),
       (002, 'Attourney', 150000, 01),
       (003, 'Paralegal', 125000, 01),
       (004, 'Litigation Attourney', 150000, 01),
       (005, 'Legal Counselor', 139000, 01),
       (006, 'Director of Sales', 13000, 02),
       (007, 'Sales Representative', 120000, 02),
       (008, 'Account Executive', 125000, 02),
       (009, 'Sales Consultant', 120000, 02),
       (010, 'Marketing Coordinator', 100000, 03),
       (011, 'Market Research Analyst', 90000, 03),
       (012, 'Marketing Coordinator', 90000, 03),
       (013, 'Marketing Assistant', 80000, 03),
       (014, 'Social Media Specialist', 85000, 03),
       (015, 'Financial Team Lead', 160000, 04),
       (016, 'Financial Analyst', 150000, 04),
       (017, 'Senior Accountant', 140000, 04),
       (018, 'Junior Accountant', 130000, 04),
       (019, 'Lead Engineer', 190000, 05),
       (020, 'Business Engineer', 180000, 05);

insert into employees (id, first_name, last_name, role_id, manager_id)
values (10101, 'Jake', 'Compton', 019, null),
       (10102, 'Quinn', 'Kirkland', 006, null),
       (10103, 'Elias', 'Glass', 001, null),
       (10104, 'Olivia', 'Price', 010, null),
       (10105, 'Rachel', 'Parks', 015, null),
       (10106, 'Jasper', 'Miles', 002, 10103),
       (10107, 'Kerry', "O'Neil", 003, 10103),
       (10108, 'Alyson', 'Schmitt', 003, 10103),
       (10109, 'Dave', 'Garner', 004, 10103),
       (10110, 'Elizabeth', 'Chung', 005, 10103),
       (10111, 'Magdalena', 'Dorsey', 007, 10102),
       (10112, 'Ali', 'Taylor', 008, 10102),
       (10113, 'Derick', 'Matthews', 009, 10102),
       (10114, 'Meghan', 'Hale', 011, 10104),
       (10115, 'Octavia', 'Blake', 012, 10104),
       (10116, 'Forrest', 'Wise', 013, 10104),
       (10117, 'Carissa', 'Friedman', 013, 10104),
       (10118, 'Mark', 'Meritt', 014, 10104),
       (10119, 'Vanessa', 'Hebert', 016, 10105),
       (10120, 'Allison', 'Newman', 017, 10105),
       (10121, 'Aline', 'Hugehes', 018, 10120),
       (10122, 'Velma', 'Chapman', 018, 10120),
       (10123, 'Caleb', 'Sanford', 020, 10101),
       (10124, 'Lukas', 'Novikov', 020, 10101);

    

  