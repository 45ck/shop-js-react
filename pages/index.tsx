import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Item, Proprietor } from '../database/types'

const inter = Inter({ subsets: ['latin'] })

interface OwnerItem {
  proprietor: Proprietor,
  item: Item
}

export default function FrontPage() {


  const [displayItems, setDisplayItems] = useState<Item[]>([]);
  const [proprietors, setProprietors] = useState<OwnerItem[]>([])
  const hasFetchedPages: MutableRefObject<boolean> = useRef(false);

  useEffect(() => {
    if (hasFetchedPages.current) return;

    hasFetchedPages.current = true;
    axios.get("/api/get_items_page?page=2").then((res: AxiosResponse<any, any>) => {
      res.data.sqlItems.forEach((sqlItem: any) => {

        let item: Item = new Item(sqlItem);

        // get item proprietor data 

        axios.get(`/api/get_entity?type=proprietors&id=${item.owner}`).then((resOwner: AxiosResponse<any, any>) => {

          let proprietor: Proprietor = new Proprietor(resOwner.data.result[0]);

          console.log({ proprietor: proprietor, item: item })

          setProprietors(value => [...value, { proprietor: proprietor, item: item }])

        });

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
