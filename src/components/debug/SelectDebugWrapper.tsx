/**
 * @fileoverview Debug wrapper for preact-nebula-ui components
 * @packageDocumentation
 */

/**
 * @fileoverview Debug wrapper for preact-nebula-ui components
 * @packageDocumentation
 */
import type { ComponentChildren } from 'preact';
import { logSelectLifecycle } from '../../utils/logger';

interface SelectDebugWrapperProps {
    children?: ComponentChildren;
    [key: string]: any;
}

// Debug wrapper for Select component to catch errors
export function SelectDebugWrapper({ children, ...props }: SelectDebugWrapperProps) {
    logSelectLifecycle('SelectDebugWrapper rendering', {
        propsKeys: Object.keys(props),
        hasChildren: !!children,
        propsValues: props
    });

    // TEMPORARY FIX: Use fallback select due to hooks context issues with preact-nebula-ui
    // The real Select component has hooks context problems in our build setup
    logSelectLifecycle('Using fallback select due to hooks context issues', {
        reason: 'preact-nebula-ui hooks incompatibility'
    });

    const { options, value, onChange, placeholder, size, disabled, multiple } = props;

    const handleChange = (e: any) => {
        if (multiple) {
            // Handle multi-select
            const selectedOptions = Array.from(e.target.selectedOptions, (option: any) => option.value);
            onChange?.(selectedOptions);
        } else {
            // Handle single select
            onChange?.(e.target.value);
        }
    };

    return (
        <select
            value={multiple ? undefined : value}
            multiple={multiple}
            onChange={handleChange}
            disabled={disabled}
            data-testid="mock-select"
            className={`fallback-select px-3 py-2 border rounded-md ${size === 'small' ? 'text-sm' : 'text-base'} ${multiple ? 'h-24' : size === 'small' ? 'h-8' : 'h-10'} bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {!multiple && <option value="" disabled>{placeholder}</option>}
            {options?.map((option: any) => (
                <option
                    key={option.value}
                    value={option.value}
                    selected={multiple && Array.isArray(value) && value.includes(option.value)}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
}