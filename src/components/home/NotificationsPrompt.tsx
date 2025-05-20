
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { toast } from 'sonner';

const NotificationsPrompt = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  
  useEffect(() => {
    // Check if the app can be installed as PWA
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      setIsInstallable(true);
    });

    // Add OneSignal script if it doesn't exist already
    if (!window.OneSignal) {
      const script = document.createElement('script');
      script.src = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';
      script.async = true;
      document.body.appendChild(script);
      
      script.onload = initializeOneSignal;
    } else {
      initializeOneSignal();
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', () => {});
    };
  }, []);

  const initializeOneSignal = () => {
    if (window.OneSignal) {
      window.OneSignal.init({
        appId: import.meta.env.VITE_ONESIGNAL_APP_ID || "your-onesignal-app-id",
      });
    }
  };

  const installApp = async () => {
    if (!deferredPrompt) {
      toast.info("Your browser doesn't support app installation, but you can still enable notifications.");
      return;
    }
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // We've used the prompt, and can't use it again, discard it
    setDeferredPrompt(null);
    setIsInstallable(false);
    
    if (outcome === 'accepted') {
      toast.success('Thanks for installing our app!');
    }
  };

  const enableNotifications = () => {
    if (window.OneSignal) {
      window.OneSignal.showNativePrompt();
      toast.success('Thanks for enabling notifications!');
    } else {
      toast.error('Unable to request notification permissions');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="bg-vet-blue/10 rounded-full p-2">
          <Bell className="h-6 w-6 text-vet-blue" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-lg text-vet-dark">Get Order Notifications</h3>
          <p className="text-gray-600 mt-1 mb-3">
            Never miss an order notification. {isInstallable ? 'Install our app and ' : ''}Enable notifications to stay updated.
          </p>
          
          <div className="flex flex-wrap gap-3">
            {isInstallable && (
              <Button 
                variant="outline" 
                onClick={installApp}
                className="bg-white hover:bg-gray-50"
              >
                Install App
              </Button>
            )}
            
            <Button onClick={enableNotifications}>
              Enable Notifications
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPrompt;

// Add this to window object to avoid TypeScript errors
declare global {
  interface Window {
    OneSignal: any;
  }
}
