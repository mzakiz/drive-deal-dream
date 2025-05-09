
import React, { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Shield, Wallet, Clock, Car } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Analytics } from '@/services/analytics';
import { useLanguage } from '@/contexts/LanguageContext';

const HowItWorksSection = () => {
  const { t, isChangingLanguage } = useTranslation();
  const { language } = useLanguage();
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const isRTL = language === 'ar';
  
  const steps = [
    {
      id: 1,
      icon: <Shield className="h-8 w-8 md:h-10 md:w-10" />,
      titleKey: "how_it_works.step1.title",
      descriptionKey: "how_it_works.step1.description",
    },
    {
      id: 2,
      icon: <Wallet className="h-8 w-8 md:h-10 md:w-10" />,
      titleKey: "how_it_works.step2.title",
      descriptionKey: "how_it_works.step2.description",
    },
    {
      id: 3,
      icon: <Clock className="h-8 w-8 md:h-10 md:w-10" />,
      titleKey: "how_it_works.step3.title",
      descriptionKey: "how_it_works.step3.description",
    },
    {
      id: 4,
      icon: <Car className="h-8 w-8 md:h-10 md:w-10" />,
      titleKey: "how_it_works.step4.title",
      descriptionKey: "how_it_works.step4.description",
    }
  ];

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      Analytics.trackSectionScrolledTo({
        section: 'how_it_works',
        screen: 'landing_page',
        language,
      });
      
      const timer = setTimeout(() => {
        const allSteps = steps.map(step => step.id);
        setVisibleSteps(allSteps);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [inView, language]);

  // Improved rendering function for step content that correctly handles RTL
  const renderStepContent = (step: typeof steps[0], isLeftSide: boolean) => {
    return (
      <div className={`flex items-center mb-4 ${isLeftSide ? 'justify-start' : 'justify-end'} gap-4`}>
        {(isLeftSide && !isRTL) || (!isLeftSide && isRTL) ? (
          <>
            <div className="bg-tarabut-teal/20 p-4 rounded-full inline-flex items-center justify-center">
              <div className="text-tarabut-teal">{step.icon}</div>
            </div>
            <h3 className="text-xl font-semibold text-white">
              {isChangingLanguage ? '...' : t(step.titleKey)}
            </h3>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-white">
              {isChangingLanguage ? '...' : t(step.titleKey)}
            </h3>
            <div className="bg-tarabut-teal/20 p-4 rounded-full inline-flex items-center justify-center">
              <div className="text-tarabut-teal">{step.icon}</div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-b from-tarabut-dark to-tarabut-dark/90" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
            {isChangingLanguage ? '...' : t('how_it_works.title')}
          </h2>
          <p className="text-base md:text-lg text-tarabut-teal max-w-3xl mx-auto px-2">
            {isChangingLanguage ? '...' : t('how_it_works.subtitle')}
          </p>
        </div>

        <div ref={ref} className="relative max-w-5xl mx-auto">
          {/* Center vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 transform -translate-x-1/2 hidden md:block" />
          
          {/* Steps */}
          {steps.map((step, index) => {
            // For RTL or LTR, properly determine which side each step goes on
            const isLeftSide = isRTL ? index % 2 !== 0 : index % 2 === 0;
            
            return (
              <div
                key={step.id}
                className={`relative flex flex-col md:flex-row mb-20 last:mb-0 transition-all duration-500 ease-out ${
                  visibleSteps.includes(step.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Left side content */}
                <div className={`md:w-1/2 ${isLeftSide ? 'md:text-left' : 'md:text-right'}`}>
                  {isLeftSide && (
                    <div className={`hidden md:block ${isRTL ? 'pr-8' : 'pl-8'}`}>
                      {renderStepContent(step, true)}
                      <p className={`text-white/80 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {isChangingLanguage ? '...' : t(step.descriptionKey)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Center step indicator - Fixed circle with proper aspect ratio */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10 md:static md:flex md:items-center md:justify-center md:w-0 md:z-auto">
                  <div 
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-tarabut-teal flex items-center justify-center text-tarabut-dark font-bold"
                    style={{ 
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '9999px', // Ensure it's a perfect circle with CSS
                      aspectRatio: '1 / 1' // Force 1:1 aspect ratio
                    }}
                  >
                    {step.id}
                  </div>
                </div>

                {/* Right side content */}
                <div className={`md:w-1/2 ${isLeftSide ? 'md:text-right' : 'md:text-left'}`}>
                  {!isLeftSide && (
                    <div className={`hidden md:block ${isRTL ? 'pl-8' : 'pr-8'}`}>
                      {renderStepContent(step, false)}
                      <p className={`text-white/80 ${isRTL ? 'text-left' : 'text-right'}`}>
                        {isChangingLanguage ? '...' : t(step.descriptionKey)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Mobile content (centered below number) */}
                <div className="md:hidden mt-16 text-center">
                  <div className="flex flex-col items-center">
                    <div className="bg-tarabut-teal/20 p-4 rounded-full inline-flex mb-4">
                      <div className="text-tarabut-teal">{step.icon}</div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {isChangingLanguage ? '...' : t(step.titleKey)}
                    </h3>
                    <p className="text-white/80 max-w-sm mx-auto">
                      {isChangingLanguage ? '...' : t(step.descriptionKey)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
