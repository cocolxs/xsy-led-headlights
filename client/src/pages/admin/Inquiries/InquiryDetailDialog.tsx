import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { X, Clock, Eye, MousePointerClick } from 'lucide-react';
import { getInquiry, updateInquiry } from '@/api/admin';
import type { Inquiry, InquiryStatus, UserJourneyStep } from '@shared/api.interface';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';

const STATUS_OPTIONS: { value: InquiryStatus; label: string; color: string }[] = [
  { value: 'new', label: '新询盘', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { value: 'contacted', label: '已联系', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { value: 'quoted', label: '已报价', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { value: 'converted', label: '已成交', color: 'bg-green-100 text-green-700 border-green-200' },
  { value: 'lost', label: '已流失', color: 'bg-slate-200 text-slate-600 border-slate-300' },
];

interface InquiryDetailDialogProps {
  open: boolean;
  inquiryId: string | null;
  onClose: () => void;
  onUpdated: () => void;
}

export default function InquiryDetailDialog({
  open,
  inquiryId,
  onClose,
  onUpdated,
}: InquiryDetailDialogProps) {
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [journeySteps, setJourneySteps] = useState<UserJourneyStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open || !inquiryId) {
      setInquiry(null);
      setJourneySteps([]);
      return;
    }
    const loadDetail = async () => {
      setLoading(true);
      try {
        const detail = await getInquiry(inquiryId);
        setInquiry(detail);
        setNotes(detail.notes ?? '');
        setJourneySteps((detail as unknown as { journeySteps?: UserJourneyStep[] }).journeySteps ?? []);
      } catch {
        toast.error('加载询盘详情失败');
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [open, inquiryId]);

  const handleStatusChange = async (status: InquiryStatus) => {
    if (!inquiry) return;
    setSaving(true);
    try {
      const updated = await updateInquiry(inquiry.id, { status, notes });
      setInquiry(updated);
      toast.success('状态已更新');
      onUpdated();
    } catch {
      toast.error('更新失败');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!inquiry) return;
    setSaving(true);
    try {
      const updated = await updateInquiry(inquiry.id, { notes });
      setInquiry(updated);
      toast.success('备注已保存');
      onUpdated();
    } catch {
      toast.error('保存失败');
    } finally {
      setSaving(false);
    }
  };

  const statusObj = STATUS_OPTIONS.find((s) => s.value === inquiry?.status);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>询盘详情</span>
            {inquiry && (
              <Badge className={statusObj?.color ?? ''}>
                {statusObj?.label ?? inquiry.status}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Spinner className="size-6 text-[#0A2540]" />
          </div>
        ) : inquiry ? (
          <div className="space-y-6">
            {/* Basic info */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs text-slate-500">姓名</label>
                <p className="font-medium text-slate-800">{inquiry.name}</p>
              </div>
              <div>
                <label className="text-xs text-slate-500">公司</label>
                <p className="font-medium text-slate-800">{inquiry.company || '-'}</p>
              </div>
              <div>
                <label className="text-xs text-slate-500">邮箱</label>
                <p className="text-[#0A2540]">{inquiry.email}</p>
              </div>
              <div>
                <label className="text-xs text-slate-500">国家</label>
                <p className="font-medium text-slate-800">{inquiry.country || inquiry.countryGuess || '-'}</p>
              </div>
              <div>
                <label className="text-xs text-slate-500">电话</label>
                <p className="font-medium text-slate-800">{inquiry.phone || '-'}</p>
              </div>
              <div>
                <label className="text-xs text-slate-500">WhatsApp</label>
                <p className="font-medium text-slate-800">{inquiry.whatsapp || '-'}</p>
              </div>
              <div>
                <label className="text-xs text-slate-500">感兴趣的产品</label>
                <p className="font-medium text-slate-800">{inquiry.productName || '-'}</p>
              </div>
              <div>
                <label className="text-xs text-slate-500">数量</label>
                <p className="font-medium text-slate-800">{inquiry.quantity || '-'}</p>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-xs text-slate-500">询盘内容</label>
              <p className="mt-1 whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                {inquiry.message || '无'}
              </p>
            </div>

            {/* UTM / Source info */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h4 className="mb-2 text-sm font-medium text-slate-700">来源信息</h4>
              <div className="grid grid-cols-2 gap-3 text-xs md:grid-cols-4">
                <div>
                  <span className="text-slate-500">来源: </span>
                  <span className="font-medium text-slate-700">{inquiry.utmSource || 'Direct'}</span>
                </div>
                <div>
                  <span className="text-slate-500">媒介: </span>
                  <span className="font-medium text-slate-700">{inquiry.utmMedium || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-500">广告系列: </span>
                  <span className="font-medium text-slate-700">{inquiry.utmCampaign || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-500">关键词: </span>
                  <span className="font-medium text-slate-700">{inquiry.utmTerm || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-500">设备: </span>
                  <span className="font-medium text-slate-700">{inquiry.device || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-500">IP: </span>
                  <span className="font-medium text-slate-700">{inquiry.ip || '-'}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500">提交时间: </span>
                  <span className="font-medium text-slate-700">
                    {new Date(inquiry.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Status change */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                变更状态
              </label>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((opt) => (
                  <Button
                    key={opt.value}
                    variant={inquiry.status === opt.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusChange(opt.value)}
                    disabled={saving}
                    className={
                      inquiry.status === opt.value
                        ? 'bg-[#0A2540]'
                        : ''
                    }
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                备注
              </label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="添加备注..."
                rows={3}
              />
              <div className="mt-2 flex justify-end">
                <Button size="sm" onClick={handleSaveNotes} disabled={saving}>
                  {saving && <Spinner className="size-4" />}
                  保存备注
                </Button>
              </div>
            </div>

            {/* User journey timeline */}
            {journeySteps.length > 0 && (
              <div>
                <label className="mb-3 block text-sm font-medium text-slate-700">
                  用户访问路径
                </label>
                <div className="space-y-3 border-l-2 border-slate-200 pl-4">
                  {journeySteps.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div
                        className="absolute -left-[22px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white border-2 border-[#00C2FF]"
                      >
                        {step.type === 'page_view' ? (
                          <Eye className="size-2 text-[#00C2FF]" />
                        ) : (
                          <MousePointerClick className="size-2 text-[#00C2FF]" />
                        )}
                      </div>
                      <div className="ml-2">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="size-3" />
                          {new Date(step.timestamp).toLocaleString()}
                          <Badge variant="secondary" className="text-[10px] py-0">
                            {step.type === 'page_view' ? '页面访问' : '点击事件'}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-slate-700">
                          {step.pageTitle || step.elementText || step.url}
                        </p>
                        <p className="text-xs text-slate-400 truncate">{step.url}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}

        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="size-5" />
        </button>
      </DialogContent>
    </Dialog>
  );
}
