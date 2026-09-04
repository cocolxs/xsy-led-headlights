import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  color?: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendLabel,
  color = '#00C2FF',
}: StatCardProps) {
  const isPositive = (trend ?? 0) >= 0;

  return (
    <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-500 truncate">{label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-800">{value}</p>
            {trend !== undefined && (
              <p
                className={cn(
                  'mt-2 text-xs font-medium',
                  isPositive ? 'text-emerald-600' : 'text-red-500'
                )}
              >
                {isPositive ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}%
                {trendLabel && <span className="text-slate-400"> {trendLabel}</span>}
              </p>
            )}
          </div>
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${color}15`, color }}
          >
            <Icon className="size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
