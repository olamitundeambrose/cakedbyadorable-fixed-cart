import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie } from 'lucide-react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 shadow-lg z-50 border-t border-pink-200">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="w-6 h-6 text-pink-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-white mb-1">We use cookies</h3>
              <p className="text-pink-200 text-sm leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              onClick={declineCookies}
              variant="outline"
              className="border-pink-200 text-pink-200 hover:bg-pink-200 hover:text-black text-sm px-4 py-2"
            >
              Decline
            </Button>
            <Button
              onClick={acceptCookies}
              className="bg-pink-400 hover:bg-pink-500 text-black text-sm px-4 py-2"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
