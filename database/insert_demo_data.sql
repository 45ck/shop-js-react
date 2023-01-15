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

INSERT INTO CATEGORIES (category_id, category_name, category_description) VALUES (1, 'Electronics', 'A variety of electronic devices');
INSERT INTO CATEGORIES (category_id, category_name, category_description) VALUES (2, 'Clothing', 'Fashion items for men and women');
INSERT INTO CATEGORIES (category_id, category_name, category_description) VALUES (3, 'Home goods', 'Decorations and furniture for the home');

INSERT INTO CATEGORY_ITEMS (category_id, item_id) VALUES (1, 1);
INSERT INTO CATEGORY_ITEMS (category_id, item_id) VALUES (2, 2);
INSERT INTO CATEGORY_ITEMS (category_id, item_id) VALUES (3, 3);
INSERT INTO CATEGORY_ITEMS (category_id, item_id) VALUES (1, 4);
INSERT INTO CATEGORY_ITEMS (category_id, item_id) VALUES (2, 5);
INSERT INTO CATEGORY_ITEMS (category_id, item_id) VALUES (3, 5);

INSERT INTO ITEM_PICTURES (picture_id, picture_resource_location, picture_item) VALUES (1, 'https://s3-ap-southeast-2.amazonaws.com/wc-prod-pim/JPEG_1000x1000/PPSSMPK25_small_storage_boxes_25_pack.jpg', 1);
INSERT INTO ITEM_PICTURES (picture_id, picture_resource_location, picture_item) VALUES (2, 'https://auspost.com.au/shop/static/WFS/AusPost-Shop-Site/-/AusPost-Shop/en_AU/product/90444/1/resized_560x560.png', 2);
INSERT INTO ITEM_PICTURES (picture_id, picture_resource_location, picture_item) VALUES (3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq6oPNgO-_dgvB-960CJzDn2pwiUiFFjtY9MJEFuiPzxBUBZiOYcDjRlIBOMuMObAuoSw&usqp=CAU', 3);
INSERT INTO ITEM_PICTURES (picture_id, picture_resource_location, picture_item) VALUES (4, 'https://s3-ap-southeast-2.amazonaws.com/wc-prod-pim/JPEG_1000x1000/PPSSMPK25_small_storage_boxes_25_pack.jpg', 4);
INSERT INTO ITEM_PICTURES (picture_id, picture_resource_location, picture_item) VALUES (5, 'https://m.media-amazon.com/images/I/41ZquAaCqML.jpg', 5);
INSERT INTO ITEM_PICTURES (picture_id, picture_resource_location, picture_item) VALUES (6, 'https://ecobox.co.za/wp-content/uploads/2017/10/stock-7-single-1.jpg', 5);
INSERT INTO ITEM_PICTURES (picture_id, picture_resource_location, picture_item) VALUES (7, 'https://s3-ap-southeast-2.amazonaws.com/wc-prod-pim/JPEG_1000x1000/PPSSMPK25_small_storage_boxes_25_pack.jpg', 5);
INSERT INTO ITEM_PICTURES (picture_id, picture_resource_location, picture_item) VALUES (8, 'https://auspost.com.au/shop/static/WFS/AusPost-Shop-Site/-/AusPost-Shop/en_AU/product/90444/1/resized_560x560.png', 5);

