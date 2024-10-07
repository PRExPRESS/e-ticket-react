import React, { useEffect, useState } from 'react';
import Input from '../components/Input'; 
import Button from '../components/Button'; 
import TicketCard from '../components/TicketCard'; 
import { createPurchase, getTickets } from '../services/ticketService';
import Cart from '../components/Cart';
import toastr from 'toastr';

interface CartItem {
  ticketId: number;
  item: string;
  quantity: number;
  price: number;
  total: number;
}

const BuyPage: React.FC = () => {
  const [userCode, setUserCode] = useState<string>('');
  const [tickets, setTickets] = useState<{ id: number; type: string; price: number }[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await getTickets();
      if (response) {
        setTickets(response);
      }
    };

    fetchTickets();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserCode(user.code);
  }, []);

  const handleTicketSelection = (ticketId: number) => {
    const selectedTicketData = tickets.find(ticket => ticket.id === ticketId);
    
    if (selectedTicketData) {
      const existingCartItem = cart.find(cartItem => cartItem.item === selectedTicketData.type);

      if (existingCartItem) {
        setCart(cart.map(cartItem =>
          cartItem.item === selectedTicketData.type
            ? { ...cartItem, ticketId: selectedTicketData.id, quantity: cartItem.quantity, total: selectedTicketData.price * cartItem.quantity }
            : cartItem
        ));
      } else {
        setCart([...cart, { ticketId: selectedTicketData.id, item: selectedTicketData.type, quantity: 1, price: selectedTicketData.price, total: selectedTicketData.price }]);
      }

      setSelectedTicket(ticketId);
    }
  };

  const handleRemoveFromCart = (item: string) => {
    setCart(cart.filter(cartItem => cartItem.item !== item));
  };

  const handleIncrement = (item: string) => {
    setCart(cart.map(cartItem =>
      cartItem.item === item
        ? { ...cartItem, quantity: cartItem.quantity + 1, total: (cartItem.quantity + 1) * cartItem.price }
        : cartItem
    ));
  };

  const handleDecrement = (item: string) => {
    setCart(cart.map(cartItem =>
      cartItem.item === item && cartItem.quantity > 1
        ? { ...cartItem, quantity: cartItem.quantity - 1, total: (cartItem.quantity - 1) * cartItem.price }
        : cartItem
    ));
  };

  const handlePurchase = async () => {
    const response = await createPurchase({
      userId: JSON.parse(localStorage.getItem('user') || '{}').id,
      code: userCode,
      data: cart,
      token: JSON.parse(localStorage.getItem('user') || '{}').token,
    });

    if (response.error) {
      toastr.error(response.error.error || 'Something went wrong!', '', {
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-top-right',
      });
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center mb-10 py-10 px-4 overflow-scroll">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800">Buy Tickets</h2>
        <p className="text-center text-gray-600 mt-2">Select your ticket and proceed to purchase.</p>

        {/* User Code (Disabled) */}
        <div className="mt-6">
          <Input
            id="user-code"
            label="User Code"
            type="text"
            value={userCode}
            placeholder="Your user code"
            onChange={() => {}}
            disabled
          />
        </div>

        {/* Ticket Selection */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tickets.map(ticket => (
            <TicketCard
              key={ticket.id}
              ticketType={ticket.type}
              price={ticket.price}
              selected={selectedTicket === ticket.id}
              onSelect={() => handleTicketSelection(ticket.id)}
            />
          ))}
        </div>

        {/* Cart */}
        <div className="mt-8">
          <Cart
            cartItems={cart.map(cartItem => ({
              ...cartItem,
              onRemove: () => handleRemoveFromCart(cartItem.item),
              onIncrement: () => handleIncrement(cartItem.item),
              onDecrement: () => handleDecrement(cartItem.item),
            }))}
          />
        </div>

        {/* Purchase Button */}
        <div className="mt-8">
          <Button label="Purchase" onClick={handlePurchase} />
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
