import Head from 'next/head'
import { MutableRefObject, useContext, useEffect, useRef, useState } from 'react'
import axios, { Axios, AxiosResponse } from 'axios'
import { Item, OwnerItem, Picture, Proprietor } from '../database/types'
import RowItem from '../components/RowItem'
import { UserDataContext } from './_app'
import Link from 'next/link'


export default function ViewCart() {

  const userData = useContext(UserDataContext);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  // when the cart changes re-calculate price

  useEffect(() => {
    
    let accumulativePrice:number = 0;

    userData?.get.cart.forEach((item: Item) => {
      accumulativePrice += Number(item.price);
    })

    setTotalPrice(accumulativePrice);

  }, [userData?.get.cart, []]);

  return (
    <>
      <Head>
        <title>View Cart</title>
      </Head>
      <main>
        {userData?.get.cart.length != 0 ? ( <>
          <h1> You have {userData?.get.cart.length} items in your cart. </h1>

          <div className=' flex flex-col'>
            {userData?.get.cart.map((item: Item, index: number) => {
              return <p key={index}> {item.name} - {item.price} </p>
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
