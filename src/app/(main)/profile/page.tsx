'use client';
import React from 'react';
import Text from '@/components/common/Text';
import authService from '@/lib/authService';
import Box from '@/components/common/BoxLayout';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export default function page() {
  const form = useForm({
    defaultValues: {
      email: authService.getUser()?.email,
      name: authService.getUser()?.name,
      address: '',
    },
  });

  const onSubmit = async (values: any) => {
    // console.log(values);
  };

  return (
    <Box className="justify-start flex-col items-start py-6 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] px-8">
      <Text className="text-primary text-2xl font-semibold">Edit Your Profile</Text>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl className="w-full">
                  <Input placeholder="Name" {...field} />
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
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-5 justify-end">
            <Button variant="link">Cancel</Button>
            <Button type="button">Save Changes</Button>
          </div>
        </form>
      </Form>
    </Box>
  );
}
