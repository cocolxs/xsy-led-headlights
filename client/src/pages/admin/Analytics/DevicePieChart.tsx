import ReactECharts from 'echarts-for-react';
import type { DeviceOsStatItem } from '@shared/api.interface';

interface DevicePieChartProps {
  data: DeviceOsStatItem[];
  title?: string;
}

const PIE_COLORS = ['#0A2540', '#00C2FF', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#64748B'];

export default function DevicePieChart({ data, title }: DevicePieChartProps) {
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
    color: PIE_COLORS,
    title: title
      ? {
          text: title,
          left: 'center',
          top: 0,
          textStyle: { color: '#1E293B', fontSize: 14, fontWeight: 600 },
        }
      : undefined,
    series: [
      {
        type: 'pie',
        radius: ['50%', '75%'],
        center: ['35%', '55%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 13, fontWeight: 'bold' },
        },
        data: data.map((item) => ({
          value: item.count,
          name: item.value,
        })),
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 260 }} />;
}
