import Head from 'next/head'
import { MutableRefObject, useContext, useEffect, useRef, useState } from 'react'
import axios, { Axios, AxiosResponse } from 'axios'
import { Item, OwnerItem, Picture, Proprietor } from '../database/types'
import RowItem from '../components/RowItem'
import { UserDataContext } from './_app'
import Link from 'next/link'
import { createSolutionBuilder } from 'typescript'


export default function ViewCart() {

  const userData = useContext(UserDataContext);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  // allows you to compress items into multiple items
  // such instead of Item1, Item1, Item2 it says Item1 x2, Item2 

  interface MultipleItem {
    item: Item;
    multiplier: number;
  }

  const [itemsListCompressed, setItemsListCompressed] = useState<MultipleItem[]>([]);
  const [itemsListLength, setItemsListLength] = useState(0);

  // when the cart changes re-calculate price

  useEffect(() => {
    
    let accumulativePrice: number = 0;
    let count = 0;
    let newItemsList : MultipleItem[] = [];

    userData?.get.cart.forEach((item: Item) => {

      accumulativePrice += Number(item.price);
      count = count + 1;

      // if item is already listed than compress it into a multiple 

      if (newItemsList.find(value => { return value.item.id == item.id}) != undefined) {

        let indexToEdit = newItemsList.findIndex(value => {return value.item.id == item.id;});

        newItemsList[indexToEdit].multiplier = newItemsList[indexToEdit].multiplier + 1;

      }  else {

        // if item is not listed than add it.

        newItemsList.push({item: item, multiplier: 1});

      }
    });

    setItemsListCompressed(newItemsList);
    setTotalPrice(accumulativePrice);
    setItemsListLength(count);

  }, [userData?.get.cart]);

  return (
    <>
      <Head>
        <title>View Cart</title>
      </Head>
      <main>
        {itemsListCompressed.length != 0 ? ( <>
          <h1> You have {itemsListLength} items in your cart. </h1>

          <div className=' flex flex-col'>
            {itemsListCompressed.map((mItem: MultipleItem, index: number) => {
              return <p key={index}> {mItem.item.name} - {mItem.item.price} - [ {mItem.multiplier}x ] </p>
            })}
          </div>

          <p> Total Price: $ {totalPrice} </p>
        </> ) : ( <> 
          <h1> You have no items in your cart </h1>
          <Link href="/"> Go Back </Link>
        </>)}
      </main>
    </>
  )
}
