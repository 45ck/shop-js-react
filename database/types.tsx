export class Item {
    id: number;
    name: string;
    price: number;
    owner: number;
    availableStock: number;
    purchaseable: boolean;
    description: string;

    constructor(object: any) {
        this.id = object.item_id;
        this.name = object.item_name;
        this.price = object.item_price;
        this.owner = object.item_owner;
        this.availableStock = object.item_available_stock;
        this.purchaseable = object.item_purchaseable;
        this.description = object.item_description;
    }
}

// key value pair to find the owner of an item
interface OwnerItem {
    proprietor: Proprietor,
    item: Item
}
export type { OwnerItem };

export class Proprietor {
    id: number;
    name: string;

    constructor(object: any) {
        this.id = object.proprietor_id;
        this.name = object.proprietor_name;
    }
}

export class Category { 
    id: number;
    name: string;
    description: string;

    constructor(object: any) {
        this.id = object.category_id;
        this.name = object.category_name;
        this.description = object.category_description;
    }
}

export class Picture { 
    id: number;
    itemId: number;
    resource: string;

    constructor(object: any) {
        this.id = object.picture_id;
        this.resource = object.picture_resource_location;
        this.itemId = object.picture_item;
    }
}

export class Account { 
    id: number;
    email: string;

    constructor(object: any) {
        this.id = object.account_id;
        this.email = object.account_id;
    }
}

export class Purchase { 
    id: number;
    itemId: number;
    accountId: number;

    constructor(object: any) {
        this.id = object.purchase_id;
        this.itemId = object.purchase_item;
        this.accountId = object.purchase_account;
    }
}




