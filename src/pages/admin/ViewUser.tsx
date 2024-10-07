import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import { useParams } from 'react-router-dom'
import { deleteUser, getUserById } from '../../services/userService'

interface Props {
    code: string
    name: string
    email: string
    phone: string
    role: string
}
const ViewUser: React.FC = () => {
    const [user, setUser] = useState<Props>({
        code: '',
        name: '',
        email: '',
        phone: '',
        role: ''
    });

    //fetch user by id
    const params = useParams();
    const { id } = params;
    const userId = id as string;
    useEffect(() => {
        const fetchUser = async () => {
            const response = await getUserById(+userId);
            if (response) {
                setUser({
                    code: response.code,
                    name: response.name,
                    email: response.email,
                    phone: response.phone,
                    role: response.role
                });
            }
        };
        fetchUser();
    }, [userId]);

    //delete user
    const handleDelete = async () => {
        const response = await deleteUser(+userId);
        if (response.error) {
            toastr.error(response.error.message, '', {
                closeButton: true,
                progressBar: true,
                positionClass: 'toast-top-right',
            });
        }
    };
  return (
    <div className="bg-gray-100 flex lg:items-center justify-center  lg:py-10">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Purchases</h2>
      <div className="flex flex-col justify-center items-center">
        <p>Full Name: {user.name}</p>
        <p>NIC: {user.code}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Role: {user.role}</p>
        <div className="block">
            <Button label="Delete" onClick={() => handleDelete()} />
        </div>
      </div>
    </div>
  )
}

export default ViewUser
