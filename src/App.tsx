

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './App.css'
import 'toastr/build/toastr.min.css';
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import SignUp from './pages/Signup'
import SignIn from './pages/Signin'
import BuyPage from './pages/BuyPage'
import PaymentPage from './pages/PaymentPage'
import MyTicketsPage from './pages/MyTicketsPage'
import { AuthProvider } from './hooks/useAuth'
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/admin/Sidebar';
import Topbar from './components/admin/Topbar';
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersPage from './pages/admin/UsersPage';
import AddUser from './pages/admin/AddUser';
import TicketsPage from './pages/admin/TicketsPage';
import AddTicket from './pages/admin/AddTicket';
import PurchasesPage from './pages/admin/PurchasesPage';
import PaymentsPage from './pages/admin/PaymentsPage';
import ViewPayment from './pages/admin/ViewPayment';
import EditTicket from './pages/admin/EditTicket';

import AdminLogin from './pages/admin/AdminLogin';
import AdminProtectedRoutes from './components/admin/AdminProtectedRoutes';
import ViewUser from './pages/admin/ViewUser';




function App() {

  const Layout: React.FC = () => {
    return (
      <div className='font-bebas  w-full  '>
        <Header />
        <div className='w-full h-full'>
          <Outlet />
        </div>
        <Footer />
      </div>
    )
  }
  const AdminLayout: React.FC = () => {
    return (
      <div className='flex flex-col font-bebas bg-gray-100 w-full h-full absolute  '>
        <div className="flex flex-row w-full h-full">
          {/* Sidebar would go here */}
          <Sidebar />
          <div className="flex-1 flex flex-col md:ml-64  ">
            {/* Topbar would go here */}
            <Topbar />
            <main className="flex-1 w-full h-full p-5">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    );
  };




  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/signup',
          element: <SignUp />,
        },
        {
          path: '/login',
          element: <SignIn />,
        },
        {
          path: '/purchase',
          element: <ProtectedRoute><BuyPage /></ProtectedRoute>,
        },
        {
          path: '/payment',
          element: <ProtectedRoute><PaymentPage /></ProtectedRoute>,
        },
        {
          path: '/mytickets',
          element: <ProtectedRoute><MyTicketsPage /></ProtectedRoute>,
        }


      ],
    },
    {
      path: '/admin',
      element: <AdminProtectedRoutes><AdminLayout /></AdminProtectedRoutes>,
      children: [
        {
          path: '/admin',
          element: <AdminDashboard />,
        },
        {
          path: '/admin/users',
          element: <UsersPage />,
        },
        {
          path: '/admin/users/add',
          element: <AddUser />,
        },
        {
          path: '/admin/users/:id',
          element: <ViewUser />,
        },
        {
          path: '/admin/tickets',
          element: <TicketsPage />,
        },
        {
          path: '/admin/tickets/add',
          element: <AddTicket />,
        },
        {
          path: '/admin/purchases',
          element: <PurchasesPage />,
        },
        {
          path: '/admin/payments',
          element: <PaymentsPage />,
        },
        {
          path: '/admin/payment/:paymentId',
          element: <ViewPayment />
        },
        {
          path: '/admin/edit-ticket/:ticketId',
          element: <EditTicket />
        },
        

      ],
    },
    
    {
        path: '/admin/login',
        element: <AdminLogin />
    }
    


  ])
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
