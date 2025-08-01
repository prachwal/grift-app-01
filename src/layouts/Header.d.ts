export interface User {
    name: string;
}
export interface HeaderProps {
    user?: User | null;
    onLogin: () => void;
    onLogout: () => void;
    onCreateAccount: () => void;
}
export declare const Header: React.FC<HeaderProps>;
