import Head from 'next/head'
import { useEffect, useLayoutEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'

export default function GetItem() {
    const router = useRouter()

    const { query } = router;

    interface Item {
        item_id: number,
        item_name: string,
        item_price: number,
        item_owner: number,
        item_available_stock: number,
        item_purchaseable: boolean,
        item_description: string
    }
    
    const [itemData, setItemData] = useState<Item>();

    useEffect(() => {
        if (!query.id)
            return;

        console.log(`/api/get_item?id=${query.id}`)
        axios.get(`/api/get_item?id=${query.id}`).then((res: AxiosResponse<any, any>) => {
            if (res.data.result.length == 0) {
                
            } else {
                setItemData(res.data.result[0]);
            }
        });
      }, [query.id]);
  
        return (
            <div>
                <h1> {itemData?.item_name} </h1>
                <h2> {itemData?.item_owner} - ${itemData?.item_price} </h2>
                <p> {itemData?.item_description} </p>
                
            </div>
        )
  }
