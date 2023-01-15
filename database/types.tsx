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
        console.log(this);
    }
}

export class Proprietor {
    id: number;
    name: string;

    constructor(object: any) {
        this.id = object.proprietor_id;
        this.name = object.proprietor_name;
        console.log(this);
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

        console.log(this);
    }
}




