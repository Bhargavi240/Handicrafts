export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  salePrice: number | null;
  stock: number;
  images: string[];
  tags: string[];
  categoryId: string | null;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export async function createOrder(orderData: any): Promise<{ success: boolean; orderId?: string; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    return await res.json();
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: 'Failed to connect to server' };
  }
}

export async function getOrders(): Promise<any[]> {
  try {
    const res = await fetch(`${API_URL}/orders`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export async function updateOrderStatus(orderId: string, status: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    return res.ok;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
}

export async function login(credentials: any): Promise<{ success: boolean; token?: string; user?: any; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return await res.json();
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, error: 'Failed to connect to server' };
  }
}

export async function register(userData: any): Promise<{ success: boolean; token?: string; user?: any; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await res.json();
  } catch (error) {
    console.error('Error registering:', error);
    return { success: false, error: 'Failed to connect to server' };
  }
}

export async function deleteProduct(id: string, token: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return res.ok;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    return false;
  }
}
