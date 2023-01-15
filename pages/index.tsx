import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Item, Proprietor } from '../database/types'

const inter = Inter({ subsets: ['latin'] })

// key value pair to find the owner of an item

interface OwnerItem {
  proprietor: Proprietor,
  item: Item
}

export default function FrontPage() {

  const [displayItems, setDisplayItems] = useState<Item[]>([]);
  const [proprietors, setProprietors] = useState<OwnerItem[]>([])
  const hasFetchedPages: MutableRefObject<boolean> = useRef(false);

  useEffect(() => {

    // makes sure that useEffect only runs once - it runs twice since strict mode is off. 

    if (hasFetchedPages.current) return;
    hasFetchedPages.current = true;

    // retrieve items from first page

    axios.get("/api/get_items_page?page=1").then((res: AxiosResponse<any, any>) => {
      res.data.sqlItems.forEach((sqlItem: any) => {

        let item: Item = new Item(sqlItem);

        // get item proprietor data 

        axios.get(`/api/get_entity?type=proprietors&id=${item.owner}`).then((resOwner: AxiosResponse<any, any>) => {

          let proprietor: Proprietor = new Proprietor(resOwner.data.result[0]);

          // add to key value pair list of items and proprietors to later in rendering map items to there owners

          setProprietors(value => [...value, { proprietor: proprietor, item: item }])

        });

        // don't add the item twice 

        if (!displayItems.includes(item))
          setDisplayItems(value => [item, ...value]);
          
      });
    })
  }, []);

  return (
    <>
      <Head>
        <title>Shop</title>
      </Head>
      <main>
        <p> Hello </p>

        <div>
          {
            displayItems.map((item: Item, index: number) => {
              return <div key={index}> <h2> {item.name} </h2> <h3> ${item.price} - {proprietors.find(x => x.item.owner == item.owner )?.proprietor.name} 
              </h3> <p> {item.description} </p> </div>
            })
          }
        </div>
      </main>
    </>
  )
}
