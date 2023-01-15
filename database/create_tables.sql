DROP TABLE IF EXISTS PURCHASES;
DROP TABLE IF EXISTS ACCOUNTS;
DROP TABLE IF EXISTS ITEM_PICTURES;
DROP TABLE IF EXISTS CATEGORY_ITEMS;
DROP TABLE IF EXISTS CATEGORIES;
DROP TABLE IF EXISTS ITEMS;
DROP TABLE IF EXISTS PROPRIETORS;

/* Differnt companies who sell producs on the store */
CREATE TABLE PROPRIETORS (
	proprietor_id int,
    proprietor_name varchar(255) NOT NULL,
    PRIMARY KEY (proprietor_id)
);

/* Items that people can purchase on our store */
CREATE TABLE ITEMS (
	item_id int,
    item_name varchar(255) NOT NULL,
    item_price decimal(7,2) NOT NULL DEFAULT 0,	
    item_owner int NOT NULL,
    item_available_stock int DEFAULT 0,
    item_purchaseable tinyint(1) NOT NULL DEFAULT 1,
    item_description varchar(500),
    PRIMARY KEY (item_id),
    FOREIGN KEY (item_owner) REFERENCES PROPRIETORS(proprietor_id)
);

/* Accounts that purchase items, authed through 0Auth */
CREATE TABLE ACCOUNTS (
	account_id int,
    account_email varchar(255) NOT NULL,
    account_creation DATETIME NOT NULL DEFAULT NOW(),
    account_last_login DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (account_id)
);

/* Items that have been purchased by accounts */
CREATE TABLE PURCHASES (
	purchase_id int,
    purchase_item int NOT NULL,
    purchase_account int NOT NULL,
    PRIMARY KEY (purchase_id),
    FOREIGN KEY (purchase_item) REFERENCES ITEMS(item_id),
    FOREIGN KEY (purchase_account) REFERENCES ACCOUNTS(account_id)
);

/* Sort items by category name */
CREATE TABLE CATEGORIES (
	category_id int,
    category_name varchar(255) NOT NULL,
    category_description varchar(500),
    PRIMARY KEY (category_id)
);

/* Any item that fits into a category is determined by this */
CREATE TABLE CATEGORY_ITEMS (
	category_id int NOT NULL,
    item_id int NOT NULL,
    FOREIGN KEY (category_id) REFERENCES CATEGORIES(category_id),
    FOREIGN KEY (item_id) REFERENCES ITEMS(item_id)
);

/* items can have pictures for users to view */
CREATE TABLE ITEM_PICTURES (
	picture_id int,
    picture_resource_location varchar(500) NOT NULL,
    picture_item int NOT NULL,
    PRIMARY KEY (picture_id),
    FOREIGN KEY (picture_item) REFERENCES ITEMS(item_id)
);
