// LED Headlight Product Images & Factory/Lab Images
// Generated via generate_image - professional product photography

const STATIC_BASE =
  '/spark/app/app_17d8u6xyc6v/runtime/api/v1/storage/object/bucket_aadks2krymugw_static/static%2F';

// Product images (1:1 ratio, dark blue gradient background)
export const productH4 = `${STATIC_BASE}aadks2ki6aeku_ve_miaoda`;
export const productH7 = `${STATIC_BASE}aadks2kkqyyiu_ve_miaoda`;
export const productH11 = `${STATIC_BASE}aadks2kezqwvw_ve_miaoda`;
export const product9005 = `${STATIC_BASE}aadks2hq7cubs_ve_miaoda`;
export const product9006 = `${STATIC_BASE}aadks2kkqy2au_ve_miaoda`;
export const productH1 = `${STATIC_BASE}aadks2kaghirs_ve_miaoda`;
export const product9012 = `${STATIC_BASE}aadks2hq7cuas_ve_miaoda`;
export const productD2S = `${STATIC_BASE}aadks2kezqwxw_ve_miaoda`;

// Factory & laboratory images (16:9 ratio)
export const factoryInterior = `${STATIC_BASE}aadks2jo3zmks_ve_miaoda`;
export const qualityLab = `${STATIC_BASE}aadks2kaghits_ve_miaoda`;

// Socket type → default product image mapping
export const productImageBySocket: Record<string, string> = {
  H4: productH4,
  H7: productH7,
  H11: productH11,
  '9005': product9005,
  '9006': product9006,
  H1: productH1,
  '9012': product9012,
  D2S: productD2S,
};

// Fallback image
export const productImageFallback = productH4;

export function getProductImage(socketType?: string): string {
  if (!socketType) return productImageFallback;
  return productImageBySocket[socketType] ?? productImageFallback;
}
