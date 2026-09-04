import { axiosForBackend } from '@lark-apaas/client-toolkit/utils/getAxiosForBackend';
import type {
  Product,
  ProductListParams,
  ProductListResponse,
} from '@shared/api.interface';

export async function getProducts(
  params?: ProductListParams,
): Promise<ProductListResponse> {
  const res = await axiosForBackend.get<ProductListResponse>('/api/products', {
    params,
  });
  return res.data;
}

export async function getProduct(id: string): Promise<Product> {
  const res = await axiosForBackend.get<Product>(`/api/products/${id}`);
  return res.data;
}
