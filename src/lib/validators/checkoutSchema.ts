import { z } from 'zod';

export const checkoutSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  address: z.string().min(5, {
    message: 'Address must be at least 5 characters.',
  }),
  phone: z
    .string()
    .length(10, { message: 'Phone number must be exactly 10 digits.' })
    .regex(/^(97|98)\d{8}$/, {
      message: 'Phone number must start with 97 or 98 and be followed by 8 digits.',
    }),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  payment_method: z.enum(['cash', 'bank'], {
    invalid_type_error: 'Payment method must be either "cash" or "bank".',
  }),
});
