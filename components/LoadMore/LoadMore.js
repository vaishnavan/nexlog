// components/LoadMore.js
import { useEffect, useRef } from 'react';

const LoadMore = ({ onLoadMore }) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [onLoadMore]);

  return <div ref={loaderRef} />;
};

export default LoadMore;
