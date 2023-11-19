"use client";

import { ReactNode, createContext, useState } from "react";

// Define a common interface for product items
interface IProduct {
  id: number;
  name: string;
  image: string;
  currentPrice: number;
  previousPrice?: number;
}

// Define a common interface for the cart context
interface GlobalContextValue {
  cartItems: IProduct[];
  handleAddToCart: (item: IProduct) => void;
  changeLayout: boolean;
  setChangeLayout: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create a GlobalContext
export const GlobalContext = createContext<GlobalContextValue>({
  cartItems: [],
  handleAddToCart: () => {},
  changeLayout: true,
  setChangeLayout: () => {},
});

const GlobalState = ({ children }: { children: ReactNode }) => {
  // card vs list layout changer
  const [changeLayout, setChangeLayout] = useState<boolean>(true);

  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  function handleAddToCart(getCurrentItem: IProduct) {
    let copycartItems = [...cartItems];
    const indexOfCurrentItem = copycartItems.findIndex(
      (item) => item.id === getCurrentItem.id,
    );
    // console.log(indexOfCurrentItem);
    // console.log(indexOfCurrentItem);

    if (indexOfCurrentItem === -1) {
      copycartItems.push(getCurrentItem);
    }

    setCartItems(copycartItems);
  }

  const info = {
    cartItems,
    handleAddToCart,
    changeLayout,
    setChangeLayout,
  };

  return (
    <GlobalContext.Provider value={info}>{children}</GlobalContext.Provider>
  );
};

export default GlobalState;
