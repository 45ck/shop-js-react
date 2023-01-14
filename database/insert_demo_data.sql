/* Example data that can be inserted into database */

INSERT INTO PROPRIETORS (proprietor_id, proprietor_name) VALUES (1, 'John Smith Inc');
INSERT INTO PROPRIETORS (proprietor_id, proprietor_name) VALUES (2, 'Jane Doe Co.');
INSERT INTO PROPRIETORS (proprietor_id, proprietor_name) VALUES (3, 'Acme Inc.');
INSERT INTO PROPRIETORS (proprietor_id, proprietor_name) VALUES (4, 'Best Products LLC');

INSERT INTO ITEMS (item_id, item_name, item_price, item_owner, item_description) VALUES (1, 'item1', 10, 1, 'This is a description for item1');
INSERT INTO ITEMS (item_id, item_name, item_price, item_owner, item_description) VALUES (2, 'item2', 20, 1, 'This is a description for item2');
INSERT INTO ITEMS (item_id, item_name, item_price, item_owner, item_description) VALUES (3, 'item3', 30, 2, 'This is a description for item3');
INSERT INTO ITEMS (item_id, item_name, item_price, item_owner, item_description) VALUES (4, 'item4', 40, 3, 'This is a description for item4');
INSERT INTO ITEMS (item_id, item_name, item_price, item_owner, item_description) VALUES (5, 'item5', 50, 4, 'This is a description for item5');

INSERT INTO ACCOUNTS (account_id, account_email) VALUES (1, 'john.smith@example.com');
INSERT INTO ACCOUNTS (account_id, account_email) VALUES (2, 'jane.doe@example.com');
INSERT INTO ACCOUNTS (account_id, account_email) VALUES (3, 'bob.johnson@example.com');
INSERT INTO ACCOUNTS (account_id, account_email) VALUES (4, 'susan.miller@example.com');
INSERT INTO ACCOUNTS (account_id, account_email) VALUES (5, 'michael.brown@example.com');

INSERT INTO PURCHASES (purchase_id, purchase_item, purchase_account) VALUES (1, 1, 1);
INSERT INTO PURCHASES (purchase_id, purchase_item, purchase_account) VALUES (2, 2, 2);
INSERT INTO PURCHASES (purchase_id, purchase_item, purchase_account) VALUES (3, 3, 1);
INSERT INTO PURCHASES (purchase_id, purchase_item, purchase_account) VALUES (4, 4, 3);
INSERT INTO PURCHASES (purchase_id, purchase_item, purchase_account) VALUES (5, 5, 2);

INSERT INTO CATEGORYS (category_id, category_name, category_description) VALUES (1, 'Electronics', 'A variety of electronic devices');
INSERT INTO CATEGORYS (category_id, category_name, category_description) VALUES (2, 'Clothing', 'Fashion items for men and women');
INSERT INTO CATEGORYS (category_id, category_name, category_description) VALUES (3, 'Home goods', 'Decorations and furniture for the home');

INSERT INTO CATEGORY_ITEMS (category_id, item_id) VALUES (1, 1);
INSERT INTO CATEGORY_ITEMS (category_id, item_id) VALUES (2, 2);
INSERT INTO CATEGORY_ITEMS (category_id, item_id) VALUES (3, 3);
INSERT INTO CATEGORY_ITEMS (category_id, item_id) VALUES (1, 4);
INSERT INTO CATEGORY_ITEMS (category_id, item_id) VALUES (2, 5);
INSERT INTO CATEGORY_ITEMS (category_id, item_id) VALUES (3, 5);

INSERT INTO ITEM_PICTURES (picture_id, picture_resource_location, picture_item) VALUES (1, 'https://example.com/item1.jpg', 1);
INSERT INTO ITEM_PICTURES (picture_id, picture_resource_location, picture_item) VALUES (2, 'https://example.com/item2.jpg', 2);
INSERT INTO ITEM_PICTURES (picture_id, picture_resource_location, picture_item) VALUES (3, 'https://example.com/item3.jpg', 3);
INSERT INTO ITEM_PICTURES (picture_id, picture_resource_location, picture_item) VALUES (4, 'https://example.com/item4.jpg', 4);
INSERT INTO ITEM_PICTURES (picture_id, picture_resource_location, picture_item) VALUES (5, 'https://example.com/item5_pic1.jpg', 5);
INSERT INTO ITEM_PICTURES (picture_id, picture_resource_location, picture_item) VALUES (6, 'https://example.com/item5_pic2.jpg', 5);
INSERT INTO ITEM_PICTURES (picture_id, picture_resource_location, picture_item) VALUES (7, 'https://example.com/item5_pic3.jpg', 5);
INSERT INTO ITEM_PICTURES (picture_id, picture_resource_location, picture_item) VALUES (8, 'https://example.com/item5_pic4.jpg', 5);

