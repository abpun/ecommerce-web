import Footer from '@/components/menu/Footer';
import Navbar from '@/components/menu/Navbar';
import { cn } from '@/lib/utils';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div className="py-5">{children}</div>
      <Footer />
    </div>
  );
}
