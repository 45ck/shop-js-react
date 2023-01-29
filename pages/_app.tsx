import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, SetStateAction, useState } from 'react';
import { Account, Item } from '../database/types';
import Navigation from '../components/Navigation';

interface UserData {
  cart: Item[];
  account?: Account;
}

interface GlobalState {
  get: UserData;
  set: (value: UserData) => void
}

export const UserDataContext = createContext<GlobalState | null>(null);

export default function App({ Component, pageProps }: AppProps) {

  const [userData, setUserData] = useState<UserData>({cart: []});


  return (
    <UserDataContext.Provider value={{get: userData, set: setUserData}}> 
      <Navigation/>
      <Component {...pageProps} /> 
    </UserDataContext.Provider>
  )
}
