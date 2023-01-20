import Link from 'next/link';
import React, { useContext } from 'react'
import { UserDataContext } from '../pages/_app'

export default function Navigation() {

  const userData = useContext(UserDataContext);

  return (
    <>
      <nav className=" w-screen h-fit bg-neutral-200 ">
          <div className="w-100 flex justify-between py-2 pl-3 pr-5">
            <Link href="/">Page</Link>
            <Link href="/cart"> Cart ({userData?.get.cart.length}) </Link>
          </div>
      </nav>
    </>
  )
}
