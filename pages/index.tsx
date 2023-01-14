import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  useEffect(() => {
    axios.get("/api/get_item").then((res: AxiosResponse<any, any>) => {
      console.log(res);
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
