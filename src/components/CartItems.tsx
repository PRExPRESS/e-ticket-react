import { TrashIcon } from '@heroicons/react/16/solid';
import React from 'react'

interface CartProps {
    item: string;
    quantity: number;
    price: number;
    total: number;
    onRemove: () => void;
    onIncrement: () => void;
    onDecrement: () => void;
}

const CartItems: React.FC<CartProps> = ({ item, quantity, price, onRemove, onIncrement, onDecrement }) => {

    return (
        <div>
            <div className="w-full h-full flex flex-col border-b-2 border-black/20 p-4">
                <div className="flex flex-col w-full justify-between">
                    <div className="flex flex-row w-full justify-between items-center ">
                        <div className='text-primary text-sm'>{item}</div>
                        <div className='text-primary text-lg'>{`LKR ${price}`}</div>
                    </div>
                    <div className="flex flex-row w-full justify-between items-center">
                        <div className='flex flex-row  border-2 border-black/20 rounded-lg'>
                            <button className="w-6 h-6 text-primary/40 hover:text-secondary text-lg" onClick={onDecrement}>-</button>
                            <span className='w-6 h-6 text-primary text-center'>{quantity}</span>
                            <button className="w-6 h-6 text-primary/40  hover:text-secondary text-lg" onClick={onIncrement}>+</button>
                        </div>

                        <button><TrashIcon style={{ color: 'rgb(239 68 68)' }} className="w-6 h-6 text-primary hover:text-secondary" onClick={onRemove} /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems

