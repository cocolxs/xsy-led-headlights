import ReactECharts from 'echarts-for-react';
import type { TrendDataPoint } from '@shared/api.interface';

interface TrendChartProps {
  data: TrendDataPoint[];
}

export default function TrendChart({ data }: TrendChartProps) {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
    },
    legend: {
      data: ['访问量 (PV)', '询盘数'],
      top: 0,
      right: 0,
      textStyle: { color: '#64748B', fontSize: 12 },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 40,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map((d) => d.date.slice(5)),
      axisLine: { lineStyle: { color: '#E2E8F0' } },
      axisLabel: { color: '#94A3B8', fontSize: 11 },
    },
    yAxis: [
      {
        type: 'value',
        name: 'PV',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#F1F5F9' } },
        axisLabel: { color: '#94A3B8', fontSize: 11 },
      },
      {
        type: 'value',
        name: '询盘数',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { color: '#94A3B8', fontSize: 11 },
      },
    ],
    series: [
      {
        name: '访问量 (PV)',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#0A2540', width: 2 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(10, 37, 64, 0.15)' },
              { offset: 1, color: 'rgba(10, 37, 64, 0)' },
            ],
          },
        },
        data: data.map((d) => d.pv),
      },
      {
        name: '询盘数',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: { color: '#00C2FF', width: 2 },
        itemStyle: { color: '#00C2FF' },
        data: data.map((d) => d.inquiries),
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 320 }} />;
}
