import axios from "axios";
import BASE_URL from "./baseUrl";



// user login
export const userLogin = async(data:any)=>{
    const email = data.email;
    const password = data.password;
    
    try {
        const response = await axios.post(`${BASE_URL}/user/login`, {email, password},{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('login',response);
        let user ;
        if(response.status === 200 && response.data.roles === "client"){ 
            user = {
                id: response.data.userId,
                name: response.data.username,
                code: response.data.code,
                token: response.data.token,
                
            }
        };
        
        return {
            user: user,status: response.status};
    } catch (error:any) {
        console.log(error);
        return {error: error.response.data};
    }
}
// user login
export const AdminUserLogin = async(data:any)=>{
    const email = data.email;
    const password = data.password;
    
    try {
        const response = await axios.post(`${BASE_URL}/user/login`, {email, password},{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //console.log('login',response);
        
        if(response.status === 200 && response.data.roles === "Admin"){ 
            return  {
                id: response.data.userId,
                name: response.data.username,
                code: response.data.code,
                token: response.data.token,
                
            }
        };
        
        return response.data;
    } catch (error:any) {
        console.log(error);
        return {error: error.response.data};
    }
}



//create user
interface User {
    name: string;
    email: string;
    phone: string;
    password: string;
    nic: string;
    role: string;
}
export const createUser = async(data:User) =>{
    try {
        const response = await axios.post(`${BASE_URL}/user/`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error:any) {
        console.log(error);
        return {error: error.response.data};
    }
}

//get all users
export const getUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user`,{
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
              }
        });
        return response.data;
    } catch (error:any) {
        console.error(error);
        if (error.response?.status === 401) {
            window.localStorage.removeItem('user');
            window.location.href = '/login';
          }
          return { error: error.response?.data || 'An unknown error occurred' };
    }
}

//get user by id
export const getUserById = async (id: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${id}`,{
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
              }
        });
        return response.data;
    } catch (error:any) {
        console.error(error);
        if (error.response?.status === 401) {
            window.localStorage.removeItem('user');
            window.location.href = '/admin/login';
          }
          return { error: error.response?.data || 'An unknown error occurred' };
    }
}


//delete user
export const deleteUser = async (id: number) => {
    try {
        const response = await axios.delete(`${BASE_URL}/user/${id}`,{
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
              }
        });
        return response.data;
    } catch (error:any) {
        console.error(error);
        if (error.response?.status === 401) {
            window.localStorage.removeItem('user');
            window.location.href = '/admin/login';
          }
          return { error: error.response?.data || 'An unknown error occurred' };
    }
}