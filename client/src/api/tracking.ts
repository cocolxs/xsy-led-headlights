import { axiosForBackend } from '@lark-apaas/client-toolkit/utils/getAxiosForBackend';
import type {
  PageViewPayload,
  ClickEventPayload,
  PageViewDurationUpdate,
} from '@shared/api.interface';

export async function trackPageView(payload: PageViewPayload): Promise<void> {
  await axiosForBackend.post('/api/track/page-view', payload);
}

export async function trackClick(payload: ClickEventPayload): Promise<void> {
  await axiosForBackend.post('/api/track/click', payload);
}

export async function updateDuration(
  payload: PageViewDurationUpdate,
): Promise<void> {
  await axiosForBackend.post('/api/track/page-view/duration', payload);
}
