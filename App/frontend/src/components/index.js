// api/index.js

export const adminLogin = async (credentials) => {
    // Mock implementation for demonstration
    const { username, password } = credentials;
    if (username === 'admin' && password === 'adminpassword') {
      return { data: { token: 'admin_token_here' } };
    } else {
      throw new Error('Invalid admin credentials');
    }
  };
  