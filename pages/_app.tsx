import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, SetStateAction, useState } from 'react';
import { Item } from '../database/types';

interface UserData {
  cart: Item[];
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
      <Component {...pageProps} /> 
    </UserDataContext.Provider>
  )
}
