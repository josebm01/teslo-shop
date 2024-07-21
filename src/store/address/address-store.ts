import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  };

  // métodos
  //? indica que las propiedades serán igual a la interfaz
  setAddress: (address: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  //? middleware para guardar automáticamente en localstorage
  persist(
    (set, get) => ({
      // valores por defecto
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
      },
      // utilizando el metódo definido
      setAddress: (address) => {
        set({ address });
      },
    }),
    {
      name: "address-storage",
    }
  )
);
