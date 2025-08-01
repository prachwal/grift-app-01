import { Component, type ComponentChildren } from 'preact';
/**
 * @fileoverview Error Boundary component for catching and handling errors
 * @packageDocumentation
 */
interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorInfo?: any;
}
interface ErrorBoundaryProps {
    children: ComponentChildren;
    fallback?: ComponentChildren;
    onError?: (error: Error, errorInfo: any) => void;
}
export declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState>;
    componentDidCatch(error: Error, errorInfo: any): void;
    handleRetry: () => void;
    handleReload: () => void;
    render(): ComponentChildren;
}
/**
 * Hook version for functional components
 */
export declare function useErrorHandler(): (error: Error, errorInfo?: any) => void;
export {};
