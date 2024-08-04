CREATE DATABASE contoso_pizza;

USE contoso_pizza;

CREATE TABLE `products` (
  `id` INT AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE
);

CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `registered_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE
);

CREATE TABLE `orders` (
  `id` INT AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `registered_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_user`) REFERENCES `users`(`id`)
);

CREATE TABLE `orders_products` (
  `id_order` INT NOT NULL,
  `id_product` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`id_order`, `id_product`),
  FOREIGN KEY (`id_order`) REFERENCES `orders`(`id`),
  FOREIGN KEY (`id_product`) REFERENCES `products`(`id`)
);

