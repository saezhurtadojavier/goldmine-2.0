import React, { useState, useEffect, useRef } from 'react';
import { config } from '@/lib/config';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  lazy?: boolean;
  className?: string;
  placeholderSrc?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  lazy = true,
  className = '',
  placeholderSrc = '/placeholder.jpg',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!config.performance.lazyLoadImages);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!config.performance.lazyLoadImages) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: `${config.performance.lazyLoadOffset}px`,
      threshold: 0.01,
    });

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const imageUrl = isInView ? src : placeholderSrc;
  const showPlaceholder = !isLoaded && placeholderSrc;

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
      ref={imgRef}
    >
      {/* Placeholder */}
      {showPlaceholder && (
        <img
          src={placeholderSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      )}
      
      {/* Imagen real */}
      <img
        {...props}
        src={imageUrl}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={handleLoad}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        width={width}
        height={height}
      />
    </div>
  );
};

export default React.memo(Image);
