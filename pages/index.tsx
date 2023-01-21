import Head from 'next/head'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import axios, { Axios, AxiosResponse } from 'axios'
import { Item, OwnerItem, Picture, Proprietor } from '../database/types'
import RowItem from '../components/RowItem'


export default function FrontPage() {

  const [displayItems, setDisplayItems] = useState<Item[]>([]);
  const [proprietors, setProprietors] = useState<OwnerItem[]>([])
  const [itemPictures, setItemPictures] = useState<Picture[]>([]);
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

        // get pictures for items

        axios.get(`/api/get_item_pictures?id=${item.id}`).then((resPic: AxiosResponse<any, any>) => {

            // get first picture of item

            let picture: Picture = new Picture(resPic.data.result[0]);

            // add it to list of pictures

            setItemPictures(pics => [...pics, picture]);

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

        <div className='grid md:grid-cols-3 grid-cols-1'>
          {
            proprietors.map((value, index) => 
              { return <RowItem key={index} ownerItem={value} picture={itemPictures.find(pic => { if (pic.itemId == value.item.id)  return pic.itemId == value.item.id} )}/> })
          }
        </div>
      </main>
    </>
  )
}
