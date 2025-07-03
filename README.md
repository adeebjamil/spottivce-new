# Spottive - CCTV & Security Products Platform

![Spottive Logo](/logo.png)

## Overview

Spottive is a comprehensive web platform for showcasing and managing CCTV and security products from leading brands including Hikvision, Dahua, UNV, and Uniview. The platform features both public-facing product catalogs and a robust admin dashboard for complete product and customer enquiry management.

## Features

### Public Features
- **Brand Showcases** - Dedicated pages for each security brand with custom styling
- **Product Listings** - Browse products with filtering and sorting options
- **Responsive Design** - Optimized for mobile, tablet, and desktop viewing
- **Product Details** - Comprehensive product information with specifications
- **Product Enquiries** - Allow customers to inquire about specific products
- **Favorites System** - Users can save products to their favorites list

### Admin Features
- **Product Management** - Add, edit, and delete products
- **Brand Assignments** - Assign products to specific brands for organizational structure
- **Product Details Management** - Manage comprehensive product specifications and features
- **Enquiry Dashboard** - Track and respond to customer product enquiries
- **Status Tracking** - Monitor enquiry statuses (pending, contacted, resolved)
- **Analytics Overview** - Track key metrics for product and customer engagement

## Tech Stack
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: Custom JWT implementation
- **State Management**: React Context API and hooks
- **Icons**: React Icons (Material Design)
- **Notifications**: React Toastify
- **API Testing**: Postman

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- MongoDB instance
- Git

### Installation
1. Clone the repository
2. Install dependencies
3. Set up environment variables by creating a .env file in the root directory
4. Run the development server
5. Build for production

## Project Structure

## API Documentation

### Product APIs
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Product Details APIs
- `GET /api/product-details` - Get all product details (admin only)
- `POST /api/product-details` - Create product details (admin only)
- `PUT /api/product-details/:id` - Update product details (admin only)
- `DELETE /api/product-details/:id` - Delete product details (admin only)
- `GET /api/public/product-detail/:id` - Get public product details

### Product Assignments APIs
- `GET /api/product-assignments` - Get all brand product assignments
- `GET /api/product-assignments/:brand` - Get assignments for a specific brand
- `POST /api/product-assignments` - Create/update assignments (admin only)
- `DELETE /api/product-assignments/:brand` - Delete assignments (admin only)

### Product Enquiry APIs
- `GET /api/product-enquiry` - Get all enquiries (admin only)
- `POST /api/product-enquiry` - Submit a new enquiry (public)
- `PUT /api/product-enquiry/:id` - Update enquiry status (admin only)
- `DELETE /api/product-enquiry/:id` - Delete an enquiry (admin only)

## Security Implementation
The application implements multiple layers of security:

- **API Route Protection**:

  - Authentication middleware for admin routes
  - Direct API access protection
  - URL normalization to prevent path manipulation attacks

- **Authentication**:

  - JWT-based authentication for admin users
  - Secure token storage and validation
  - Session expiration handling

- **Data Validation**:

  - Input sanitization for all API requests
  - MongoDB ObjectID validation
  - Form data validation

## Deployment
This application can be deployed to platforms like Vercel, Netlify, or any hosting service that supports Next.js applications.

### Deployment to Vercel
1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy your application

## License
MIT License

## Contact
For questions or support, please reach out to your-email@example.com

© 2025 Spottive. All rights reserved.