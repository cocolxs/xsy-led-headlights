# 部署到 Render.com 完整指南

本指南将带你一步步把 XSY LED Headlights 网站部署到 Render 平台，让你的客户可以通过公开链接访问。

---

## 一、项目技术栈说明

| 部分 | 技术 |
|------|------|
| 前端框架 | React 19 + TypeScript + Vite + Tailwind CSS |
| 后端框架 | NestJS 10 + TypeScript |
| 数据库 | PostgreSQL 14+ |
| ORM | Drizzle ORM |
| 部署方式 | Docker 容器部署 |
| 多语言 | 8 种语言（英文默认、中文、西班牙语、德语、法语、日语、俄语、阿拉伯语 RTL） |

---

## 二、部署前准备

你需要准备以下账号：

1. **GitHub 账号**（免费，用于存放代码）- https://github.com
2. **Render 账号**（免费注册，有免费套餐）- https://render.com

---

## 三、步骤一：下载完整代码

### 方式 A：从妙搭平台下载

1. 在妙搭平台打开本应用
2. 点击预览窗口右上角的"代码下载"按钮
3. 选择"下载完整代码包"（zip 格式）
4. 解压到本地文件夹

### 方式 B：确认代码完整

解压后，文件夹结构应该是这样的：

```
你的项目文件夹/
├── client/              # 前端代码
├── server/              # 后端代码
├── shared/              # 共享类型
├── deploy/render/       # ← 本部署指南和配置文件
├── package.json
├── vite.config.ts
└── ...
```

---

## 四、步骤二：创建 GitHub 仓库

1. 登录 GitHub：https://github.com
2. 点击右上角 **+** → **New repository**
3. 填写信息：
   - **Repository name**: `xsy-led-headlights`（可自定义）
   - **Description**: `XSY LED Headlights B2B Website`
   - 选择 **Public**（公开仓库）或 **Private**（私有仓库，Render 也支持）
   - 不要勾选任何初始化选项
4. 点击 **Create repository**
5. 根据 GitHub 页面上显示的指令，在本地电脑上把代码推送到这个仓库（如果不熟悉 Git，可以下载 GitHub Desktop 图形化工具）

**简单的 Git 命令（在代码文件夹内打开终端执行）：**

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/xsy-led-headlights.git
git push -u origin main
```

---

## 五、步骤三：一键部署到 Render

### 方法 1：使用 render.yaml 一键部署（推荐）

1. 登录 Render：https://dashboard.render.com
2. 点击右上角 **New +** → **Blueprint**
3. 在 **Public Git repository** 中填入你的 GitHub 仓库地址：
   ```
   https://github.com/你的用户名/xsy-led-headlights
   ```
4. 点击 **Continue**
5. Render 会自动读取 `render.yaml` 配置，显示将要创建的服务：
   - **Web Service**: `xsy-led-headlights`（网站服务）
   - **PostgreSQL**: `xsy-led-db`（数据库）
6. 给服务起个名字，选择 **Starter** 套餐（起步最便宜，流量大了再升级）
7. 点击 **Apply**
8. 等待部署完成（第一次部署大约需要 5-10 分钟）

### 方法 2：手动创建 Web Service

如果你不想用 Blueprint，也可以手动创建：

1. 点击 **New +** → **PostgreSQL**，先创建数据库，记下数据库连接地址
2. 点击 **New +** → **Web Service**
3. 选择你的 GitHub 仓库
4. 配置：
   - **Runtime**: Docker
   - **Dockerfile Path**: `deploy/render/Dockerfile`
   - **Build Command**: （留空，Docker 自动构建）
   - **Start Command**: （留空）
   - **Plan**: Starter
5. 在 **Environment Variables** 中添加：
   - `DATABASE_URL` = 你刚才创建的 PostgreSQL 连接字符串（Internal Database URL）
   - `NODE_ENV` = `production`
   - `SERVER_HOST` = `0.0.0.0`
   - `SERVER_PORT` = `10000`
6. 点击 **Create Web Service**

---

## 六、步骤四：初始化数据库

部署成功后，网站是空白的，需要导入数据库表结构和产品数据。

### 导入表结构

1. 在 Render Dashboard 中，进入你的 PostgreSQL 数据库页面
2. 找到 **Connect** 部分，复制 **External Database URL**（以 `postgresql://` 开头）
3. 有两种方式执行 SQL：

