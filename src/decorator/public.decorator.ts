import { SetMetadata } from '@nestjs/common';

/**
 * Decorator used to specify if an API is public.
 * If an API function is maked as public, the request does not require an access token
 *
 * Usage -- @Public()
 */
export const PUBLIC_KEY = 'Public';
export const Public = () => {
  return SetMetadata(PUBLIC_KEY, true);
}; // SetMetadata will assign the annotated function with a metadata with the key and the value provided. In this case the key and the value is - 'Public' = true.
