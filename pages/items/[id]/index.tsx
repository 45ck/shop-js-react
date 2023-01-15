import Head from 'next/head'
import { useEffect, useLayoutEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { Atkinson_Hyperlegible } from '@next/font/google'
import { NumericLiteral } from 'typescript'
import { Category, Item, Picture, Proprietor } from '../../../database/types';

export default function GetItem() {

    const router = useRouter()
    const { query } = router;

    const [itemData, setItemData] = useState<Item>();
    const [proprietorData, setProprietorData] = useState<Proprietor>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [pictures, setPictures] = useState<Picture[]>([]);
    const [isRealItem, setIsRealItem] = useState<boolean>(true);

    useEffect(() => {
        if (!query.id)
            return;

        // retrieve item data from our api

        axios.get(`/api/get_item?id=${query.id}`).then((res: AxiosResponse<any, any>) => {
            if (res.data.result.length == 0) {
                setIsRealItem(false);
            } else {
                setItemData(new Item(res.data.result[0]));
            }
        });

    }, [query.id]);

    // once the main items are loaded
    // start retrieving associated entities 

    useEffect(() => {

        // retrieve data about the owner of the item

        if (itemData?.owner != undefined)
            axios.get(`/api/get_entity?type=proprietors&id=${itemData?.owner}`).then((res: AxiosResponse<any, any>) => {
                if (res.data.result.length != 0)
                    setProprietorData(new Proprietor(res.data.result[0]));
            });

        // retrieve the categories this item is a member of

        if (itemData?.id != undefined)
            axios.get(`/api/get_category_item?id=${itemData.id}`).then((res: AxiosResponse<any, any>) => {

                // make sure we have a valid response. 

                if (res.data.result.length != 0) {

                    // loop over each sql category row 

                    res.data.result.forEach((categoryObject: any) => {

                        axios.get(`/api/get_entity?type=categories&id=${categoryObject?.category_id}`)
                            .then((categoryRes: AxiosResponse<any, any>) => {

                                // covert each row from sql row to a Category object

                                let category = new Category(categoryRes.data.result[0]);

                                // update categories state with new Category

                                setCategories((previousCategories) => [...previousCategories, category]);

                            });
                    }
                    );
                }
            });

            // retrieve pictures of items 

            if (itemData?.id != undefined)

                axios.get(`/api/get_item_pictures?id=${itemData.id}`).then((res: AxiosResponse<any, any>) => {

                    // make sure we have at least 1 valid picture
                    // loop over each picture 

                    if (res.data.result.length != 0) 
                        res.data.result.forEach((pictureObject: any) => {
                            
                            // convert sql picture row into a Picture type

                            let picture = new Picture(pictureObject);

                            // push picture into list of pictures in state

                            setPictures((previousPictures) => [...previousPictures, picture]);

                        });
                });
    }, [itemData])

    return (
        <>
            {!isRealItem && <div> <h1> This page does not exist. </h1></div>}

            {isRealItem &&
                <div>

                    <h1> {itemData?.name} </h1>
                    <h2> {itemData?.owner} - ${itemData?.price} - {proprietorData?.name} </h2>
                    <p> {itemData?.description} </p>

                    {categories?.map((category: Category, index: number) => {
                        return (<div key={index}>
                            <h3> {category.name} </h3>
                            <p> {category.description} </p>
                        </div>)
                    })}

                    {pictures.map((picture: Picture, index: number) => {
                        return (
                            <img src={picture.resource}/> 
                        );
                    })}

                </div>
            }
        </>
    )
}
