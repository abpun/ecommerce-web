const BASE_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type RequestOptions = {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
};

class ApiService {
  private static async request(url: string, options: RequestOptions) {
    const { method, headers, body } = options;

    try {
      const response = await fetch(`${BASE_API_URL}${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(headers || {}),
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      return await response.json();
    } catch (error) {
      throw new Error('Api error');
    }
  }

  // GET request
  static async get(url: string, headers?: Record<string, string>) {
    return await this.request(url, { method: 'GET', headers });
  }

  // POST request
  static async post(url: string, body: any, headers?: Record<string, string>) {
    return await this.request(url, { method: 'POST', body, headers });
  }

  // PATCH request
  static async patch(url: string, body: any, headers?: Record<string, string>) {
    return await this.request(url, { method: 'PATCH', body, headers });
  }

  // DELETE request
  static async delete(url: string, headers?: Record<string, string>) {
    return await this.request(url, { method: 'DELETE', headers });
  }
}

export default ApiService;
