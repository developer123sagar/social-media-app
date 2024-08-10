import { useEffect, useRef } from "react";

export function useVisibilityObserver(onVisible: () => void, onHidden: () => void) {
    const elementRef = useRef<HTMLVideoElement>(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onVisible();
          } else {
            onHidden();
          }
        },
        { threshold: 0.5 } 
      );
  
      if (elementRef.current) {
        observer.observe(elementRef.current);
      }
  
      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      };
    }, [onVisible, onHidden]);
  
    return elementRef;
  }