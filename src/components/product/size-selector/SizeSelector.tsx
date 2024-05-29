import { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
    selectedSize?: Size;
    availableSizes: Size[];

    // actualziar el estado general
    onSizeChanged: (size: Size ) => void;
}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChanged }: Props) => {

  return (
    <div className="my-5">
        <h3 className="font-bold mb-4">Tallas disponibles</h3>
        {
            availableSizes.map( size => (
                <button 
                    key={ size } 
                    onClick={ () => onSizeChanged(size) }
                    className={
                        clsx(
                            "mx-2 hover:underline text-lg",
                            {
                                "underline" : size === selectedSize
                            }
                        )
                    }
                >
                    { size }
                </button>
            ))
        }
    </div>
  )
}
