export interface ButtonProps {
    variant: 'primary' | 'secondary';
    size: 'small' | 'medium' | 'large';
    label: string;
    onClick?: () => void;
  }