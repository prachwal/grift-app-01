// Button.tsx - Migrated to preact-nebula-ui

// @ts-ignore - brak definicji typów w pakiecie
import { Button as NebulaButton } from 'preact-nebula-ui';
import type { FunctionalComponent } from 'preact';

export interface ButtonProps {
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Button label */
  label: string;
  /** Click handler */
  onClick: (event: Event) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Loading state */
  loading?: boolean;
}

export const Button: FunctionalComponent<ButtonProps> = ({
  label,
  onClick,
  size,
  ...props
}) => {
  // Convert Event to MouseEvent for compatibility
  const handleClick = (event: MouseEvent) => {
    onClick(event as Event);
  };

  // Map our size values to preact-nebula-ui size values
  const sizeMapping = {
    'sm': 'small',
    'md': 'medium',
    'lg': 'large'
  } as const;

  const mappedSize = size ? sizeMapping[size] : 'medium';

  return (
    <NebulaButton
      onClick={handleClick}
      size={mappedSize}
      {...props}
    >
      {label}
    </NebulaButton>
  );
};
