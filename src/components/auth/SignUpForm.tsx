'use client';
import { z } from 'zod';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { AUTH } from '@/constants/endpoints';
import { Input } from '@/components/ui/input';
import { signUpSchema } from '@/lib/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

import Link from 'next/link';
import ApiService from '@/lib/apiService';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      const res = await ApiService.post(AUTH.SIGN_UP, values);

      if (res?.errors) {
        const errors = res.errors;
        Object.keys(errors).map(key => form.setError(key as 'root', { message: errors[key] }));
      } else {
        toast({
          title: 'User Registered',
          description: 'Please proceed to login',
          duration: 3000,
        });
        router.push('/auth/signin');
      }
    } catch (error) {
      console.log('hello', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl className="w-full">
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email or Phone number" {...field} />
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
        <Button type="submit" className="px-8 w-full">
          Create Account
        </Button>
        <div className="flex gap-2">
          <p>Already have an account?</p>
          <Link className="hover:underline block" href="/auth/signin">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
