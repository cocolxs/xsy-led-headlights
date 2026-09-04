import { axiosForBackend } from '@lark-apaas/client-toolkit/utils/getAxiosForBackend';
import type {
  AdminLoginRequest,
  AdminLoginResponse,
  DashboardResponse,
  InquiryListParams,
  InquiryListResponse,
  Inquiry,
  UpdateInquiryRequest,
  MarketingAnalyticsParams,
  MarketingAnalyticsResponse,
  AnalyticsListParams,
  AnalyticsResponse,
  ProductListParams,
  ProductListResponse,
  Product,
  SiteSettings,
} from '@shared/api.interface';


const TOKEN_KEY = 'admin_token';

const adminAxios = axiosForBackend.create();

// Request interceptor: attach Bearer token
adminAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.set?.('Authorization', `Bearer ${token}`);
  }
  return config;
});

// Response interceptor: redirect to login on 401
adminAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('admin_info');
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        if (!currentPath.startsWith('/admin/login')) {
          window.location.assign('/admin/login');
        }
      }
    }
    return Promise.reject(error);
  }
);

// ---- Auth ----
export async function login(username: string, password: string) {
  const res = await adminAxios.post<AdminLoginResponse>('/api/admin/login', {
    username,
    password,
  } satisfies AdminLoginRequest);
  return res.data;
}

// ---- Dashboard ----
export async function getDashboard() {
  const res = await adminAxios.get<DashboardResponse>('/api/admin/dashboard');
  return res.data;
}

// ---- Inquiries ----
export async function getInquiries(params: InquiryListParams) {
  const res = await adminAxios.get<InquiryListResponse>('/api/admin/inquiries', {
    params,
  });
  return res.data;
}

export async function getInquiry(id: string) {
  const res = await adminAxios.get<Inquiry & { journeySteps: Array<{
    type: string;
    url: string;
    pageTitle?: string;
    elementText?: string;
    timestamp: string;
  }> }>(`/api/admin/inquiries/${id}`);
  return res.data;
}

export async function updateInquiry(id: string, data: UpdateInquiryRequest) {
  const res = await adminAxios.put<Inquiry>(`/api/admin/inquiries/${id}`, data);
  return res.data;
}

export async function exportInquiries(params: InquiryListParams) {
  const res = await adminAxios.get('/api/admin/inquiries/export', {
    params,
    responseType: 'blob',
  });
  // Trigger download
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  const contentDisposition = res.headers['content-disposition'];
  const filenameMatch = contentDisposition?.match(/filename="?([^"]+)"?/i);
  link.setAttribute('download', filenameMatch?.[1] ?? 'inquiries.csv');
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

// ---- Marketing ----
export async function getMarketing(params: MarketingAnalyticsParams) {
  const res = await adminAxios.get<MarketingAnalyticsResponse>('/api/admin/marketing', {
    params,
  });
  return res.data;
}

// ---- Analytics ----
export async function getAnalytics(params: AnalyticsListParams) {
  const res = await adminAxios.get<AnalyticsResponse>('/api/admin/analytics', {
    params,
  });
  return res.data;
}

// ---- Products ----
export async function getProducts(params: ProductListParams & { search?: string; isActive?: boolean }) {
  const res = await adminAxios.get<ProductListResponse>('/api/admin/products', {
    params,
  });
  return res.data;
}

export async function createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
  const res = await adminAxios.post<Product>('/api/admin/products', data);
  return res.data;
}

export async function updateProduct(id: string, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) {
  const res = await adminAxios.put<Product>(`/api/admin/products/${id}`, data);
  return res.data;
}

export async function deleteProduct(id: string) {
  const res = await adminAxios.delete(`/api/admin/products/${id}`);
  return res.data;
}

export async function toggleProduct(id: string) {
  const res = await adminAxios.patch<Product>(`/api/admin/products/${id}/toggle`);
  return res.data;
}

// ---- Settings ----
export async function getSettings() {
  const res = await adminAxios.get<SiteSettings>('/api/admin/settings');
  return res.data;
}

export async function updateSettings(data: Partial<SiteSettings>) {
  const res = await adminAxios.put<SiteSettings>('/api/admin/settings', data);
  return res.data;
}
