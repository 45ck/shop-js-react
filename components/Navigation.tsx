import Link from 'next/link';
import React, { useContext } from 'react'
import { UserDataContext } from '../pages/_app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

export default function Navigation() {

  library.add(faCartShopping, faUser);

  const userData = useContext(UserDataContext);

  return (
    <>
      <nav className=" w-screen h-fit bg-neutral-200 ">
        <div className="w-100 flex justify-between py-2 pl-2 pr-8">
          <Link href="/">Home</Link>
          <form action='/search'>
            <label> Search </label>
            <input type={"text"} name="q" className="lg:w-52 " />
          </form>
          <div className='flex'>
            <Link href="/account" className='mr-2 bg-slate-400 flex items-center py-0 px-2 rounded-lg'> <FontAwesomeIcon icon="user" size="1x" className='mr-2' /> {userData?.get.account ? userData.get.account.email : "Sign in" } </Link>
            <Link href="/cart"> <FontAwesomeIcon icon="cart-shopping" size="2x" /> <span className=' bg-red-500 text-red-100 absolute py-0 px-1 -translate-x-1/2 font-bold text-sm rounded-2xl'>{userData?.get.cart.length}</span> </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
