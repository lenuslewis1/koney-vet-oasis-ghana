
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  bgImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, bgImage }) => {
  const bgStyle = bgImage
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <div
      className={`py-16 md:py-24 ${bgImage ? 'text-white' : 'bg-vet-light'}`}
      style={bgStyle}
    >
      <div className="container-custom text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{title}</h1>
        {description && <p className="text-lg md:text-xl max-w-2xl mx-auto">{description}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
