import React from 'react';

const ProductsPage: React.FC = () => {
  const products = [
    { id: 1, name: 'Product 1', price: '$10', stock: 100 },
    { id: 2, name: 'Product 2', price: '$20', stock: 50 },
    { id: 3, name: 'Product 3', price: '$30', stock: 0 },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold">Manage Products</h2>
      <div className="mt-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4">Add New Product</button>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Stock</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td className="border px-4 py-2">{product.id}</td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.price}</td>
                <td className="border px-4 py-2">{product.stock}</td>
                <td className="border px-4 py-2">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;
