import React, { useContext } from 'react'
import { Item, OwnerItem, Picture, Proprietor } from '../database/types'
import Router from 'next/router'
import { UserDataContext } from '../pages/_app'
import AddToCartButton from './AddToCartButton';

export default function RowItem(prop: { ownerItem: OwnerItem, picture?: Picture, className?: string }) {

  const userData = useContext(UserDataContext);

  return (
    <>
      <div>
        <div className={`border-solid border-t-gray-800 border-2 cursor-pointer`} title={`View ${prop.ownerItem.item.name}`} onClick={() => Router.push(`/items/${prop.ownerItem.item.id}`)}>
          <h2> {prop.ownerItem.item.name} </h2> <h3> ${prop.ownerItem.item.price} - {prop.ownerItem.proprietor.name}
          </h3> <p> {prop.ownerItem.item.description} </p>
          {prop.picture != undefined ? <img src={prop.picture.resource} className=' aspect-square w-60 h-60' /> : null}
        </div>
        <AddToCartButton item={prop.ownerItem.item}/>
      </div>
    </>
  )
}
