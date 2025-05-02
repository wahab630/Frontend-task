export interface LoginFormValues {
    username: string;
    password: string;
}

export type UserType = {
    accessToken: string;
    refreshToken: string;
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
};

export interface AuthContextType {
    user: UserType | null;
    login: (userData: UserType) => void;
    logout: () => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
}