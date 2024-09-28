'use client';
import React from 'react';
import ApiService from '@/lib/apiService';
import authService from '@/lib/authService';
import { ORDER } from '@/constants/endpoints';
import { toast } from 'sonner';
import { ThreeDots } from 'react-loader-spinner';
import { cn } from '@/lib/utils';

export default function page() {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        if (authService.isAuthenticated()) {
          const userId = authService.getUser()?.id;
          if (!userId) {
            toast.error('Please login to view your orders');
            throw new Error('User not found');
          }
          const response = await ApiService.get(ORDER.GET_BY_USER(userId));
          console.log(response);
          setOrders(response);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setError('Error getting orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    );
  }

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Order ID</th>
            <th className="border px-4 py-2 text-left">Ordered By</th>
            <th className="border px-4 py-2 text-left">Payment Method</th>
            <th className="border px-4 py-2 text-left">Total</th>
            <th className="border px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {!orders || orders.length === 0 ? (
            <tr>
              <td colSpan={5} className="border px-4 py-2 text-center">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order: any) => (
              <tr key={order._id}>
                <td className="border px-4 py-2">{order.order_name}</td>
                <td className="border px-4 py-2">{order.name}</td>
                <td className="border px-4 py-2">{order.payment_method}</td>
                <td className="border px-4 py-2">{order.total}</td>
                <td className="border px-4 py-2">
                  <div
                    className={cn(
                      'px-2 pb-0.5 rounded-sm text-white w-fit flex items-center justify-center',
                      order.payment_status === 'pending' ? 'bg-orange-500' : 'bg-green-500'
                    )}
                  >
                    {order.payment_status}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
