import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { 
  MdAdd, 
  MdEdit, 
  MdDelete, 
  MdClose, 
  MdCloudUpload, 
  MdImage,
  MdSave,
  MdCancel
} from 'react-icons/md';
import { toast } from 'react-toastify';
import { authenticatedFetch, refreshAdminData } from '../../lib/apiHelper';

interface Product {
  _id: string;
  name: string;
  shortDesc: string;
  category: string;
  subCategory: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const ProductsPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    shortDesc: '',
    category: '',
    subCategory: '',
    image: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const router = useRouter();

  // Authentication check
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    const token = localStorage.getItem('adminToken');
    
    if (auth === 'true' && token) {
      setIsAuthenticated(true);
      fetchProducts();
    } else {
      // Clear any stale auth data
      localStorage.removeItem('adminAuth');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      router.push('/admin');
    }
    setLoading(false);
  }, [router]);

  // Listen for refresh events from other components
  useEffect(() => {
    const handleRefresh = () => {
      fetchProducts();
    };

    window.addEventListener('refreshProducts', handleRefresh);
    return () => window.removeEventListener('refreshProducts', handleRefresh);
  }, []);

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await authenticatedFetch('/api/products');
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        toast.error('Failed to fetch products');
        console.error('Fetch error:', response.status);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to Cloudinary
  const uploadImage = async (): Promise<string> => {
    if (!selectedFile) return '';

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Image uploaded successfully!');
        return data.url;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return '';
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let imageUrl = formData.image;

      // Upload new image if selected
      if (selectedFile) {
        imageUrl = await uploadImage();
        if (!imageUrl) {
          setSubmitting(false);
          return;
        }
      }

      const method = editingProduct ? 'PUT' : 'POST';
      const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products';
      
      const response = await authenticatedFetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
        }),
      });

      if (response.ok) {
        await fetchProducts(); // Refresh current page
        await refreshAdminData(); // Refresh all related admin data
        resetForm();
        setShowForm(false);
        toast.success(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product? This will also remove all related data including product details, assignments, and enquiries.')) return;

    try {
      const response = await authenticatedFetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchProducts();
        await refreshAdminData(); // Refresh all related admin data
        toast.success('Product and all related data deleted successfully!');
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  // Handle edit
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      shortDesc: product.shortDesc,
      category: product.category,
      subCategory: product.subCategory,
      image: product.image
    });
    setPreviewImage(product.image);
    setShowForm(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      shortDesc: '',
      category: '',
      subCategory: '',
      image: ''
    });
    setEditingProduct(null);
    setSelectedFile(null);
    setPreviewImage('');
  };

  // Handle form cancellation
  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your products</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium flex items-center transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <MdAdd size={20} className="mr-2" />
          Add New Product
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
                >
                  <MdClose size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description *
                  </label>
                  <textarea
                    value={formData.shortDesc}
                    onChange={(e) => setFormData({...formData, shortDesc: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sub Category *
                  </label>
                  <input
                    type="text"
                    value={formData.subCategory}
                    onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                </div>

                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                    {previewImage ? (
                      <div className="mb-4">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="mx-auto h-32 w-32 object-cover rounded-xl"
                        />
                      </div>
                    ) : (
                      <MdImage size={48} className="mx-auto text-gray-400 mb-4" />
                    )}
                    
                    <div className="space-y-2">
                      <label
                        htmlFor="file-upload"
                        className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                      >
                        <MdCloudUpload size={20} className="mr-2" />
                        {previewImage ? 'Change Image' : 'Upload Image'}
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileSelect}
                        />
                      </label>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <MdCancel size={20} className="mr-2" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || uploadingImage}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 flex items-center"
                  >
                    <MdSave size={20} className="mr-2" />
                    {submitting ? (uploadingImage ? 'Uploading...' : 'Saving...') : (editingProduct ? 'Update Product' : 'Save Product')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        {products.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <MdImage size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p>Add your first product to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* Add this wrapper div with fixed height and vertical scrolling */}
            <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sub Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product.image && (
                            <img
                              className="h-12 w-12 rounded-xl object-cover mr-4 shadow-sm"
                              src={product.image}
                              alt={product.name}
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.shortDesc}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {product.subCategory}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="inline-flex items-center px-3 py-1 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <MdEdit size={16} className="mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="inline-flex items-center px-3 py-1 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <MdDelete size={16} className="mr-1" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;