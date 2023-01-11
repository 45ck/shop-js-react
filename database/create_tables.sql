DROP TABLE IF EXISTS PURCHASES;
DROP TABLE IF EXISTS ACCOUNTS;
DROP TABLE IF EXISTS ITEMS;
DROP TABLE IF EXISTS PROPRIETORS;

/* Differnt companies who sell producs on the store */
CREATE TABLE PROPRIETORS (
	proprietor_id int,
    proprietor_name varchar(100) NOT NULL,
    PRIMARY KEY (proprietor_id)
);

/* Items that people can purchase on our store */
CREATE TABLE ITEMS (
	item_id int,
    item_name varchar(100) NOT NULL,
    item_price double NOT NULL DEFAULT 0,
    item_owner int NOT NULL,
    item_available_stock int DEFAULT 0,
    item_purchaseable tinyint (1) NOT NULL DEFAULT 1,
    PRIMARY KEY (item_id),
    FOREIGN KEY (item_owner) REFERENCES PROPRIETOR(proprietor_id)
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
    purchase_item int,
    purchase_account int,
    PRIMARY KEY (purchase_id),
    FOREIGN KEY (purchase_item) REFERENCES ITEMS(item_id),
    FOREIGN KEY (purchase_account) REFERENCES ACCOUNTS(account_id)
);
