import Container from '@/components/common/Container';
import Footer from '@/components/menu/Footer';
import Navbar from '@/components/menu/Navbar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="px-8">{children}</div>
      <Footer />
    </>
  );
}
