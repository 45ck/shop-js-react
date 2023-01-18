import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, useState } from 'react';
import { Item } from '../database/types';

interface UserData {
  cart: Item[];
}

export const UserDataContext = createContext<UserData | null>(null);

const [userData, setUserData] = useState<UserData>({cart: []});

export default function App({ Component, pageProps }: AppProps) {
  return <UserDataContext.Provider value={userData}> <Component {...pageProps} /> </UserDataContext.Provider>
}
