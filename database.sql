create schema if not exists ccca;

create table if not exists ccca.item (
	id_item serial primary key,
	category text,
	description text,
	price numeric,
	width integer,
	height integer,
	depth integer,
	weight integer
);
truncate table ccca.item;
alter sequence ccca.item_id_item_seq restart;
insert into ccca.item (category, description, price, width, height, depth, weight) values ('Instrumentos Musicais', 'Guitarra', 1000, 100, 50, 15, 3);
insert into ccca.item (category, description, price, width, height, depth, weight) values ('Instrumentos Musicais', 'Amplificador', 5000, 50, 50, 50, 22);
insert into ccca.item (category, description, price, width, height, depth, weight) values ('Acessórios', 'Cabo', 30, 10, 10, 10, 1);

create table if not exists ccca.coupon (
	code text,
	percentage numeric,
	expire_date timestamp,
	primary key (code)
);
truncate table ccca.coupon;
insert into ccca.coupon (code, percentage, expire_date) values ('VALE20', 20, '2050-10-10T10:00:00');
insert into ccca.coupon (code, percentage, expire_date) values ('VALE20_EXPIRED', 20, '2020-10-10T10:00:00');

create table if not exists ccca.order (
	id_order serial primary key,
	coupon text,
	code text,
	cpf text,
	issue_date timestamp,
	freight numeric,
	sequence integer,
	total numeric
);
truncate table ccca.order;
alter sequence ccca.order_id_order_seq restart;
insert into ccca.order (coupon,code,cpf,issue_date,freight,sequence,total) values ('VALE20','202000000001','516.178.806-20','2020-10-10T10:00:00',10,1,100);

create table if not exists ccca.order_item (
	id_order integer,
	id_item integer,
	price numeric,
	quantity integer,
	primary key (id_order, id_item)
);
truncate table ccca.order_item;
insert into ccca.order_item (id_order,id_item,price,quantity) values (1,1,50,1);
insert into ccca.order_item (id_order,id_item,price,quantity) values (1,2,50,1);
