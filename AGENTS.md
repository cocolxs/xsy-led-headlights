# LED Headlight B2B Website - AGENTS.md

## 项目概览
东莞市星盛源智能科技有限公司 B2B 外贸独立站，主营 LED 车头灯。包含前台展示站（6页，8语言）、管理后台（仪表盘/询盘/产品/投流分析/访问统计/设置）、数据埋点与投流追踪系统。

## 设计规范

### 色彩系统
- 主色深蓝：#0A2540（bg-primary / text-primary）
- 科技蓝/青色点缀：#00C2FF（accent）
- 次深蓝：#1A365D
- 背景：#FFFFFF / #F8FAFC
- 文本主：#1E293B
- 文本次：#64748B
- 边框：#E2E8F0
- 成功：#10B981
- 警告：#F59E0B
- 错误：#EF4444

### 排版
- 字体：Inter, system-ui, sans-serif
- 标题字号：text-4xl / text-3xl / text-2xl / text-xl
- 正文字号：text-base / text-sm
- 行高：leading-tight / leading-normal / leading-relaxed
- 字重：font-normal / font-medium / font-semibold / font-bold

### 间距
- 页面水平内边距：px-6 md:px-10 lg:px-16
- 区块垂直间距：py-16 md:py-24
- 卡片内边距：p-6
- 元素间距：gap-4 / gap-6 / gap-8

### 组件规范
- 按钮：圆角 rounded-lg，主按钮 bg-[#0A2540] text-white hover:bg-[#1A365D]
- 卡片：圆角 rounded-xl，边框 border border-slate-200，阴影 shadow-sm hover:shadow-md
- 输入框：圆角 rounded-lg，边框 border border-slate-300 focus:border-[#0A2540]
- 导航栏：固定顶部，bg-white/95 backdrop-blur-sm，border-b border-slate-200

### 响应式断点
- sm: 640px, md: 768px, lg: 1024px, xl: 1280px

## 技术架构

### 后端模块
- products - 产品API
- inquiries - 询盘API
- tracking - 埋点追踪API
- admin - 管理后台API（auth, dashboard, inquiries, products, analytics, marketing, settings）

### 前端页面
**前台（public）**：
- HomePage - 首页
- ProductsPage - 产品中心
- ProductDetailPage - 产品详情
- AboutPage - 关于我们
- ContactPage - 联系我们
- FAQPage - 常见问题

**后台（admin）**：
- AdminLoginPage - 登录页
- AdminDashboardPage - 仪表盘
- AdminInquiriesPage - 询盘管理
- AdminMarketingPage - 投流分析
- AdminAnalyticsPage - 访问统计
- AdminProductsPage - 产品管理
- AdminSettingsPage - 站点设置

### 共享数据契约
所有API类型定义在 shared/api.interface.ts

## 多语言
- 默认英文 English
- 支持：English, 中文简体, Español, Deutsch, Français, 日本語, Русский, العربية (RTL)
- 语言切换无刷新，使用 i18n context
- 阿拉伯语启用 RTL 布局

## 埋点与追踪
- 前端自动追踪 page view 和 click event
- UTM 参数自动捕获并存 cookie
- 询盘提交关联 UTM 信息
- GA4 / GTM / Facebook Pixel 通过后台配置动态注入
