import React, { useEffect } from 'react';

import DashboardCard from '../../components/admin/DashboardCard';
import { getDashboardInfo } from '../../services/ticketService';

interface DashboardCardProps {
    totalPurchases: number;
    totalVerifiedPurchases: number;
    totalRevenue: number;
    totalPending: number;
}
const AdminDashboard: React.FC = () => {
    const [dashboardData, setDashboardData] = React.useState<DashboardCardProps>({
        totalPurchases: 0,
        totalVerifiedPurchases: 0,
        totalRevenue: 0,
        totalPending: 0
    })
    useEffect(() => {
        const fetchDashboardData = async () => {
            const response = await getDashboardInfo();

            if (response) { 
                //console.log(response);
                setDashboardData(response);
            }
        }

        fetchDashboardData();
    }, [])
    return (

        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard title="Total Purchases" value={dashboardData.totalPurchases} />
                <DashboardCard title="Verified Purchases" value={dashboardData.totalVerifiedPurchases} />
                <DashboardCard title="Revenue" value={`LKR ${dashboardData.totalRevenue}`} />
                <DashboardCard title="Pending Payments" value={dashboardData.totalPending} />
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="bg-white p-6 rounded-lg shadow">
                    <p className="text-gray-600">No recent activity available.</p>
                </div>
            </div>
        </>


    );
};

export default AdminDashboard;
