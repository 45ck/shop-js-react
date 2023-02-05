import React, { useContext, useEffect } from 'react'
import { Category, Item, OwnerItem, Picture, Proprietor } from '../database/types'
import Router, { useRouter } from 'next/router'
import { UserDataContext } from '../pages/_app'
import Link from 'next/link';

export default function CategoryTag(prop: { category: Category }) {

    const userData = useContext(UserDataContext);

    useEffect(() => {
        console.log(prop.category)
    }, [prop.category])

    return (
        <Link href={`/categories/${prop.category.id}`} className=' bg-slate-200 hover:bg-slate-300 rounded-lg p-2 w-fit text-slate-800 ml-1 transition-colors' title={prop.category.description} >{prop.category.name} </Link>
    )
}
