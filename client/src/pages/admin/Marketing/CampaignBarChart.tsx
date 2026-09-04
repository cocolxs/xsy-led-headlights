import ReactECharts from 'echarts-for-react';
import type { CampaignComparisonItem } from '@shared/api.interface';

interface CampaignBarChartProps {
  data: CampaignComparisonItem[];
}

const CAMPAIGN_COLORS = ['#0A2540', '#00C2FF', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];

export default function CampaignBarChart({ data }: CampaignBarChartProps) {
  const campaigns = data.map((d) => d.campaign || 'Unknown').slice(0, 10);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: ['PV', '询盘数'],
      top: 0,
      right: 0,
      textStyle: { color: '#64748B', fontSize: 12 },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: 40,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: campaigns,
      axisLine: { lineStyle: { color: '#E2E8F0' } },
      axisLabel: {
        color: '#94A3B8',
        fontSize: 11,
        rotate: 30,
        interval: 0,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#F1F5F9' } },
      axisLabel: { color: '#94A3B8', fontSize: 11 },
    },
    series: [
      {
        name: 'PV',
        type: 'bar',
        barWidth: '30%',
        itemStyle: {
          color: '#0A2540',
          borderRadius: [4, 4, 0, 0],
        },
        data: data.slice(0, 10).map((d) => d.pv),
      },
      {
        name: '询盘数',
        type: 'bar',
        barWidth: '30%',
        itemStyle: {
          color: '#00C2FF',
          borderRadius: [4, 4, 0, 0],
        },
        data: data.slice(0, 10).map((d) => d.inquiries),
      },
    ],
    color: CAMPAIGN_COLORS,
  };

  return <ReactECharts option={option} style={{ height: 300 }} />;
}
