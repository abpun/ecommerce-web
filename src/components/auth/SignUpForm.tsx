'use client';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { signUpSchema } from '@/lib/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import Link from 'next/link';

export default function SignUpForm() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    console.log(values);
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
