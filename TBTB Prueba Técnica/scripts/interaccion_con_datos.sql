insert into users (name, email) values ('Jhonatan Segura', 'jsegura@hotmail.com');
insert into users (name, email) values ('Maria Camacho', 'marix@gmail.com');
insert into users (name, email) values ('Jimena Garzon', 'jimena23@hotmail.com');
insert into products (name, price) values ('Feast For Friends Combo', 20.99);
insert into products (name, price) values ('Mid-Size Munch Combo', 15.99);
insert into products (name, price) values ('Personal Party Combo', 12.99);
insert into orders (id_user) values (1);
insert into orders (id_user) values (1);
insert into orders (id_user) values (2);
insert into orders (id_user) values (3);
insert into orders_products (id_order, id_product, quantity) values (1, 1, 2);
insert into orders_products (id_order, id_product, quantity) values (1, 2, 1);
insert into orders_products (id_order, id_product, quantity) values (2, 3, 1);
insert into orders_products (id_order, id_product, quantity) values (3, 1, 3);
insert into orders_products (id_order, id_product, quantity) values (4, 3, 1);

select * from users where id = 1;
select * from users;
select * from users where email = "marix@gmail.com";
update orders_products set quantity = 5 where id_order = 1 and id_product = 1;
select * from orders_products;
delete from orders_products where id_order = 4 and id_product = 3;
delete from orders where id = 4;
select * from orders_products;
select * from orders;

--
delete from orders;
update products set id = 3 where id = 4;

--

-- INNER JOIN
select users.name, orders.id as id_order
from users
inner join orders on users.id = orders.id_user;

-- LEFT JOIN
select users.name, orders.id as id_order
from users
left join orders on users.id = orders.id_user;

-- UNION
-- Todos los usuarios y todos los productos con su respectivo id
select users.id, users.name
from users
union
select products.id, products.name
from products;

-- Full Join que se puede realizar aprovechando UNION
select users.name, orders.id
from users
left join orders on users.id = orders.id_user
union
select users.name, orders.id
from users
right join orders on users.id = orders.id_user;


-- CASE
select b.id_user,
       c.name,
	case a.id_product
		when 1 then 'High'
        when 2 then 'Medium'
        when 3 then 'Low'
        else 'Other Cost'
	end as cost_level,
    d.name as product_name,
    a.quantity
from orders_products as a
inner join orders as b on b.id = a.id_order
inner join users as c on c.id = b.id
inner join products as d on d.id = a.id_product;
