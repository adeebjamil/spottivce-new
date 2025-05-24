import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Footer from './Footer';
import AdminLayout from './AdminLayout';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  
  // Check if current route is admin
  const isAdminRoute = router.pathname.startsWith('/admin');
  
  // For admin dashboard routes, use AdminLayout
  if (isAdminRoute && router.pathname !== '/admin') {
    return <AdminLayout>{children}</AdminLayout>;
  }
  
  // For admin login page, use a clean layout (no navbar/footer)
  if (router.pathname === '/admin') {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    );
  }
  
  // For regular routes, use normal layout
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;