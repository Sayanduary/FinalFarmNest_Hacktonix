// src/GoogleTranslateWidget.jsx
import React, { useEffect } from 'react';

const GoogleTranslateWidget = () => {
  useEffect(() => {
    // Load Google Translate script only when the component mounts
    const script = document.createElement('script');
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup: Remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Initialize Google Translate element
  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,bn', // You can add more languages here
      },
      'google_translate_element'
    );
  };

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslateWidget;
