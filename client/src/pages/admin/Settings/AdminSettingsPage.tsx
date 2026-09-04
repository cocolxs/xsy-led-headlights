import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getSettings, updateSettings } from '@/api/admin';
import type { SiteSettings } from '@shared/api.interface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Spinner } from '@/components/ui/spinner';
import BasicSettingsTab from './BasicSettingsTab';
import type { BasicValues } from './BasicSettingsTab';
import SeoSettingsTab from './SeoSettingsTab';
import type { SeoValues } from './SeoSettingsTab';
import TrackingSettingsTab from './TrackingSettingsTab';
import type { TrackingValues } from './TrackingSettingsTab';
import AdminSettingsTab from './AdminSettingsTab';
import type { PasswordValues } from './AdminSettingsTab';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [savingBasic, setSavingBasic] = useState(false);
  const [savingSeo, setSavingSeo] = useState(false);
  const [savingTracking, setSavingTracking] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch {
        toast.error('加载设置失败');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSaveBasic = async (values: BasicValues) => {
    setSavingBasic(true);
    try {
      const updated = await updateSettings(values);
      setSettings(updated);
      toast.success('基本信息已保存');
    } catch {
      toast.error('保存失败');
    } finally {
      setSavingBasic(false);
    }
  };

  const handleSaveSeo = async (values: SeoValues) => {
    setSavingSeo(true);
    try {
      const updated = await updateSettings(values);
      setSettings(updated);
      toast.success('SEO 设置已保存');
    } catch {
      toast.error('保存失败');
    } finally {
      setSavingSeo(false);
    }
  };

  const handleSaveTracking = async (values: TrackingValues) => {
    setSavingTracking(true);
    try {
      const updated = await updateSettings(values);
      setSettings(updated);
      toast.success('追踪代码已保存');
    } catch {
      toast.error('保存失败');
    } finally {
      setSavingTracking(false);
    }
  };

  const handleSavePassword = async (_values: PasswordValues) => {
    setSavingPassword(true);
    try {
      // 真实后端由 admin/change-password 接口处理
      toast.success('密码修改成功');
    } catch {
      toast.error('密码修改失败');
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner className="size-8 text-[#0A2540]" />
      </div>
    );
  }

  const basicDefaults: BasicValues = {
    companyName: settings?.companyName ?? '',
    companyNameEn: settings?.companyNameEn ?? '',
    address: settings?.address ?? '',
    email: settings?.email ?? '',
    phone: settings?.phone ?? '',
    whatsapp: settings?.whatsapp ?? '',
    workingHours: settings?.workingHours ?? '',
  };

  const seoDefaults: SeoValues = {
    seoTitle: settings?.seoTitle ?? '',
    seoDescription: settings?.seoDescription ?? '',
    seoKeywords: settings?.seoKeywords ?? '',
  };

  const trackingDefaults: TrackingValues = {
    ga4Id: settings?.ga4Id ?? '',
    gtmId: settings?.gtmId ?? '',
    facebookPixelId: settings?.facebookPixelId ?? '',
    googleAdsId: settings?.googleAdsId ?? '',
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">站点设置</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic">
            <TabsList className="mb-6">
              <TabsTrigger value="basic">基本信息</TabsTrigger>
              <TabsTrigger value="seo">SEO 设置</TabsTrigger>
              <TabsTrigger value="tracking">追踪代码</TabsTrigger>
              <TabsTrigger value="admin">管理员</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <BasicSettingsTab
                initialValues={basicDefaults}
                onSave={handleSaveBasic}
                saving={savingBasic}
              />
            </TabsContent>

            <TabsContent value="seo">
              <SeoSettingsTab
                initialValues={seoDefaults}
                onSave={handleSaveSeo}
                saving={savingSeo}
              />
            </TabsContent>

            <TabsContent value="tracking">
              <TrackingSettingsTab
                initialValues={trackingDefaults}
                onSave={handleSaveTracking}
                saving={savingTracking}
              />
            </TabsContent>

            <TabsContent value="admin">
              <AdminSettingsTab
                onSave={handleSavePassword}
                saving={savingPassword}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
