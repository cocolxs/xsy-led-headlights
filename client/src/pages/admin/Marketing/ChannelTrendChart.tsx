import ReactECharts from 'echarts-for-react';
import type { DailyChannelTrendItem } from '@shared/api.interface';

interface ChannelTrendChartProps {
  data: DailyChannelTrendItem[];
}

const CHANNEL_COLORS = ['#0A2540', '#00C2FF', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#64748B'];

export default function ChannelTrendChart({ data }: ChannelTrendChartProps) {
  const dates = Array.from(new Set(data.map((d) => d.date))).sort();
  const sources = Array.from(new Set(data.map((d) => d.source)));

  const series = sources.map((source, idx) => ({
    name: source || 'Direct',
    type: 'line',
    stack: 'Total',
    smooth: true,
    showSymbol: false,
    lineStyle: { width: 0 },
    areaStyle: { opacity: 0.8 },
    itemStyle: { color: CHANNEL_COLORS[idx % CHANNEL_COLORS.length] },
    data: dates.map((date) => {
      const item = data.find((d) => d.date === date && d.source === source);
      return item?.pv ?? 0;
    }),
  }));

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
    },
    legend: {
      data: sources.map((s) => s || 'Direct'),
      top: 0,
      right: 0,
      textStyle: { color: '#64748B', fontSize: 12 },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 50,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dates.map((d) => d.slice(5)),
      axisLine: { lineStyle: { color: '#E2E8F0' } },
      axisLabel: { color: '#94A3B8', fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#94A3B8', fontSize: 11 },
    },
    series,
  };

  return <ReactECharts option={option} style={{ height: 300 }} />;
}
