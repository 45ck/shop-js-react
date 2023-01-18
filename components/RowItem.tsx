import Head from 'next/head'
import Image from 'next/image'
import React, { ComponentProps, MutableRefObject, useContext, useEffect, useRef, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Item, OwnerItem, Picture, Proprietor } from '../database/types'
import Router from 'next/router'
import { UserDataContext } from '../pages/_app'
import { Niconne } from '@next/font/google'

export default function RowItem(prop: {ownerItem: OwnerItem, picture?: Picture, className?: string}) {

  const userData = useContext(UserDataContext);

  return (
    <>
    <div>
        <div className={`border-solid border-t-gray-800 border-2 cursor-pointer`} title={`View ${prop.ownerItem.item.name}`} onClick={() => Router.push(`/items/${prop.ownerItem.item.id}`)}>
              <h2> {prop.ownerItem.item.name} </h2> <h3> ${prop.ownerItem.item.price} - {prop.ownerItem.proprietor.name} 
              </h3> <p> {prop.ownerItem.item.description} </p> 
              {prop.picture != undefined ? <img src={prop.picture.resource} className=' aspect-square w-60 h-60' /> : null}
        </div>
        <button onClick={() => (userData != undefined) ? console.log(userData) : null } className=" z-10 relative"> Add to cart </button>
        </div>
    </>
  )
}
