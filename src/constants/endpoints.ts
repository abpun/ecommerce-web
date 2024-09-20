import { objectToQueryString } from '@/lib/utils';

export const PRODUCT = {
  GET: (query?: Record<string, any>) => {
    if (!query || Object.keys(query).length === 0) {
      return '/products';
    }
    const queryString = objectToQueryString(query);
    return `/products?${queryString}`;
  },
  GET_BY_SLUG: (slug: string) => `/product/${slug}`,
};

export const AUTH = {
  SIGN_UP: '/auth/signup',
  SIGN_IN: '/auth/signin',
};
