/**
 * Resolves static asset paths dynamically to support subpath deployments
 * (e.g. GitHub Pages) and root domain deployments (e.g. Vercel/Netlify).
 * Prepends Vite's `import.meta.env.BASE_URL` to local relative/absolute paths,
 * while leaving remote absolute HTTP/HTTPS URLs untouched.
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  
  // Return remote URLs or base64 data strings as-is
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:')
  ) {
    return path;
  }

  // Ensure leading slash for normalization
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // Get the base URL configured in Vite and strip the trailing slash if present
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');

  return `${baseUrl}${normalizedPath}`;
}
