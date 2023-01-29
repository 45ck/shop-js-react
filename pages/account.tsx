import Head from 'next/head'
import { MutableRefObject, useContext, useEffect, useRef, useState } from 'react'
import axios, { Axios, AxiosResponse } from 'axios'
import { Item, OwnerItem, Picture, Proprietor } from '../database/types'
import RowItem from '../components/RowItem'
import { UserDataContext } from './_app'


export default function AccountPage() {

  const userData = useContext(UserDataContext);

  return (
    <>

    </>
  )
  
}
