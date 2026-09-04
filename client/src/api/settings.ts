import { axiosForBackend } from '@lark-apaas/client-toolkit/utils/getAxiosForBackend';

export interface PublicSettings {
  siteName: string;
  tagline: string;
  logoUrl?: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  address: string;
  workingHours: string;
  ga4Id?: string;
  gtmId?: string;
  facebookPixelId?: string;
}

export async function getPublicSettings(): Promise<PublicSettings> {
  const res = await axiosForBackend.get<PublicSettings>('/api/settings/public');
  return res.data;
}