**方式 A：使用 psql 命令行（推荐给技术人员）**
```bash
psql "你的数据库连接URL" -f deploy/render/schema.sql
psql "你的数据库连接URL" -f deploy/render/seed-products.sql
```

**方式 B：使用 Render Shell**
1. 进入 Web Service → 点击 **Shell** 标签
2. 安装 psql（如果系统没有）：
   ```bash
   apt-get update && apt-get install -y postgresql-client
   ```
3. 连接数据库并执行 SQL：
   ```bash
   psql "$DATABASE_URL" -c "\i deploy/render/schema.sql"
   psql "$DATABASE_URL" -c "\i deploy/render/seed-products.sql"
   ```

**方式 C：使用图形化工具**
- 下载 **DBeaver** 或 **TablePlus** 等数据库管理工具
- 用 External Database URL 连接数据库
- 打开并执行 `deploy/render/schema.sql`
- 再打开并执行 `deploy/render/seed-products.sql`

---

## 七、步骤五：验证网站

1. 在 Render Dashboard 中找到你的 Web Service
2. 复制网站地址（格式类似 `https://xsy-led-headlights.onrender.com`）
3. 在浏览器中打开，确认：
   - [ ] 首页能正常显示
   - [ ] 产品页面有 8 款产品
   - [ ] 产品详情页参数完整
   - [ ] 询盘表单能正常提交
   - [ ] 管理后台能登录（默认账号见下方）

### 默认管理员账号

部署后默认的后台管理账号：
- **用户名**: `admin`
- **密码**: `admin123`

**⚠️ 重要：首次登录后请立即修改密码！**

登录地址：`https://你的域名/admin/login`

---

## 八、配置自定义域名（可选）

如果你有自己的域名（如 `xsy-led.com`），可以配置：

1. 在 Render Dashboard 中进入你的 Web Service
2. 点击 **Settings** 标签
3. 找到 **Custom Domains** → **Add Custom Domain**
4. 输入你的域名（如 `www.xsy-led.com`）
5. Render 会给出 DNS 配置说明，去你的域名服务商那里添加一条 CNAME 记录
6. 等待 DNS 生效（通常几分钟到 1 小时）
7. Render 会自动配置 HTTPS 证书

---

## 九、环境变量清单

所有可配置的环境变量都在 `.env.example` 文件中。主要变量如下：

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `NODE_ENV` | 运行环境 | `production` |
| `SERVER_HOST` | 服务监听地址 | `0.0.0.0` |
| `SERVER_PORT` | 服务端口 | `10000`（Render 要求） |
| `DATABASE_URL` | PostgreSQL 连接串 | （Render 自动提供） |
| `APP_NAME` | 应用名称 | `XSY LED Headlights` |
| `NOTIFICATION_EMAIL` | 询盘通知邮箱 | `info@xsy-led.com` |

在 Render 中修改环境变量的位置：
Web Service → **Environment** → **Environment Variables**

修改后需要重新部署才会生效。

---

## 十、常见问题

### Q: 部署后网站打不开？
A: 查看 Render 的 **Logs** 标签，看是否有报错。最常见的原因是数据库连接地址配错了。

### Q: 产品图片不显示？
A: 产品图片使用的是第三方 CDN 地址（doubaocdn.com），如果客户在某些地区访问不了，可以把图片下载后换成你自己的图片地址。

### Q: Render 免费套餐够不够用？
A: 对于展示型外贸网站，免费套餐（Starter 的免费额度）足够。但注意：
- 免费 Web Service 15 分钟无访问会自动休眠，第一次打开稍慢
- 免费 PostgreSQL 90 天后会过期
- 正式上线建议至少用 **Starter** 付费套餐（约 $7/月起）

### Q: 如何更新网站内容？
A: 修改代码后 push 到 GitHub，Render 会自动重新部署。也可以在 Render Dashboard 手动点击 **Deploy** → **Latest commit**。

### Q: 询盘数据存在哪里？
A: 所有询盘数据都存在 Render 的 PostgreSQL 数据库中，可以通过管理后台查看和导出。

---

## 十一、部署按钮

把下面这段 Markdown 代码放到你的 GitHub README.md 中，别人就可以一键部署你的网站了：

```markdown
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/你的用户名/xsy-led-headlights)
```

---

## 十二、技术支持

如果部署过程中遇到问题：
1. 先检查 Render 的 **Logs** 页面看错误信息
2. 确认数据库连接 URL 是否正确
3. 确认数据库表结构是否已导入

本部署配置基于妙搭全栈模板（NestJS + React + PostgreSQL）生成。
