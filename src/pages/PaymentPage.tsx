import React, { useEffect, useState } from 'react';
import Button from '../components/Button'; // Adjust path as necessary
import TicketCard from '../components/TicketCard'; // Reusing the TicketCard component for banks
import CopyButton from '../components/CopyButton'; // New CopyButton component
import { useSearchParams } from 'react-router-dom';
import toastr from 'toastr';
import { createPayment } from '../services/ticketService';

const PaymentPage: React.FC = () => {
  const [userCode, setUserCode] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [banks, setBanks] = useState<any[]>([]);
  const [selectedBank, setSelectedBank] = useState<number | null>(null);
  const [paymentSlip, setPaymentSlip] = useState<File | null>(null);

  const [searchParams] = useSearchParams();

  const isPurchase = searchParams.get('purchase') === 'true';
  const rPId = searchParams.get('paymentId');
  const rAmount = searchParams.get('amount');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const pId = +(rPId || '0');
  const pAmount = +(rAmount || '0');

  useEffect(() => {
    if (isPurchase ) {
      const showErrorToast = () => {
        toastr.success('Your purchase was successful','', {
          "closeButton": true,
          "debug": false,
          "newestOnTop": false,
          "progressBar": true,
          "positionClass": "toast-top-right",
          "preventDuplicates": false,
          "showDuration": 300,
          "hideDuration": 1000,
          "timeOut": 5000,
          "extendedTimeOut": 1000,
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        });
      };
      showErrorToast();
    }
  }, []);

  // Simulating fetching data from data.json
  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setUserCode(user.code || '');
        setAmount(pAmount);
        setBanks(data.availableBanks);
      });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPaymentSlip(e.target.files[0]);
    }
  };

  const handleConfirm =async () => {
    if (selectedBank === null) {
      toastr.error('Please select a bank','', {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "showDuration": 300,
        "hideDuration": 1000,
        "timeOut": 5000,
        "extendedTimeOut": 1000,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      });
      return;
    }

    if (!paymentSlip) {
      //alert('Please upload a payment slip.');
      
        toastr.error('Please upload a payment slip','', {
          "closeButton": true,
          "debug": false,
          "newestOnTop": false,
          "progressBar": true,
          "positionClass": "toast-top-right",
          "preventDuplicates": false,
          "showDuration": 300,
          "hideDuration": 1000,
          "timeOut": 5000,
          "extendedTimeOut": 1000,
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        });
      
      
      return;
    }

    const response = await createPayment({
      userId: JSON.parse(localStorage.getItem('user') || '{}').id,
      paymentId: pId,
      slip: paymentSlip,
      token: JSON.parse(localStorage.getItem('user') || '{}').token,
    });
    if (response.error) {
      toastr.error(response.error.error||'Something went wrong!','', {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "showDuration": 300,
        "hideDuration": 1000,
        "timeOut": 5000,
        "extendedTimeOut": 1000,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      });
    }else{
      window.location.href = '/mytickets?payment=true';
    }
    //window.location.href = '/mytickets';
    // Handle payment confirmation logic
  };

  return (
    <div className="bg-gray-100 flex justify-center min-h-screen py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800">Payment Details</h2>
        <p className="text-center text-gray-600 mt-2">Select your bank and upload the payment slip.</p>

        {/* Bank Selection */}
        <div className="mt-6 grid grid-cols-1 gap-4">
          {banks.map(bank => (
            <TicketCard
              key={bank.id}
              ticketType={bank.bankName}
              price={pAmount} // Not relevant for price here
              selected={selectedBank === bank.id}
              onSelect={() => setSelectedBank(bank.id)}
            />
          ))}
        </div>

        {/* Bank Details */}
        {selectedBank !== null && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">Account Number: {banks[selectedBank - 1].accountNumber}</p>
              <CopyButton textToCopy={banks[selectedBank - 1].accountName} />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">Account Name: {banks[selectedBank - 1].accountName}</p>
              <CopyButton textToCopy={banks[selectedBank - 1].accountName} />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">Bank Name: {banks[selectedBank - 1].bankName}</p>
              <CopyButton textToCopy={banks[selectedBank - 1].bankName} />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">Branch: {banks[selectedBank - 1].branch}</p>
              <CopyButton textToCopy={banks[selectedBank - 1].branch} />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">Remark (User Code): {userCode}</p>
              <CopyButton textToCopy={userCode} />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">Amount: {amount}</p>
              <CopyButton textToCopy={amount.toString()} />
            </div>
          </div>
        )}

        {/* Upload Payment Slip */}
        <div className="mt-6">
          <label htmlFor="payment-slip" className="block text-sm font-medium text-gray-700">Upload Payment Slip</label>
          <input
            type="file"
            id="payment-slip"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-600 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>

        {/* Confirm Button */}
        <div className="mt-8">
          <Button label="Confirm Payment" onClick={handleConfirm}  />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
