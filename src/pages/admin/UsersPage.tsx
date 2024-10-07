import React, { useEffect, useMemo, useState } from 'react';


import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { deleteUser, getUsers } from '../../services/userService';
import toastr from 'toastr';
import ReactSelect from 'react-select';


interface User {
    id: number;
    name: string;
    code: string;
    email: string;
    phone: string;
    role: string;
}
const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [isDelete, setDelete] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deletingId, setDeletingId] = useState<number>(0);



    // Define columns
    const userColumns = ['id', 'NIC', 'name', 'email', 'phone', 'role'];

    //toggle delete model
    const toggleDeleteModel = (id: number) => {
        setDeletingId(id);
        setIsOpen(!isOpen);
    }

    useEffect(() => {

        if (isDelete) {
            handleDelete(deletingId);
            setDelete(false);
        }

    }, [isDelete, deletingId]);
        

    //fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUsers();
            if (Array.isArray(response)) {
                setUsers(response);
            }
            //console.log("response", response);
            if (response.error) {
                toastr.error(response.error.message, '', {
                    positionClass: 'toast-top-right',
                    closeButton: true,
                    progressBar: true,
                    newestOnTop: true,
                    showEasing: 'swing',
                    hideEasing: 'linear',
                    showMethod: 'fadeIn',
                    hideMethod: 'fadeOut'
                });
            }
        }

        fetchUsers();
    }, []);

    // Handle delete user
    const handleDelete = async (id: number) => {

        const response = await deleteUser(id);
        if (response.error) {
            toastr.error(response.error.message, '', {
                positionClass: 'toast-top-right',
                closeButton: true,
                progressBar: true,
                newestOnTop: true,
                showEasing: 'swing',
                hideEasing: 'linear',
                showMethod: 'fadeIn',
                hideMethod: 'fadeOut'
            });
        } {
            toastr.success('User deleted successfully', '', {
                positionClass: 'toast-top-right',
                closeButton: true,
                progressBar: true,
                newestOnTop: true,
                showEasing: 'swing',
                hideEasing: 'linear',
                showMethod: 'fadeIn',
                hideMethod: 'fadeOut'
            });

            const updatedUsers = users.filter((user) => user.id !== id);
            setUsers(updatedUsers);
        }

    }
    //toggle delete model


    // Memoized filter logic
    const filteredPurchases = useMemo(() => {
        if (filterStatus === 'all') {
            return users;
        }
        return users.filter((user) => user.role === filterStatus);
    }, [filterStatus, users]);

    return (
        <div className="min-h-screen w-full flex flex-col bg-gray-100">

            <div className="flex w-full justify-between items-center mb-6">
                {/* Title Section */}
                <div className="w-9/12">
                    <h2 className="text-2xl font-semibold text-gray-700">Users</h2>
                </div>

                {/* Add User Button Section */}
                <div className="w-[150px] flex justify-end">
                    <Link to={'/admin/users/add'}>
                        <Button label="Add New User" onClick={() => { }} />
                    </Link>
                </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto w-full ">
                <div className="w-full md:w-3/12 mb-4">
                    <ReactSelect
                        options={[
                            { value: 'all', label: 'All' },
                            { value: 'admin', label: 'Admins' },
                            { value: 'client', label: 'Clients' },

                        ]}
                        placeholder="Filter by status"
                        onChange={(selectedOption) => setFilterStatus(selectedOption?.value || 'all')}
                    />
                </div>
                <table className="table-auto w-full relative bg-white shadow rounded-lg">
                    <thead>
                        <tr>
                            {userColumns.map((col, index) => (
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

                        {filteredPurchases.length > 0 &&

                            filteredPurchases.map((row, rowIndex) => (

                                <tr key={rowIndex} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4 text-gray-600">{row.id}</td>
                                    <td className="py-2 px-4 text-gray-600">{row.code}</td>
                                    <td className="py-2 px-4 text-gray-600">{row.name}</td>
                                    <td className="py-2 px-4 text-gray-600">{row.email}</td>
                                    <td className="py-2 px-4 text-gray-600">{row.phone}</td>
                                    <td className="py-2 px-4 text-gray-600">{row.role}</td>

                                    <td className="py-2 px-4 text-gray-600">
                                        <Button label='Delete' onClick={() => { toggleDeleteModel(row.id) }} />
                                    </td>

                                </tr>

                            ))}

                    </tbody>
                </table>
                {filteredPurchases.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">No users found.</p>
                )}
            </div>

            {/* delete model */}
            {
                isOpen && (
                    <div className='absolute inset-0 bg-black/10 bg-opacity-50 z-50 w-full h-full'>

                <div className='  bg-white w-4/12 flex flex-col p-4 justify-center items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] '>
                    <p>Are you sure you want to delete this user?</p>
                    <div className="flex flex-row justify-around items-center w-full h-full mt-4">
                        <div className="w-1/3">
                            <Button label='No' onClick={() => setIsOpen(false) } />
                        </div>
                        <div className="w-1/3">
                            <Button label='Yes' onClick={() => { setDelete(true); setIsOpen(false); }} />
                        </div>
                    </div>

                </div>

            </div>
                )
            }
            


        </div>

    );
};

export default UsersPage;
