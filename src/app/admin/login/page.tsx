'use client';
import ApiService from '@/lib/apiService';
import authService, { AuthData } from '@/lib/authService';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type FormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await ApiService.post('/auth/adminlogin', data);
      console.log(res);
      if (res.status === 200) {
        toast('Login success', {
          description: 'Welcome',
          duration: 3000,
        });
        const data: AuthData = {
          token: res?.access_token,
          user: res?.user,
          isLoggedIn: true,
        };
        await authService.login(data);
        router.push('/admin/products');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] w-96 mt-12">
      <h1 className="text-xl font-semibold mb-4">Admin Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Invalid email address',
              },
            })}
            autoComplete="current-email"
            className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            autoComplete="current-password"
            className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
