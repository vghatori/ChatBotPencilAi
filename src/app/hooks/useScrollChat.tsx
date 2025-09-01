import { useRef, useEffect } from 'react';

export function useAutoScroll(dependency: any) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dependency]);

  return scrollRef;
}
