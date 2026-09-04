import ReactECharts from 'echarts-for-react';
import type { FunnelData } from '@shared/api.interface';

interface FunnelChartProps {
  data: FunnelData[];
}

const FUNNEL_COLORS = ['#0A2540', '#1A365D', '#2D4A7A', '#00C2FF', '#10B981'];

export default function FunnelChart({ data }: FunnelChartProps) {
  const max = Math.max(...data.map((d) => d.count), 1);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: Array<{ name: string; value: number; marker: string }>) => {
        const item = data.find((d) => d.step === params[0]?.name);
        return `${params[0]?.marker}${params[0]?.name}<br/>数量: ${params[0]?.value}<br/>占比: ${item?.percentage.toFixed(1)}%`;
      },
    },
    grid: {
      left: '3%',
      right: '10%',
      bottom: '3%',
      top: 10,
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#94A3B8', fontSize: 11 },
      max,
    },
    yAxis: {
      type: 'category',
      data: [...data].reverse().map((d) => d.step),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#475569', fontSize: 12 },
    },
    series: [
      {
        type: 'bar',
        barWidth: 24,
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
          color: (params: { dataIndex: number }) =>
            FUNNEL_COLORS[(data.length - 1 - params.dataIndex) % FUNNEL_COLORS.length],
        },
        label: {
          show: true,
          position: 'right',
          color: '#64748B',
          fontSize: 12,
          formatter: (params: { value: number; dataIndex: number }) => {
            const item = [...data].reverse()[params.dataIndex];
            return `${params.value.toLocaleString()} (${item?.percentage.toFixed(1)}%)`;
          },
        },
        data: [...data].reverse().map((d) => d.count),
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 280 }} />;
}
