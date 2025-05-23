
import { useEffect } from 'react';

interface TawkToChatProps {
  propertyId: string; // Your Tawk.to Property ID
  widgetId: string;   // Your Tawk.to Widget ID
}

const TawkToChat: React.FC<TawkToChatProps> = ({ propertyId, widgetId }) => {
  useEffect(() => {
    // Tawk.to integration script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    // Append the script to the body
    document.body.appendChild(script);
    
    // Clean up on unmount
    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      
      // Remove any other Tawk.to elements that may have been created
      const tawkElements = document.querySelectorAll('[id^="tawk-"]');
      tawkElements.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, [propertyId, widgetId]);

  // This component doesn't render anything visible
  return null;
};

export default TawkToChat;
