import axios from "axios";
import BASE_URL from "./baseUrl";

//get all tickets

export const getTickets = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/ticket`);
        return response.data;
    } catch (error: any) {
        console.log(error);
        return {error: error.response.data};
    }
}

//create purchase
interface PurchaseData {
    userId: number;
    code: string;
    data: CartItems[];
    token: string;
  }

interface CartItems {
    ticketId: number;
    item: string;
    price: number;
    quantity: number;
}

export const createPurchase = async (data: PurchaseData) => {
    // Initialize the purchase array
    let purchase: any[] = [];
    
  
    // Map through each ticket and add it to the purchase array
    data.data.forEach((ticket: any) => {
      for (let i = 0; i < ticket.quantity; i++) {
        purchase.push({
          user_id: data.userId,
          ticket_id: ticket.ticketId,
          code: data.code,
          price: ticket.price, // Ensure price is passed correctly
          path: ticket.path || 'default/path', // Add path if required or default to a value
        });
      }
    });
   
  
    try {
      // Send the purchase request to the backend
      const response = await axios.post(`${BASE_URL}/purchase`, purchase, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.token}`
        }
      });
      if(response.status === 201){
        //console.log('Purchase created successfully:', response.data);
        window.location.href = `/payment?purchase=true&paymentId=${response.data.createdPurchases[0].payment_id}&amount=${response.data.createdPurchases[0].price}`;
      }
      // Return the response data
      return response.data;
  
    } catch (error: any) {
      // Log the error
      console.error('Error while creating purchase:', error);
  
      // Handle unauthorized access (if token is invalid)
      if (error.response?.status === 401) {
        window.localStorage.removeItem('user');
        window.location.href = '/login';
      }
  
      // Return the error message
      return { error: error.response?.data || 'An unknown error occurred' };
    }
  };


  //create payment
  interface PaymentData {
    userId: number;
    slip: File;
    token: string;
    paymentId: number;
  }
  export const createPayment = async (data: PaymentData) => {
    const formData = new FormData();
    formData.append('slip', data.slip);
    formData.append('user_id', data.userId.toString());
    try {
      const response = await axios.put(`${BASE_URL}/payment/${data.paymentId}`,formData,{
        headers: {
          'Authorization': `Bearer ${data.token}`
        }
      } );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 401) {
        window.localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return { error: error.response?.data || 'An unknown error occurred' };
    }
  };

  //get all unpaid payments
  export const getUnpaidPayments = async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/payment/unpaid/${id}`, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
        }
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 401) {
        window.localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return { error: error.response?.data || 'An unknown error occurred' };
    }
  };
  

  //get purchases by user id
  export const getPurchasesByUserId = async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/purchase/user/${id}`, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
        }
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 401) {
        window.localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return { error: error.response?.data || 'An unknown error occurred' };
    }
  };


  //get all purchases
  export const getPurchases = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/purchase`, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
        }
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 401) {
        window.localStorage.removeItem('user');
        window.location.href = '/admin/login';
      }
      return { error: error.response?.data || 'An unknown error occurred' };
    }
  };


  //get all tickets
  export const getAllTickets = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/ticket`, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
        }
      });
      return response.data;
    } catch (error: any) {
      console.log(error); 
      if (error.response?.status === 401) {
        window.localStorage.removeItem('user');
        window.location.href = '/admin/login';
      }
      return { error: error.response?.data || 'An unknown error occurred' };
    }
  };

  // get tickets by ticket id
  export const getTicketsByTicketId = async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/ticket/${id}`, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
        }
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 401) {
        window.localStorage.removeItem('user');
        window.location.href = '/admin/login';
      }
      return { error: error.response?.data || 'An unknown error occurred' };
    }
  };


  //update ticket
  export const updateTicket = async (id: number, data: any) => {
    console.log(data);
    const formData = new FormData();
    formData.append('type', data.type);
    formData.append('price', data.price);
    formData.append('qty', data.qty);
    if(data.file) formData.append('file', data.file);
    
    
    try {
      console.log("form data", formData);
      const response = await axios.put(`${BASE_URL}/ticket/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
        }
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 401) {
        window.localStorage.removeItem('user');
        window.location.href = '/admin/login';
      }
      return { error: error.response?.data || 'An unknown error occurred' };
    }
  };
  

  //get all payments
  export const getPayments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/payment`, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
        }
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 401) {
        window.localStorage.removeItem('user');
        window.location.href = '/admin/login';
      }
      return { error: error.response?.data || 'An unknown error occurred' };
    }
  };


  //get payment by payment id
  export const getPaymentByPaymentId = async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/payment/${id}`, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
        }
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 401) {
        window.localStorage.removeItem('user');
        window.location.href = '/admin/login';
      }
      return { error: error.response?.data || 'An unknown error occurred' };
    }
  };

  //approve payment
  export const approvePayment = async (id: number) => {
    try {
      const response = await axios.put(`${BASE_URL}/purchase/verify/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
        }
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 401) {
        window.localStorage.removeItem('user');
        window.location.href = '/admin/login';
      }
      return { error: error.response?.data || 'An unknown error occurred' };
    }
  };


  //get dashboard info
  export const getDashboardInfo = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/purchase/dashboard`, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
        }
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 401) {
        window.localStorage.removeItem('user');
        window.location.href = '/admin/login';
      }
      return { error: error.response?.data || 'An unknown error occurred' };
    }
  };