/**
 * Utility functions for common operations
 * Pure functions that can be used throughout the application
 */
/**
 * Format date to human readable string
 */
export declare const formatDate: (date: Date | string) => string;
/**
 * Format date with time
 */
export declare const formatDateTime: (date: Date | string) => string;
/**
 * Capitalize first letter of a string
 */
export declare const capitalize: (str: string) => string;
/**
 * Truncate text to specified length
 */
export declare const truncateText: (text: string, maxLength: number) => string;
/**
 * Generate random ID
 */
export declare const generateId: () => string;
/**
 * Debounce function to limit rate of function calls
 */
export declare const debounce: <T extends (...args: any[]) => any>(func: T, delay: number) => ((...args: Parameters<T>) => void);
/**
 * Throttle function to limit rate of function calls
 */
export declare const throttle: <T extends (...args: any[]) => any>(func: T, delay: number) => ((...args: Parameters<T>) => void);
/**
 * Deep clone an object
 */
export declare const deepClone: <T>(obj: T) => T;
/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 */
export declare const isEmpty: (value: any) => boolean;
/**
 * Format number with thousand separators
 */
export declare const formatNumber: (num: number) => string;
/**
 * Format currency
 */
export declare const formatCurrency: (amount: number, currency?: string) => string;
/**
 * Get initials from a name
 */
export declare const getInitials: (name: string) => string;
/**
 * Validate email format
 */
export declare const isValidEmail: (email: string) => boolean;
/**
 * Get random item from array
 */
export declare const getRandomItem: <T>(array: T[]) => T;
/**
 * Sleep function for async operations
 */
export declare const sleep: (ms: number) => Promise<void>;
