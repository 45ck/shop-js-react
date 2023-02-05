import React, { useContext, useEffect } from 'react'
import { Category, Item, OwnerItem, Picture, Proprietor } from '../database/types'
import Router from 'next/router'
import { UserDataContext } from '../pages/_app'

export default function CategoryTag(prop: { category: Category }) {

  const userData = useContext(UserDataContext);

  useEffect(() => {
    console.log(prop.category)
  }, [prop.category])

  return (
     <span className=' bg-slate-200 rounded-lg p-2 w-fit text-slate-800 ml-1' title={prop.category.description} >{prop.category.name} </span>
  )
}
