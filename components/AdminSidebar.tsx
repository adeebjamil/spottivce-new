import { useRouter } from 'next/router';
import { 
  MdDashboard, 
  MdInventory, 
  MdAssignment, 
  MdDescription, 
  MdContactPhone, 
  MdContacts, 
  MdEmail, 
  MdAnalytics,
  MdLogout,
  MdClose
} from 'react-icons/md';
import { toast } from 'react-toastify';

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }: AdminSidebarProps) => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    // Show confirmation
    toast.success('Logged out successfully');
    
    // Redirect to login
    window.location.href = '/admin';
  };

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: MdDashboard },
    { name: 'Products', href: '/admin/products', icon: MdInventory },
    { name: 'Product Assignment', href: '/admin/product-assignment', icon: MdAssignment },
    { name: 'Product Details', href: '/admin/product-details', icon: MdDescription },
    { name: 'Product Enquiry', href: '/admin/product-enquiry', icon: MdContactPhone },
    { name: 'Contact Data', href: '/admin/contact-data', icon: MdContacts },
    { name: 'Newsletter Data', href: '/admin/newsletter-data', icon: MdEmail },
    { name: 'Analytics', href: '/admin/analytics', icon: MdAnalytics },
  ];

  return (
    <>
      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-2xl`}>
        
        {/* Sidebar Header */}
        <div className="relative h-20 bg-gradient-to-r from-blue-600 to-purple-600 border-b border-gray-700">
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white p-1">
                <img
                  src="/logo.png"
                  alt="Company Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-white">
                <h1 className="text-lg font-bold tracking-wide">Admin Panel</h1>
                <p className="text-xs text-blue-100 opacity-80">Adeeb Jamil</p>
              </div>
            </div>
            
            {/* Mobile close button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:text-gray-300 transition-colors"
            >
              <MdClose size={24} />
            </button>
          </div>
          
          {/* Decorative gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
        </div>
        
        {/* Navigation Menu */}
        <nav className="mt-6 px-4 pb-20 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = router.pathname === item.href;
              
              return (
                <a
                  key={index}
                  href={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:transform hover:scale-105'
                  }`}
                >
                  <IconComponent 
                    size={20} 
                    className={`mr-3 transition-all duration-200 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`} 
                  />
                  <span className="truncate font-medium">{item.name}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                </a>
              );
            })}
          </div>
        </nav>

        {/* User Profile & Logout Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-700">
          {/* User Info */}
          <div className="mb-3 p-3 bg-gray-800 rounded-lg border border-gray-600">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">AJ</span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">Adeeb Jamil</p>
                <p className="text-gray-400 text-xs">Administrator</p>
              </div>
            </div>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium rounded-xl text-gray-300 bg-red-600 hover:bg-red-700 transition-all duration-200 hover:transform hover:scale-105 group"
          >
            <MdLogout size={20} className="mr-2 group-hover:animate-pulse" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
          <div 
            className="absolute inset-0" 
            onClick={() => setSidebarOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;