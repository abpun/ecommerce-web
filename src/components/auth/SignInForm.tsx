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

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    console.log(values);
    if (values.username === 'admin' && values.password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/app');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
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
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-5">
          <Button type="submit" className="px-8">
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
