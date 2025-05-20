
import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  title, 
  subtitle, 
  centered = false, 
  className = '' 
}) => {
  return (
    <div className={`mb-8 md:mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      {subtitle && (
        <span className="text-vet-teal text-lg font-medium block mb-1">{subtitle}</span>
      )}
      <h2 className="text-3xl md:text-4xl font-display font-bold text-vet-dark">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;
