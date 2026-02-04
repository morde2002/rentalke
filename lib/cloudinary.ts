/**
 * Optimize Cloudinary image URLs for performance
 * Adds automatic format (WebP/AVIF), quality optimization, and responsive sizing
 *
 * This will dramatically reduce image file sizes and improve LCP score
 */

export function optimizeCloudinaryImage(
  url: string,
  options?: {
    width?: number;
    quality?: 'auto' | 'auto:low' | 'auto:good' | 'auto:best';
    format?: 'auto';
  }
): string {
  // Return original URL if not a Cloudinary image
  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }

  const {
    width,
    quality = 'auto:good',
    format = 'auto'
  } = options || {};

  // Build transformation string
  const transformations: string[] = [];

  // Auto format (converts to WebP on supported browsers, AVIF where possible)
  if (format) {
    transformations.push(`f_${format}`);
  }

  // Quality optimization (auto:good is best balance)
  if (quality) {
    transformations.push(`q_${quality}`);
  }

  // Width for responsive images
  if (width) {
    transformations.push(`w_${width}`);
  }

  // Add transformations to URL after /upload/
  const uploadIndex = url.indexOf('/upload/');
  if (uploadIndex === -1) return url;

  const before = url.substring(0, uploadIndex + 8);
  const after = url.substring(uploadIndex + 8);

  return `${before}${transformations.join(',')}/${after}`;
}

/**
 * Optimize video URLs for faster loading
 */
export function optimizeCloudinaryVideo(url: string): string {
  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }

  const uploadIndex = url.indexOf('/upload/');
  if (uploadIndex === -1) return url;

  const before = url.substring(0, uploadIndex + 8);
  const after = url.substring(uploadIndex + 8);

  // Auto format, quality optimization for video
  return `${before}f_auto,q_auto:good/${after}`;
}
