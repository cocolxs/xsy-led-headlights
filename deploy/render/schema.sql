-- ==========================================================
-- XSY LED Headlights 网站 - 数据库初始化脚本
-- 适用于 PostgreSQL 14+（Render / Supabase / Neon 等）
-- ==========================================================

-- 1. 站点设置表
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  description VARCHAR(255),
  _updated_at TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. 管理员表
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  role VARCHAR(50) DEFAULT 'admin',
  last_login TIMESTAMPTZ(3),
  must_change_password BOOLEAN DEFAULT false,
  _created_at TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  _updated_at TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. 产品表
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  model VARCHAR(100) NOT NULL,
  socket_type VARCHAR(50) NOT NULL,
  power_w INTEGER NOT NULL DEFAULT 60,
  lumen INTEGER NOT NULL DEFAULT 8000,
  color_temp_k INTEGER NOT NULL DEFAULT 6000,
  voltage VARCHAR(50) DEFAULT 'DC 9-32V',
  ip_rate VARCHAR(20) DEFAULT 'IP67',
  lifespan_hours INTEGER DEFAULT 50000,
  material VARCHAR(100) DEFAULT 'Aviation Aluminum',
  description TEXT,
  description_en TEXT,
  features JSONB DEFAULT '[]',
  images JSONB DEFAULT '[]',
  moq INTEGER DEFAULT 1,
  packaging VARCHAR(255),
  delivery_time VARCHAR(100),
  warranty VARCHAR(50) DEFAULT '2 Years',
  price_range VARCHAR(100),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  _created_at TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  _updated_at TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_socket_type ON products(socket_type);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);

-- 4. 询盘表
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  whatsapp VARCHAR(50),
  country VARCHAR(100),
  product_id UUID,
  product_name VARCHAR(255),
  quantity INTEGER,
  message TEXT,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  utm_term VARCHAR(255),
  utm_content VARCHAR(255),
  referrer TEXT,
  ip VARCHAR(50),
  user_agent TEXT,
  device VARCHAR(50),
  browser VARCHAR(100),
  os VARCHAR(100),
  country_guess VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new',
  notes TEXT,
  _created_at TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  _updated_at TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_utm_source ON inquiries(utm_source);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(_created_at);

-- 5. 埋点 - 会话表
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(100) NOT NULL UNIQUE,
  user_fingerprint VARCHAR(100),
  first_visit_at TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_visit_at TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  page_count INTEGER DEFAULT 1,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  country_guess VARCHAR(100),
  device VARCHAR(50),
  ip VARCHAR(50)
);

CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON sessions(session_id);

-- 6. 埋点 - 页面访问表
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(100),
  user_fingerprint VARCHAR(100),
  url TEXT NOT NULL,
  page_title VARCHAR(255),
  referrer TEXT,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  utm_term VARCHAR(255),
  utm_content VARCHAR(255),
  ip VARCHAR(50),
  user_agent TEXT,
  device VARCHAR(50),
  browser VARCHAR(100),
  os VARCHAR(100),
  language VARCHAR(50),
  country_guess VARCHAR(100),
  duration_seconds INTEGER DEFAULT 0,
  _created_at TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(_created_at);

-- 7. 埋点 - 点击事件表
CREATE TABLE IF NOT EXISTS click_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(100),
  user_fingerprint VARCHAR(100),
  page_url TEXT,
  element_type VARCHAR(50),
  element_text VARCHAR(255),
  element_id VARCHAR(100),
  target_url TEXT,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  _created_at TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_click_events_session_id ON click_events(session_id);

-- ==========================================================
-- 种子数据 - 站点设置
-- ==========================================================
INSERT INTO site_settings (setting_key, setting_value, description) VALUES
  ('site_name', 'XSY LED Headlights', '站点名称'),
  ('site_name_cn', '星盛源LED车灯', '站点中文名'),
  ('company_name', 'Dongguan Xingshengyuan Intelligent Technology Co., Ltd.', '公司英文名称'),
  ('company_name_cn', '东莞市星盛源智能科技有限公司', '公司中文名称'),
  ('email', 'info@xsy-led.com', '联系邮箱'),
  ('notification_email', 'info@xsy-led.com', '询盘通知邮箱'),
  ('phone', '+86-0769-86364567', '公司电话'),
  ('mobile', '+86-13592701978', '手机/微信'),
  ('address', 'No.141 Qingfeng West Road, Shijie Town, Dongguan, Guangdong, China', '公司地址英文'),
  ('address_cn', '广东省东莞市石碣镇庆丰西路141号', '公司地址中文'),
  ('whatsapp', '+86-13592701978', 'WhatsApp'),
  ('wechat', 'xsy-led', '微信号'),
  ('default_language', 'en', '默认语言')
ON CONFLICT (setting_key) DO NOTHING;

-- ==========================================================
-- 种子数据 - 默认管理员账号（密码：admin123，首次登录请修改）
-- 注意：实际部署时请通过 Render Shell 执行密码重置命令
-- ==========================================================
INSERT INTO admins (username, password_hash, name, role, must_change_password)
VALUES (
  'admin',
  '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'Administrator',
  'admin',
  true
) ON CONFLICT (username) DO NOTHING;
