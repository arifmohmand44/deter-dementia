export interface ButtonProps {
    text: string;
    disabled?: boolean;
    className?: string;
    icon?: any;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
}