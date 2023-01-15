import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Item } from '../database/types'

const inter = Inter({ subsets: ['latin'] })

export default function FrontPage() {

  const [displayItems, setDisplayItems] = useState<Item[]>([]);

  useEffect(() => {
    axios.get("/api/get_items_page?page=1").then((res: AxiosResponse<any, any>) => {
        
    })
  }, []);

  return (
    <>
      <Head>
        <title>Shop</title>
      </Head>
      <main>
        <p> Hello </p>
      </main>
    </>
  )
}
