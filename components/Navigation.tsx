import React, { useContext } from 'react'
import { UserDataContext } from '../pages/_app'

export default function Navigation() {

  const userData = useContext(UserDataContext);

  return (
    <>
      <nav className=" w-screen fixed h-fit bg-neutral-200 ">
          <div className="w-100 flex justify-between py-2 pl-3 pr-5">
            <label> Page </label>
            <label> Cart ({userData?.get.cart.length}) </label>
          </div>
      </nav>
    </>
  )
}
