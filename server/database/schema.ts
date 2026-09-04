/* eslint-disable */
/** auto generated, do not edit */
import { sql } from 'drizzle-orm';
import { boolean, foreignKey, index, integer, jsonb, pgTable, text, uniqueIndex, uuid, varchar, customType } from "drizzle-orm/pg-core"

export const customTimestamptz = customType<{
  data: Date;
  driverData: string;
  config: { precision?: number };
}>({
  dataType(config) {
    const precision = typeof config?.precision !== 'undefined'
      ? ` (${config.precision})`
      : '';
    return `timestamptz${precision}`;
  },
  toDriver(value: Date | string | number) {
    if (value == null) return value as any;
    if (typeof value === 'number') return new Date(value).toISOString();
    if (typeof value === 'string') return value;
    if (value instanceof Date) return value.toISOString();
    throw new Error('Invalid timestamp value');
  },
  fromDriver(value: string | Date): Date {
    if (value instanceof Date) return value;
    return new Date(value);
  },
});

export const userProfile = customType<{
  data: string;
  driverData: string;
}>({
  dataType() {
    return 'user_profile';
  },
  toDriver(value: string) {
    return sql`ROW(${value})::user_profile`;
  },
  fromDriver(value: string) {
    const [userId] = value.slice(1, -1).split(',');
    return userId.trim();
  },
});

export type FileAttachment = {
  bucket_id: string;
  file_path: string;
};

export const fileAttachment = customType<{
  data: FileAttachment;
  driverData: string;
}>({
  dataType() {
    return 'file_attachment';
  },
  toDriver(value: FileAttachment) {
    return sql`ROW(${value.bucket_id},${value.file_path})::file_attachment`;
  },
  fromDriver(value: string): FileAttachment {
    const [bucketId, filePath] = value.slice(1, -1).split(',');
    return { bucket_id: bucketId.trim(), file_path: filePath.trim() };
  },
});

export function escapeLiteral(str: string): string {
  return "'" + str.replace(/'/g, "''") + "'";
}

export const userProfileArray = customType<{
  data: string[];
  driverData: string;
}>({
  dataType() {
    return 'user_profile[]';
  },
  toDriver(value: string[]) {
    if (!value || value.length === 0) {
      return sql`'{}'::user_profile[]`;
    }
    const elements = value.map(id => `ROW(${escapeLiteral(id)})::user_profile`).join(',');
    return sql.raw(`ARRAY[${elements}]::user_profile[]`);
  },
  fromDriver(value: string): string[] {
    if (!value || value === '{}') return [];
    const inner = value.slice(1, -1);
    const matches = inner.match(/\([^)]*\)/g) || [];
    return matches.map(m => m.slice(1, -1).split(',')[0].trim());
  },
});

export const fileAttachmentArray = customType<{
  data: FileAttachment[];
  driverData: string;
}>({
  dataType() {
    return 'file_attachment[]';
  },
  toDriver(value: FileAttachment[]) {
    if (!value || value.length === 0) {
      return sql`'{}'::file_attachment[]`;
    }
    const elements = value.map(f =>
      `ROW(${escapeLiteral(f.bucket_id)},${escapeLiteral(f.file_path)})::file_attachment`
    ).join(',');
    return sql.raw(`ARRAY[${elements}]::file_attachment[]`);
  },
  fromDriver(value: string): FileAttachment[] {
    if (!value || value === '{}') return [];
    const inner = value.slice(1, -1);
    const matches = inner.match(/\([^)]*\)/g) || [];
    return matches.map(m => {
      const [bucketId, filePath] = m.slice(1, -1).split(',');
      return { bucket_id: bucketId.trim(), file_path: filePath.trim() };
    });
  },
});

export const siteSettings = pgTable("site_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  settingKey: varchar("setting_key", { length: 100 }).notNull().unique(),
  settingValue: text("setting_value"),
  description: varchar("description", { length: 255 }),
  // System field: Update time (auto-filled, do not modify)
  updatedAt: customTimestamptz("_updated_at", { precision: 3 }).notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  uniqueIndex("site_settings_setting_key_key").on(table.settingKey),
]);

export const admins = pgTable("admins", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  name: varchar("name", { length: 100 }),
  role: varchar("role", { length: 50 }).default('admin'),
  lastLogin: customTimestamptz("last_login", { precision: 3 }),
  mustChangePassword: boolean("must_change_password").default(false),
  // System field: Creation time (auto-filled, do not modify)
  createdAt: customTimestamptz("_created_at", { precision: 3 }).notNull().default(sql`CURRENT_TIMESTAMP`),
  // System field: Update time (auto-filled, do not modify)
  updatedAt: customTimestamptz("_updated_at", { precision: 3 }).notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  uniqueIndex("admins_username_key").on(table.username),
]);

export const clickEvents = pgTable("click_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 100 }),
  userFingerprint: varchar("user_fingerprint", { length: 100 }),
  pageUrl: text("page_url"),
  elementType: varchar("element_type", { length: 50 }),
  elementText: varchar("element_text", { length: 255 }),
  elementId: varchar("element_id", { length: 100 }),
  targetUrl: text("target_url"),
  utmSource: varchar("utm_source", { length: 100 }),
  utmMedium: varchar("utm_medium", { length: 100 }),
  utmCampaign: varchar("utm_campaign", { length: 100 }),
  // System field: Creation time (auto-filled, do not modify)
  createdAt: customTimestamptz("_created_at", { precision: 3 }).notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("idx_click_events_session_id").on(table.sessionId),
]);

