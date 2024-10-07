import React from 'react';
import CartItems from './CartItems';

interface CartArryProps {
    item: string;
    quantity: number;
    price: number;
    total: number;
    onRemove: () => void;
    onIncrement: () => void;
    onDecrement: () => void;
}
interface CartProps {
    cartItems: CartArryProps[];
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
  return (
    <div className="w-full h-full">
      {cartItems.map((item) => (
        <CartItems
          key={item.item}
          item={item.item}
          quantity={item.quantity}
          price={item.price}
          total={item.total}
          onRemove={item.onRemove}
          onIncrement={item.onIncrement}
          onDecrement={item.onDecrement}
        />
      ))}

      <div className="flex flex-row w-full justify-between items-center mt-4 p-4">
        <div className="text-primary text-lg">
            <span>Total:</span>
        </div>
        
        <span className="ml-2">LKR {cartItems.reduce((acc, item) => acc + parseFloat(item.total.toString()), 0).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Cart;
