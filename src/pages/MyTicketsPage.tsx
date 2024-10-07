import React, { useEffect, useState } from 'react';

import TicketCard2 from '../components/TicketCard2';
import { getPurchasesByUserId, getUnpaidPayments } from '../services/ticketService';
import Button from '../components/Button';
import BASE_URL from '../services/baseUrl';

const MyTicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [unpaidTickets, setUnpaidTickets] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Simulating fetching data from data.json
  useEffect(() => {
    const fetchData = async () => {
      const response = await getUnpaidPayments(user.id);

      if(Array.isArray(response)) {
        setUnpaidTickets(response);
      }
    }

    fetchData();
  }, []);

  //get all tickets
  useEffect(() => {
    const fetchTickets = async () => {
      const response = await getPurchasesByUserId(user.id);
      if (Array.isArray(response)) {
        setTickets(response);
      }
    };
    fetchTickets();
  }, []);

  const handlePayment = (paymentId: string,amount: number) => {
    window.location.href = `/payment?paymentId=${paymentId}&amount=${amount}`
  }

  return (
    <div className="bg-gray-100 flex justify-center min-h-screen py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800">My Tickets</h2>
        <p className="text-center text-gray-600 mt-2">Here are your purchased tickets.</p>

        {/* Important Notice */}
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md mt-4">
          <strong>Important Notice:</strong> Please wait to download until the admin approves your payment.
        </div>

        {/* Unpaid tickets */}
        {unpaidTickets.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Unpaid Tickets</h3>
            <p className="text-sm text-gray-500">These tickets have not been paid yet.</p>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {unpaidTickets.map((ticket, index) => (
                <div key={index} className='flex flex-row justify-between p-4 border-2 rounded-lg shadow-md'>
                  <div className="flex flex-col">
                    <span>Payment ID: {ticket.id}</span>
                    <span>Amount: {ticket.amount}</span>
                  </div>
                  <div className="flex flex-col">
                      <Button label="Pay" onClick={() => handlePayment(ticket.id,ticket.amount)} />
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-6 grid grid-cols-1 gap-4">
          {tickets.map((ticket) => (
            <TicketCard2
              key={ticket.id}
              category={ticket.ticket.type}
              quantity={ticket.ticket.price}
              approved={ticket.status === 'verified'}
              code={ticket.secret_code}
              downloadLink={`${BASE_URL}/download/ticket/${ticket.secret_code}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTicketsPage;
