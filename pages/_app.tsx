import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, SetStateAction, useState } from 'react';
import { Account, Item } from '../database/types';
import Navigation from '../components/Navigation';
import Head from 'next/head';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Serif:wght@400;700&family=Viga&display=swap" rel="stylesheet"/>
      </head>
      <Navigation/>
      <Component {...pageProps} /> 
    </UserDataContext.Provider>
  )
}
