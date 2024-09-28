'use client';
import { PRODUCT } from '@/constants/endpoints';
import ApiService from '@/lib/apiService';
import React, { useState, useEffect } from 'react';

const ProductsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ApiService.get(PRODUCT.GET_PAGINATION({ limit, page }));
        setProducts(response.data);
        setPage(response.currentPage);
        setTotalPages(response.totalPages);
      } catch (error) {
        setProducts([]);
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
      <h2 className="text-xl font-semibold">Manage Products</h2>
      <div className="mt-4 min-h-[620px]">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4">Add New Product</button>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left w-[200px]">ID</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Price</th>
              <th className="border px-4 py-2 text-left">Stock</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="border px-4 py-2 text-center">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product: any) => (
                <tr key={product._id}>
                  <td className="border px-4 py-2">{product._id}</td>
                  <td className="border px-4 py-2">{product.title}</td>
                  <td className="border px-4 py-2">Rs. {(product.price * 100).toFixed(0)}</td>
                  <td className="border px-4 py-2">{product.stock}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-yellow-500 text-white px-2 pb-0.5 rounded hover:bg-yellow-600 mr-2">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-2 pb-0.5 rounded hover:bg-red-600">Delete</button>
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
          className="px-4 py-2 mx-1 bg-slate-500 text-white rounded cursor-pointer disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-1  cursor-pointer ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-50'} rounded`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 mx-1 bg-slate-500 text-white cursor-pointer rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
