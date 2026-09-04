import { axiosForBackend } from '@lark-apaas/client-toolkit/utils/getAxiosForBackend';
import type { CreateInquiryRequest } from '@shared/api.interface';

export async function submitInquiry(data: CreateInquiryRequest) {
  const res = await axiosForBackend.post('/api/inquiries', data);
  return res.data;
}
