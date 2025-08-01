import { signal } from '@preact/signals';

export interface User {
    name: string;
}

// Global state for user using signals
export const userSignal = signal<User | null>(null);

/**
 * Hook for managing user state with @preact/signals
 * Provides reactive user state and actions
 */
export const useUser = () => {
    const login = (name: string) => {
        userSignal.value = { name };
    };

    const logout = () => {
        userSignal.value = null;
    };

    const createAccount = (name: string) => {
        userSignal.value = { name };
    };

    return {
        user: userSignal, // Return signal directly for reactivity
        login,
        logout,
        createAccount,
    };
};