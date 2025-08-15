import { createHash } from 'crypto';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

// Simple hash function for client-side (in production, use proper server-side hashing)
const hashPassword = (password: string): string => {
  return btoa(password + 'wiremit_salt_' + password.length);
};

// Validate email format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' };
  }
  return { isValid: true, message: '' };
};

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input.replace(/[<>\"']/g, '');
};

// Get all users from localStorage
const getUsers = (): User[] => {
  try {
    const users = localStorage.getItem('wiremit_users');
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

// Save users to localStorage
const saveUsers = (users: User[]): void => {
  localStorage.setItem('wiremit_users', JSON.stringify(users));
};

// Sign up a new user
export const signUp = (data: SignUpData): { success: boolean; message: string; user?: User } => {
  const { name, email, password } = data;
  
  // Sanitize inputs
  const sanitizedName = sanitizeInput(name.trim());
  const sanitizedEmail = sanitizeInput(email.trim().toLowerCase());
  
  // Validate inputs
  if (!sanitizedName || !sanitizedEmail || !password) {
    return { success: false, message: 'All fields are required' };
  }
  
  if (!validateEmail(sanitizedEmail)) {
    return { success: false, message: 'Please enter a valid email address' };
  }
  
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return { success: false, message: passwordValidation.message };
  }
  
  const users = getUsers();
  
  // Check if user already exists
  if (users.find(user => user.email === sanitizedEmail)) {
    return { success: false, message: 'An account with this email already exists' };
  }
  
  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    name: sanitizedName,
    email: sanitizedEmail,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  saveUsers(users);
  
  return { success: true, message: 'Account created successfully', user: newUser };
};

// Login user
export const login = (credentials: LoginCredentials): { success: boolean; message: string; user?: User } => {
  const { email, password } = credentials;
  
  // Sanitize inputs
  const sanitizedEmail = sanitizeInput(email.trim().toLowerCase());
  
  if (!sanitizedEmail || !password) {
    return { success: false, message: 'Email and password are required' };
  }
  
  if (!validateEmail(sanitizedEmail)) {
    return { success: false, message: 'Please enter a valid email address' };
  }
  
  const users = getUsers();
  const user = users.find(u => u.email === sanitizedEmail);
  
  if (!user) {
    return { success: false, message: 'No account found with this email address' };
  }
  
  if (user.passwordHash !== hashPassword(password)) {
    return { success: false, message: 'Incorrect password' };
  }
  
  return { success: true, message: 'Login successful', user };
};

// Get current user from session
export const getCurrentUser = (): User | null => {
  try {
    const userSession = localStorage.getItem('wiremit_current_user');
    return userSession ? JSON.parse(userSession) : null;
  } catch {
    return null;
  }
};

// Save current user session
export const setCurrentUser = (user: User): void => {
  localStorage.setItem('wiremit_current_user', JSON.stringify(user));
};

// Logout user
export const logout = (): void => {
  localStorage.removeItem('wiremit_current_user');
};