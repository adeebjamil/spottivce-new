import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  FaShieldAlt, 
  FaUserShield, 
  FaUserLock, 
  FaEnvelope, 
  FaCookieBite, 
  FaServer, 
  FaGlobe, 
  FaLock, 
  FaArrowRight, 
  FaExclamationTriangle
} from 'react-icons/fa';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<string>('introduction');
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  
  // Handle scrolling and highlighting active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Find the section that is currently in view
      Object.keys(sectionRefs.current).forEach((section) => {
        const element = sectionRefs.current[section];
        if (!element) return;
        
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          setActiveSection(section);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Policy sections with content
  const policySections = [
    { 
      id: 'introduction', 
      title: 'Introduction',
      icon: FaShieldAlt,
      content: `At Spottive Technologies, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.

      Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.

      We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this policy. You are encouraged to periodically review this privacy policy to stay informed of updates.` 
    },
    { 
      id: 'information-we-collect', 
      title: 'Information We Collect',
      icon: FaUserShield,
      content: `We may collect personal information that you voluntarily provide to us when you express interest in obtaining information about our products and services, participate in activities on our website, or otherwise contact us.

      The personal information we collect may include:
      • Contact information (name, email address, phone number, etc.)
      • Business information (company name, job title, etc.)
      • Technical information (IP address, browser type, device information, etc.)
      • Marketing preferences

      We may also collect information automatically when you visit our website, including:
      • Cookies and tracking technologies
      • Usage information (pages visited, time spent, etc.)
      • Location information` 
    },
    { 
      id: 'how-we-use-information', 
      title: 'How We Use Your Information',
      icon: FaUserLock,
      content: `We use the information we collect for various business purposes, including:
      
      • To provide, operate, and maintain our services
      • To improve and personalize your experience with us
      • To respond to your inquiries and fulfill your requests
      • To send administrative information, such as updates, security alerts, and support messages
      • To send marketing communications, in accordance with your preferences
      • To conduct research and analysis to better understand how users access and use our services
      • To develop new products, services, features, and functionality
      • To prevent fraudulent transactions, monitor against theft, and protect against criminal activity
      • To comply with legal obligations` 
    },
    { 
      id: 'information-sharing', 
      title: 'Information Sharing',
      icon: FaEnvelope,
      content: `We may share information in the following situations:

      • With third-party service providers to help us operate our business and website, conduct our business, or provide services to you
      • With our business partners to offer certain products, services, or promotions
      • In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business
      • With your consent or at your direction
      • To comply with applicable laws and regulations, to respond to a subpoena, search warrant, or other lawful request for information, or to otherwise protect our rights

      We do not sell, rent, or otherwise disclose your personal information to third parties for their marketing purposes without your explicit consent.` 
    },
    { 
      id: 'cookies', 
      title: 'Cookies & Tracking Technologies',
      icon: FaCookieBite,
      content: `We may use cookies, web beacons, tracking pixels, and other tracking technologies to help customize our website and improve your experience. When you access our website, your personal information is not collected through these tracking technologies.

      Most browsers are set to accept cookies by default. You can remove or reject cookies, but this might affect certain features or services on our website. Please see our Cookie Policy for more information on how we use cookies and how you can control them.` 
    },
    { 
      id: 'data-security', 
      title: 'Data Security',
      icon: FaServer,
      content: `We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.

      We will make any legally required disclosures of any breach of the security, confidentiality, or integrity of your electronically stored "personal data" to you via email or conspicuous posting on our website without unreasonable delay.` 
    },
    { 
      id: 'international-data', 
      title: 'International Data Transfers',
      icon: FaGlobe,
      content: `We are based in Dubai, UAE, and your information may be processed in the UAE and other countries where our service providers are located. These countries may have different data protection laws than your country of residence.

      By submitting your personal information to us, you acknowledge this transfer, storing, and processing. We will take reasonable steps to ensure that your data is treated securely and in accordance with this Privacy Policy.` 
    },
    { 
      id: 'your-rights', 
      title: 'Your Privacy Rights',
      icon: FaLock,
      content: `Depending on your location and applicable laws, you may have the right to:

      • Access the personal information we have about you
      • Correct inaccuracies in your personal information
      • Delete your personal information
      • Object to the processing of your personal information
      • Request restriction of processing your personal information
      • Request the transfer of your personal information
      • Withdraw consent

      To exercise these rights, please contact us using the details provided in the "Contact Us" section.` 
    }
  ];

  return (
    <>
      <Head>
        <title>Privacy Policy | Spottive Technologies</title>
        <meta name="description" content="Learn how Spottive Technologies collects, uses, and protects your personal information in accordance with privacy regulations." />
      </Head>

      {/* Hero Banner */}
      <div className="relative py-16 bg-gradient-to-br from-blue-600 to-indigo-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-76 h-76 bg-white/10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-0 right-0 w-76 h-76 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-white/20 rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold mb-4 rounded-full">
              <FaShieldAlt className="mr-2" />
              Privacy & Trust
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
              Learn how Spottive Technologies collects, uses, and protects your personal information
            </p>
            <div className="mt-8 text-sm text-blue-200">
              Last Updated: May 15, 2025
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Sidebar Navigation */}
            <div className="md:w-1/4">
              <div className="sticky top-24 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 relative inline-block">
                  Policy Contents
                  <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></span>
                </h3>
                <nav className="mt-6">
                  <ul className="space-y-2">
                    {policySections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            className={`flex items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                              activeSection === section.id
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sectionRefs.current[section.id]?.scrollIntoView({
                                behavior: 'smooth',
                              });
                            }}
                          >
                            <Icon className="mr-2 flex-shrink-0" size={16} />
                            <span>{section.title}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                
                {/* Contact Card */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5">
                  <h4 className="font-bold text-gray-900 mb-2">Questions?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    If you have any questions about our privacy practices, please contact us:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-700">
                      <span className="font-medium">Email:</span>
                      <a href="mailto:sales@spottive.com" className="ml-2 text-blue-600 hover:text-blue-800">
                        sales@spottive.com
                      </a>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="font-medium">Phone:</span>
                      <a href="tel:+971552341712" className="ml-2 text-blue-600 hover:text-blue-800">
                        +971 55 234 1712
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:w-3/4">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                {policySections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <section 
                      key={section.id} 
                      id={section.id}
                      ref={(el) => { sectionRefs.current[section.id] = el; }}
                      className="mb-12 scroll-mt-24"
                    >
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white mr-4">
                          <Icon size={20} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                      </div>
                      <div className="text-gray-600 prose prose-blue max-w-none ml-14">
                        {section.content.split('\n\n').map((paragraph, idx) => (
                          <p key={idx} className="mb-4">
                            {paragraph.trim().startsWith('•') ? (
                              <ul className="list-disc pl-5 space-y-2">
                                {paragraph.split('•').filter(Boolean).map((item, i) => (
                                  <li key={i}>{item.trim()}</li>
                                ))}
                              </ul>
                            ) : (
                              paragraph
                            )}
                          </p>
                        ))}
                      </div>
                    </section>
                  );
                })}
                
                {/* Contact Section */}
                <section id="contact-us" className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white mr-4">
                      <FaEnvelope size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 ml-14">
                    <p className="text-gray-700 mb-4">
                      If you have questions or comments about this Privacy Policy, wish to exercise your rights regarding your personal data, or have any concerns about how your data is being handled, please contact us:
                    </p>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-900">Spottive Technologies</p>
                        <p className="text-gray-600">#2 Lootah Building, AI Raffa St., Bur Dubai, UAE</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <a href="mailto:sales@spottive.com" className="text-blue-600 hover:text-blue-800">
                          sales@spottive.com
                        </a>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <a href="tel:+971552341712" className="text-blue-600 hover:text-blue-800">
                          +971 55 234 1712
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* Important Notice */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-r-lg ml-14">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        This privacy policy is provided for informational purposes only. It is not legal advice and does not create an attorney-client relationship. We recommend consulting with a qualified legal professional for specific advice about your situation.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Policy Navigation */}
                <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
                  <Link
                    href="/terms-of-service"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span className="mr-2">Terms of Service</span>
                    <FaArrowRight size={12} />
                  </Link>
                  <Link
                    href="/cookie-policy"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span className="mr-2">Cookie Policy</span>
                    <FaArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}