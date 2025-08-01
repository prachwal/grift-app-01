export interface User {
    name: string;
}
export declare const userSignal: import("@preact/signals-core").Signal<User | null>;
/**
 * Hook for managing user state with @preact/signals
 * Provides reactive user state and actions
 */
export declare const useUser: () => {
    user: import("@preact/signals-core").Signal<User | null>;
    login: (name: string) => void;
    logout: () => void;
    createAccount: (name: string) => void;
};
