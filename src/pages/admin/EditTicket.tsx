import React, { useEffect, useState } from 'react'
import Input from '../../components/Input';
import Button from '../../components/Button';
import { getTicketsByTicketId, updateTicket } from '../../services/ticketService';
import toastr from 'toastr';
import { useParams } from 'react-router-dom';

const EditTicket: React.FC = () => {
    const [ticketType, setTicketType] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [qty, setQty] = useState<string>('');
  const params = useParams();
  const { ticketId } = params as { ticketId: string };

  
  //fetch ticket by id
  useEffect(() => {
    const fetchTicket = async () => {
      const response = await getTicketsByTicketId(+ticketId);
      if (response) {
        setTicketType(response.type);
        setPrice(response.price);
        setQty(response.qty);
      }
      if (response.error) {
        toastr.error(response.error.message, '', {
          positionClass: 'toast-top-right',
          closeButton: true,
          progressBar: true,
          newestOnTop: true,
          showEasing: 'swing',
          hideEasing: 'linear',
          showMethod: 'fadeIn',
          hideMethod: 'fadeOut',
        });
      }
    };
    fetchTicket();
  }, []);
  
  
  
  
  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const response = await updateTicket(+ticketId, {
      type: ticketType,
      price: price,
      qty: qty,
      file: file
    });
    if (response) {
      
       toastr.success('Ticket updated successfully', '', {
         positionClass: 'toast-top-right',
         closeButton: true,
         progressBar: true,
         newestOnTop: true,
         showEasing: 'swing',
         hideEasing: 'linear',
         showMethod: 'fadeIn',
         hideMethod: 'fadeOut',
       });
       setTimeout(() => {
         window.location.href = '/admin/tickets';
       }, 2000);
       
    }
    if (response.error) {
      toastr.error(response.error.message, '', {
        positionClass: 'toast-top-right',
        closeButton: true,
        progressBar: true,
        newestOnTop: true,
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut',
      });
    }
  };
  return (
    <div className="flex-1 flex flex-col">
        

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Edit Ticket</h2>

          <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full mx-auto">
            {/* Ticket Type Field */}
            <div className="mb-4">
              <Input
                id="ticket-type"
                label="Ticket Type"
                type="text"
                placeholder="Enter ticket type"
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
              />
            </div>

            {/* Price Field */}
            <div className="mb-4">
              <Input
                id="price"
                label="Price"
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            {/* Price Field */}
            <div className="mb-4">
              <Input
                id="qty"
                label="Quantity"
                type="number"
                placeholder="Enter quantity"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </div>

            {/* File Upload Field */}
            <div className="mb-6">
              <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
                Upload Ticket File
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-600 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <Button label="Update Ticket" onClick={handleSubmit} />
            </div>
          </div>
        </main>
      </div>
  )
}

export default EditTicket;


