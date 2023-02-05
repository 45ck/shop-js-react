import React, { useContext } from 'react'
import { Item, OwnerItem, Picture, Proprietor } from '../database/types'
import Router from 'next/router'
import { UserDataContext } from '../pages/_app'

export default function AddToCartButton(prop: { item: Item }) {

  const userData = useContext(UserDataContext);

  return (
    <>
      <div>
          <div className=" border-solid border-y-2 border-l-2 w-fit h-fit p-2 inline rounded-l-lg border-slate-600 bg-slate-300 "> {userData?.get.cart.filter((item) => { return item.id == prop.item?.id }).length} </div>
            <button className="border-solid border-2 w-fit h-fit p-2 m-0 inline rounded-sm rounded-r-lg border-slate-600 bg-slate-300 leading-[initial] hover:bg-slate-400 hover:text-slate-50 active:bg-slate-700 transition-colors " onClick={() => { if (prop.item != undefined) userData?.set({ cart: [...userData.get.cart, prop.item] }) }}> + </button>
      </div>
    </>
  )
}
