'use client';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { signInSchema } from '@/lib/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AUTH } from '@/constants/endpoints';
import ApiService from '@/lib/apiService';
import { useToast } from '@/hooks/use-toast';
import React from 'react';
import AuthService, { AuthData } from '@/lib/authService';

export default function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      setLoading(true);
      const res = await ApiService.post(AUTH.SIGN_IN, values);

      if (res?.errors) {
        const errors = res.errors;
        Object.keys(errors).map(key => form.setError(key as 'root', { message: errors[key] }));
      } else {
        toast({
          title: 'Login success',
          description: 'Welcome',
          duration: 3000,
        });
        const data: AuthData = {
          token: res?.access_token,
          user: res?.user,
          isLoggedIn: true,
        };
        await AuthService.login(data);
        router.push('/home');
      }
    } catch (error) {
      console.log('hello', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl className="w-full">
                <Input placeholder="Email or Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-5">
          <Button disabled={loading} type="submit" className="px-8">
            Login
          </Button>
          <Button className="p-0" type="button" variant="link">
            Forgot Password?
          </Button>
        </div>
        <Link className="hover:underline block" href="/auth/signup">
          Don't have an account?
        </Link>
      </form>
    </Form>
  );
}
