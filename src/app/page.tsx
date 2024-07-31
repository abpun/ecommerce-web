import dynamic from 'next/dynamic';

const AuthCheck = dynamic(() => import('@/components/auth/AuthCheck'), { ssr: false });

export default async function Home() {
  return <AuthCheck />;
}
