interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card = ({ children, className = '' }: CardProps) => {
    return (
        <div 
            className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 flex justify-center items-center ${className}`}
            role="article"
        >
            {children}
        </div>
    );
};

export default Card;
