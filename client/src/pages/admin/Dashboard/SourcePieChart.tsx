import ReactECharts from 'echarts-for-react';
import type { SourceDistributionItem } from '@shared/api.interface';

interface SourcePieChartProps {
  data: SourceDistributionItem[];
}

const COLORS = ['#0A2540', '#00C2FF', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#64748B'];

export default function SourcePieChart({ data }: SourcePieChartProps) {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: { color: '#64748B', fontSize: 12 },
    },
    color: COLORS,
    series: [
      {
        name: '来源分布',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold' },
        },
        data: data.map((item) => ({
          value: item.count,
          name: item.source || 'Direct',
        })),
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 280 }} />;
}