export const pageViews = pgTable("page_views", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 100 }),
  userFingerprint: varchar("user_fingerprint", { length: 100 }),
  url: text("url").notNull(),
  pageTitle: varchar("page_title", { length: 255 }),
  referrer: text("referrer"),
  utmSource: varchar("utm_source", { length: 100 }),
  utmMedium: varchar("utm_medium", { length: 100 }),
  utmCampaign: varchar("utm_campaign", { length: 100 }),
  utmTerm: varchar("utm_term", { length: 255 }),
  utmContent: varchar("utm_content", { length: 255 }),
  ip: varchar("ip", { length: 50 }),
  userAgent: text("user_agent"),
  device: varchar("device", { length: 50 }),
  browser: varchar("browser", { length: 100 }),
  os: varchar("os", { length: 100 }),
  language: varchar("language", { length: 50 }),
  countryGuess: varchar("country_guess", { length: 100 }),
  durationSeconds: integer("duration_seconds").default(0),
  // System field: Creation time (auto-filled, do not modify)
  createdAt: customTimestamptz("_created_at", { precision: 3 }).notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("idx_page_views_session_id").on(table.sessionId),
  index("idx_page_views_created_at").on(table.createdAt),
]);

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 100 }).notNull().unique(),
  userFingerprint: varchar("user_fingerprint", { length: 100 }),
  firstVisitAt: customTimestamptz("first_visit_at", { precision: 3 }).notNull().default(sql`CURRENT_TIMESTAMP`),
  lastVisitAt: customTimestamptz("last_visit_at", { precision: 3 }).notNull().default(sql`CURRENT_TIMESTAMP`),
  pageCount: integer("page_count").default(1),
  utmSource: varchar("utm_source", { length: 100 }),
  utmMedium: varchar("utm_medium", { length: 100 }),
  utmCampaign: varchar("utm_campaign", { length: 100 }),
  countryGuess: varchar("country_guess", { length: 100 }),
  device: varchar("device", { length: 50 }),
  ip: varchar("ip", { length: 50 }),
}, (table) => [
  uniqueIndex("sessions_session_id_key").on(table.sessionId),
  index("idx_sessions_session_id").on(table.sessionId),
]);

export const inquiries = pgTable("inquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  whatsapp: varchar("whatsapp", { length: 50 }),
  country: varchar("country", { length: 100 }),
  productId: uuid("product_id"),
  productName: varchar("product_name", { length: 255 }),
  quantity: integer("quantity"),
  message: text("message"),
  utmSource: varchar("utm_source", { length: 100 }),
  utmMedium: varchar("utm_medium", { length: 100 }),
  utmCampaign: varchar("utm_campaign", { length: 100 }),
  utmTerm: varchar("utm_term", { length: 255 }),
  utmContent: varchar("utm_content", { length: 255 }),
  referrer: text("referrer"),
  ip: varchar("ip", { length: 50 }),
  userAgent: text("user_agent"),
  device: varchar("device", { length: 50 }),
  browser: varchar("browser", { length: 100 }),
  os: varchar("os", { length: 100 }),
  countryGuess: varchar("country_guess", { length: 100 }),
  status: varchar("status", { length: 50 }).default('new'),
  notes: text("notes"),
  // System field: Creation time (auto-filled, do not modify)
  createdAt: customTimestamptz("_created_at", { precision: 3 }).notNull().default(sql`CURRENT_TIMESTAMP`),
  // System field: Update time (auto-filled, do not modify)
  updatedAt: customTimestamptz("_updated_at", { precision: 3 }).notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("idx_inquiries_status").on(table.status),
  index("idx_inquiries_utm_source").on(table.utmSource),
  index("idx_inquiries_created_at").on(table.createdAt),
  foreignKey({
    columns: [table.productId],
    foreignColumns: [products.id],
    name: "inquiries_product_id_fkey",
  }),
]);

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  nameEn: varchar("name_en", { length: 255 }),
  model: varchar("model", { length: 100 }).notNull(),
  socketType: varchar("socket_type", { length: 50 }).notNull(),
  powerW: integer("power_w").notNull().default(60),
  lumen: integer("lumen").notNull().default(8000),
  colorTempK: integer("color_temp_k").notNull().default(6000),
  voltage: varchar("voltage", { length: 50 }).default('DC 9-32V'),
  ipRate: varchar("ip_rate", { length: 20 }).default('IP67'),
  lifespanHours: integer("lifespan_hours").default(50000),
  material: varchar("material", { length: 100 }).default('Aviation Aluminum'),
  description: text("description"),
  descriptionEn: text("description_en"),
  /**
   * @type {string[]}
   */
  features: jsonb("features").default('[]'),
  /**
   * @type {string[]}
   */
  images: jsonb("images").default('[]'),
  moq: integer("moq").default(1),
  packaging: varchar("packaging", { length: 255 }),
  deliveryTime: varchar("delivery_time", { length: 100 }),
  warranty: varchar("warranty", { length: 50 }).default('2 Years'),
  priceRange: varchar("price_range", { length: 100 }),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  // System field: Creation time (auto-filled, do not modify)
  createdAt: customTimestamptz("_created_at", { precision: 3 }).notNull().default(sql`CURRENT_TIMESTAMP`),
  // System field: Update time (auto-filled, do not modify)
  updatedAt: customTimestamptz("_updated_at", { precision: 3 }).notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("idx_products_socket_type").on(table.socketType),
  index("idx_products_is_active").on(table.isActive),
]);

// table aliases
export const adminsTable = admins;
export const clickEventsTable = clickEvents;
export const inquiriesTable = inquiries;
export const pageViewsTable = pageViews;
export const productsTable = products;
export const sessionsTable = sessions;
export const siteSettingsTable = siteSettings;
