import ReactECharts from 'echarts-for-react';
import type { DeviceDistributionItem } from '@shared/api.interface';

interface DeviceChartProps {
  data: DeviceDistributionItem[];
}

const DEVICE_COLORS: Record<string, string> = {
  desktop: '#0A2540',
  mobile: '#00C2FF',
  tablet: '#10B981',
};

export default function DeviceChart({ data }: DeviceChartProps) {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      bottom: 0,
      textStyle: { color: '#64748B', fontSize: 12 },
    },
    series: [
      {
        name: '设备分布',
        type: 'pie',
        radius: ['50%', '75%'],
        center: ['50%', '42%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'center',
          formatter: '{total|设备总数}\n{value|' + data.reduce((s, d) => s + d.count, 0).toLocaleString() + '}',
          rich: {
            total: { color: '#94A3B8', fontSize: 12, lineHeight: 20 },
            value: { color: '#0A2540', fontSize: 22, fontWeight: 'bold', lineHeight: 30 },
          },
        },
        emphasis: {
          label: { show: true },
        },
        data: data.map((item) => ({
          value: item.count,
          name: item.device,
          itemStyle: { color: DEVICE_COLORS[item.device] ?? '#64748B' },
        })),
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 280 }} />;
}
