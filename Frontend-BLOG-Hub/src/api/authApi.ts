// Frontend-article-feeds-webapp/src/api/authApi.ts
import { BASE_URL } from '@/config';
import axios, { AxiosInstance } from 'axios';

interface LoginResponse {
    message: string;
    data: {
        token: string;
        user: {
            name: string;
            email: string;
        };
    };
}

interface SignupResponse {
    message: string;
    data: {
        token: string;
    };
}

const api: AxiosInstance = axios.create({
    baseURL: `${BASE_URL}/api`,
    timeout: 5000,
});

// Signup request
export const signup = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}): Promise<SignupResponse> => {
    try {
        const response = await api.post<SignupResponse>('/auth/signup', userData);
        console.log("Signup Response: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
};

// Login request
export const login = async (credentials: {
    identifier: string;
    password: string;
}): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>('/auth/login', credentials);
        console.log("Login Response: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export default api;
