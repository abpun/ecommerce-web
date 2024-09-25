interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthData {
  token: string;
  user: User;
  isLoggedIn: boolean;
}

class AuthService {
  private tokenKey: string;
  private userKey: string;

  constructor() {
    this.tokenKey = 'ecom_auth_token';
    this.userKey = 'ecom_auth_user';
  }

  setAuthData({ token, user }: { token: string; user: User }): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem(this.userKey);
      return user ? (JSON.parse(user) as User) : null;
    }
    return null;
  }

  clearAuthData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  async login(data: AuthData): Promise<void> {
    if (data.isLoggedIn && data.token && data.user) {
      this.setAuthData({
        token: data.token,
        user: data.user,
      });
    } else {
      console.error('Invalid credentials');
    }
  }

  logout(): void {
    this.clearAuthData();
  }
}

export default new AuthService();
