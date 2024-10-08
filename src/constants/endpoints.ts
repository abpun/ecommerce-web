import { objectToQueryString } from '@/lib/utils';

export const PRODUCT = {
  GET: (query?: Record<string, any>) => {
    if (!query || Object.keys(query).length === 0) {
      return '/products';
    }
    const queryString = objectToQueryString(query);
    return `/products?${queryString}`;
  },
  GET_PAGINATION: (query?: Record<string, any>) => {
    if (!query || Object.keys(query).length === 0) {
      return '/products/pagination';
    }
    const queryString = objectToQueryString(query);
    return `/products/pagination?${queryString}`;
  },
  GET_BY_SLUG: (slug: string) => `/product/${slug}`,
  GET_RELATED: (id: string) => `/products/related/${id}`,
  RECOMMEND: (id: string) => `/products/recommend/${id}`,
  SEARCH: (search: string) => `/products/search?q=${search}`,
  GET_BY_CATEGORY: (category: string) => `/products/category/${category}`,
  DELETE: (id: string) => `/products/${id}`,
};

export const PRODUCT_USER = {
  ADD_LIKE: '/user_product/add',
};

export const AUTH = {
  SIGN_UP: '/auth/signup',
  SIGN_IN: '/auth/signin',
};

export const ORDER = {
  CREATE: '/orders',
  GET_PAGINATION: (query?: Record<string, any>) => {
    if (!query || Object.keys(query).length === 0) {
      return '/orders/pagination';
    }
    const queryString = objectToQueryString(query);
    return `/orders/pagination?${queryString}`;
  },
  UPDATE: (id: string) => `/orders/${id}`,
  GET_BY_USER: (id: string) => `/orders/${id}`,
};

export const PAYMENT = {
  CREATE: '/payment',
  UPDATE: (id: string) => `/payment/${id}`,
};

export const USER = {
  GET_PAGINATION: (query?: Record<string, any>) => {
    if (!query || Object.keys(query).length === 0) {
      return '/users/pagination';
    }
    const queryString = objectToQueryString(query);
    return `/users/pagination?${queryString}`;
  },
};
