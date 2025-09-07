declare global {
  var userData: {
    name: string;
    email: string;
    role: 'admin' | 'customer' | 'provider';
    avatar: string;
    isLoggedIn: boolean;
  } | null;
}

export {};
