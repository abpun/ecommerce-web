import React from 'react';

const Orders: React.FC = () => {
  // Sample order data (replace with real API data)
  const orders = [
    { id: 1, product: 'Product 1', quantity: 2, total: '$20', status: 'Shipped' },
    { id: 2, product: 'Product 2', quantity: 1, total: '$20', status: 'Pending' },
    { id: 3, product: 'Product 3', quantity: 3, total: '$90', status: 'Delivered' },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold">View Orders</h2>
      <div className="mt-4">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Product</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.product}</td>
                <td className="border px-4 py-2">{order.quantity}</td>
                <td className="border px-4 py-2">{order.total}</td>
                <td className="border px-4 py-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
