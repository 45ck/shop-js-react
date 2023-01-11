INSERT INTO PROPRIETORS (proprietor_id, proprietor_name) VALUES (1, 'John Smith Inc');
INSERT INTO PROPRIETORS (proprietor_id, proprietor_name) VALUES (2, 'Jane Doe Co.');

INSERT INTO ITEMS (item_id, item_name, item_price, item_owner) VALUES (1, 'item1', 10, 1);
INSERT INTO ITEMS (item_id, item_name, item_price, item_owner) VALUES (2, 'item2', 20, 1);
INSERT INTO ITEMS (item_id, item_name, item_price, item_owner) VALUES (3, 'item3', 30, 2);

INSERT INTO ACCOUNTS (account_id, account_email) VALUES (1, 'john.smith@example.com');
INSERT INTO ACCOUNTS (account_id, account_email) VALUES (2, 'jane.doe@example.com');

INSERT INTO PURCHASES (purchase_id, purchase_item, purchase_account) VALUES (1, 1, 1);
INSERT INTO PURCHASES (purchase_id, purchase_item, purchase_account) VALUES (2, 2, 2);
INSERT INTO PURCHASES (purchase_id, purchase_item, purchase_account) VALUES (3, 3, 1);
