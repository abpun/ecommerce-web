'use client';
import { useRouter } from 'next/navigation';
import { HeartIcon } from 'lucide-react';
import Box from '../common/BoxLayout';
import ApiService from '@/lib/apiService';
import authService from '@/lib/authService';
import { PRODUCT_USER } from '@/constants/endpoints';
import { toast } from 'sonner';

export default function LikeButton({ product }: { product: any }) {
  const router = useRouter();
  const likeProduct = async () => {
    if (authService.isAuthenticated()) {
      const uid = authService.getUser()?.id;

      await ApiService.post(PRODUCT_USER.ADD_LIKE, {
        productId: product._id,
        userId: uid,
        interactionType: 'like',
      });
      toast('Product liked');
    } else {
      router.push('/auth/signin');
    }
  };

  return (
    <Box onClick={() => likeProduct()} className="rounded-full bg-white w-8 h-8 hover:text-primary cursor-pointer">
      <HeartIcon size={18} />
    </Box>
  );
}