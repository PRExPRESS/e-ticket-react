import React, { useState, useEffect, useMemo } from 'react';
import Select from 'react-select'; // Importing React Select
import { Link } from 'react-router-dom';
import { getPayments } from '../../services/ticketService';
import toastr from 'toastr';

interface Payment {
    id: number;
    nic: string;
    amount: string;
    status: string;
}

const PaymentsPage: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([]);

    useEffect(() => {
        const fetchPayments = async () => {
            const response = await getPayments();
            if (Array.isArray(response)) {
                
                response.map((payment) => {
                    payment.nic = payment.user.code; // Assuming `user.code` is available on payment
                });
                setPayments(response);
            }
            if (response.error) {
                toastr.error(response.error, '', {
                    positionClass: 'toast-bottom-right',
                    closeButton: true,
                    progressBar: true,
                    newestOnTop: true,
                    showEasing: 'swing',
                    hideEasing: 'linear',
                });
            }
        };
        fetchPayments();
    }, []);

    // Define columns
    const paymentColumns = ['ID', 'NIC', 'Amount', 'Status'];

    // Filter options for React Select
    const filterOptions = [
        { value: 'all', label: 'All Payments' },
        { value: 'paid', label: 'Paid Payments' },
        { value: 'pending', label: 'Pending Payments' },
        { value: 'approved', label: 'Approved Payments' },
    ];

    // State to handle selected filter
    const [selectedFilter, setSelectedFilter] = useState<{ value: string; label: string }>(filterOptions[0]);

    // Handle filter change
    const handleFilterChange = (selectedOption: any) => {
        setSelectedFilter(selectedOption);
    };

    // Memoize the filtered payments
    const filteredPayments = useMemo(() => {
        if (selectedFilter.value === 'all') {
            return payments;
        }
        return payments.filter(payment => payment.status.toLowerCase() === selectedFilter.value);
    }, [selectedFilter, payments]);

    return (
        <div className='w-full min-h-screen p-5'>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Payments</h2>

            {/* Filter Section */}
            <div className="mb-6 w-full md:w-4/12">
                <Select
                    options={filterOptions}
                    value={selectedFilter}
                    onChange={handleFilterChange}
                    className="w-full"
                    defaultValue={filterOptions[0]}
                />
            </div>

            {/* Payments Table */}
            <div className="overflow-x-auto w-full">
                <table className="min-w-full bg-white shadow rounded-lg">
                    <thead>
                        <tr>
                            {paymentColumns.map((col, index) => (
                                <th
                                    key={index}
                                    className="py-2 px-4 bg-gray-50 border-b text-left text-gray-600 font-semibold"
                                >
                                    {col}
                                </th>
                            ))}
                            <th className="py-2 px-4 bg-gray-50 border-b text-left text-gray-600 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 text-gray-600">{row.id}</td>
                                <td className="py-2 px-4 text-gray-600">{row.nic}</td>
                                <td className="py-2 px-4 text-gray-600">{row.amount}</td>
                                <td className="py-2 px-4 text-gray-600">{row.status}</td>
                                <td className="py-2 px-4 text-gray-600">
                                    {row.status === 'paid' ? (
                                        <Link to={`/admin/payment/${row.id}`} className='hover:text-primary bg-black px-2 py-1 rounded text-white hover:bg-secondary'>
                                            View
                                        </Link>
                                    ) : (
                                        <span className='text-primary/50'>View</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentsPage;
