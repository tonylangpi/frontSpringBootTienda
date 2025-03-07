import { createContext, useState } from "react";

 export const BuyContext = createContext();

export function BuyProvider({ children }) {
  const [listDetails, setListDetails] = useState([]);

  return (
    <BuyContext
      value={{
        listDetails, setListDetails
      }}
    >
      {children}
    </BuyContext>
  );
}