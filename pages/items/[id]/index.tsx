import Head from 'next/head'
import { useEffect, useLayoutEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { Atkinson_Hyperlegible } from '@next/font/google'
import { NumericLiteral } from 'typescript'
import { Item, Proprietor  } from '../../../database/types';

export default function GetItem() {
    const router = useRouter()

    const { query } = router;

    const [itemData, setItemData] = useState<Item>();

    const [proprietorData, setProprietorData] = useState<Proprietor>();

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

    useEffect(() => {

        // retrieve data about the owner of the item

        if (itemData?.owner != undefined)
            axios.get(`/api/get_entity?type=proprietors&id=${itemData?.owner}`).then((res: AxiosResponse<any, any>) => {
                if (res.data.result.length != 0) 
                    setProprietorData(new Proprietor(res.data.result[0]));
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

                </div>
            }
        </>
    )
}
