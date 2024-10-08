'use client';
import { PRODUCT } from '@/constants/endpoints';
import ApiService from '@/lib/apiService';
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Drawer, Modal } from 'antd';
import ProductForm from './AddProduct';
import { toast } from 'sonner';
import Pagination from './Pagination';

const ProductsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const handleOk = async () => {
    try {
      const data = await ApiService.delete(PRODUCT.DELETE(activeId));
      if (data) toast.success('Product deleted successfully');
      setRefresh(prev => prev + 1);
    } catch (error) {
      toast.error('Error deleting product');
    } finally {
      setIsModalOpen(false);
      setActiveId('');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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
  }, [page, limit, refresh]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleDelete = (id: string) => {
    setIsModalOpen(true);
    setActiveId(id);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Manage Products</h2>
        <Button onClick={showDrawer}>Add Product</Button>
        <Drawer size="large" title="Add Product Form" onClose={onClose} open={open} className="w-[600px]">
          <ProductForm onClose={onClose} setRefresh={setRefresh} />
        </Drawer>
      </div>
      <div className="mt-4 min-h-[480px]">
        <div className="min-w-full">
          <table className="bg-white border border-gray-300 mt-5">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left w-[240px]">ID</th>
                <th className="border px-4 py-2 text-left w-[400px]">Name</th>
                <th className="border px-4 py-2 text-left w-[180px]">Price</th>
                <th className="border px-4 py-2 text-left w-[120px]">Stock</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!products || products.length === 0 ? (
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
                      <button
                        className="bg-red-500 text-white px-2 pb-0.5 rounded hover:bg-red-600"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                      <Modal title="Confirm delete" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <p>Are you sure you want to delete</p>
                      </Modal>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default ProductsPage;
