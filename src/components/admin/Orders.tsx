'use client';
import React from 'react';
import ApiService from '@/lib/apiService';
import { ORDER } from '@/constants/endpoints';
import { cn } from '@/lib/utils';

const Orders: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [orders, setOrders] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ApiService.get(ORDER.GET_PAGINATION({ limit, page }));
        console.log(response);
        setOrders(response.data);
        setPage(response.currentPage);
        setTotalPages(response.totalPages);
      } catch (error) {
        setOrders([]);
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [page, limit]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">View Orders</h2>
      <div className="mt-4">
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
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="border px-4 py-2 text-center">
                  No products found.
                </td>
              </tr>
            ) : (
              orders.map((order: any) => (
                <tr key={order.id}>
                  <td className="border px-4 py-2">{order._id}</td>
                  <td className="border px-4 py-2">{order.userId?.name || order.userId._id}</td>
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
      <div className="flex mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 mx-1 bg-gray-300 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-1 cursor-pointer ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;
