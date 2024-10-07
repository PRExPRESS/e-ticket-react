import React, { useEffect } from 'react'
import LOading from '../../assets/icons/loading.svg';
import Button from '../../components/Button';
import { approvePayment, getPaymentByPaymentId } from '../../services/ticketService';
import { useParams } from 'react-router-dom';
import toastr from 'toastr';
interface Props {
    code: string
    status: string
    amount: string
    date: string
    paymentId: string
    img : string
}
const ViewPayment: React.FC = () => {
    const [data, setData] = React.useState<Props>({code: '', status: '', amount: '', date: '', paymentId: '', img: ''});
    const params = useParams();
    const { paymentId } = params;
    const id = paymentId as string;

    useEffect(() => {
        const fetchData = async () => {
          const response = await getPaymentByPaymentId(+id);
          //console.log(response);
          if (response) {
            setData({
              code: response.user.code,
              status: response.status,
              amount: response.amount,
              date: new Date(response.createdAt).toLocaleString(),
              paymentId: response.id,
              img:response.slip
            });
          }
        };
        fetchData();
    }, []);

    // Approve payment
    const handleApprove = async () => {
        const response = await approvePayment(+id);

        if (response.error) {
          toastr.error(response.error.message,'',{
            positionClass: 'toast-top-right',
            closeButton: true,
            progressBar: true,
          });
          return;

        }

        if (response) {
          toastr.success('Payment approved successfully', '', {
            positionClass: 'toast-top-right',
            closeButton: true,
            progressBar: true,
          })
          setTimeout(() => {
            window.location.href = '/admin/payments';
          }, 2000);
        }
    }
  return (
    <div className='w-full h-full flex flex-col  mt-6 min-h-[70vh]'>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Payments</h2>
        <div className="w-full h-full flex flex-col md:flex-row md:justify-evenly md:items-center">
            <div className='block w-[400px] h-[400px] '>
                <img src={data.img || LOading} alt="" className='w-full h-full object-contain' />
            </div>
            <div className="flex flex-col justify-center items-center mt-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Payment Details</h2>
                <div className="w-full h-full flex flex-col items-center">
                    <p>NIC: {data.code}</p>
                    <p>Amount: LKR {data.amount}</p>
                    <p>Status: {data.status}</p>
                    <p>Date: {data.date}</p>
                    <p className='mb-4'>Payment ID: {data.paymentId}</p>
                    {
                      data.status === 'approved' ? <p className='text-green-600'>Payment status: Approved</p> : 
                      <Button label="Approve" onClick={() =>handleApprove() } />

                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewPayment;

