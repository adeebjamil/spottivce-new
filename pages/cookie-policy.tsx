import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  FaCookieBite, 
  FaQuestion, 
  FaListUl, 
  FaCog, 
  FaUserShield, 
  FaGlobeAsia, 
  FaLock, 
  FaArrowRight, 
  FaExclamationTriangle
} from 'react-icons/fa';

export default function CookiePolicy() {
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

  // Cookie policy sections with content
  const cookieSections = [
    { 
      id: 'introduction', 
      title: 'Introduction',
      icon: FaCookieBite,
      content: `At Spottive Technologies, we use cookies and similar technologies to enhance your browsing experience on our website. This Cookie Policy explains what cookies are, how we use them, and your choices regarding their use.

      This Cookie Policy should be read alongside our Privacy Policy and Terms of Service. By continuing to browse or use our website, you agree to our use of cookies as described in this policy.` 
    },
    { 
      id: 'what-are-cookies', 
      title: 'What Are Cookies?',
      icon: FaQuestion,
      content: `Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.

      Cookies help website owners understand how users interact with their website, remember your preferences, and generally improve your browsing experience. They can also help ensure that advertisements you see online are more relevant to you and your interests.

      Cookies set by the website owner (in this case, Spottive Technologies) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable features or functionality to be provided on or through the website, such as analytics, advertising, and interactive content.` 
    },
    { 
      id: 'types-of-cookies', 
      title: 'Types of Cookies We Use',
      icon: FaListUl,
      content: `We use different types of cookies for various reasons:

      **Essential Cookies**: These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas of the website, and security features. The website cannot function properly without these cookies.

      **Preference Cookies**: These cookies enable a website to remember information that changes the way the website behaves or looks, like your preferred language or the region you are in.

      **Analytics Cookies**: These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's structure and content.

      **Marketing Cookies**: These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.` 
    },
    { 
      id: 'specific-cookies', 
      title: 'Specific Cookies Used',
      icon: FaCog,
      content: `Here is a list of the main cookies we use and what we use them for:

      **_ga, _gid, _gat (Google Analytics)**: These cookies are used to collect information about how visitors use our website. We use the information to compile reports and to help us improve the website. The cookies collect information in an anonymous form, including the number of visitors to the website, where visitors have come to the website from, and the pages they visited.

      **cookie_notice_accepted**: This cookie is used to remember your choice about accepting cookies.

      **session_id**: This cookie is used to identify your session on our website and is essential for the website to function properly.

      **user_preferences**: This cookie remembers your preferences, such as language and region.

      We may update this list as we change the cookies we use. Please check back periodically for updates.` 
    },
    { 
      id: 'managing-cookies', 
      title: 'Managing Your Cookies',
      icon: FaUserShield,
      content: `You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by following the instructions provided in the cookie banner when you first visit our website.

      You can also control cookies through your browser settings. Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit www.allaboutcookies.org.

      Here's how you can manage cookies in various browsers:

      • **Chrome**: Settings > Privacy and security > Cookies and other site data
      • **Firefox**: Options > Privacy & Security > Cookies and Site Data
      • **Safari**: Preferences > Privacy > Cookies and website data
      • **Edge**: Settings > Cookies and site permissions > Cookies and site data
      • **Opera**: Settings > Advanced > Privacy & security > Cookies

      Please note that restricting cookies may impact your experience on our website, as some features may not function properly.` 
    },
    { 
      id: 'third-party-cookies', 
      title: 'Third-Party Cookies',
      icon: FaGlobeAsia,
      content: `Some of our webpages may contain content from third parties, such as YouTube videos, Google Maps, social media feeds, and analytics services. These third parties may set their own cookies on your device when you visit our website.

      We do not control the placement of cookies by these third parties. Please visit the websites of these third parties if you want information about their use of cookies and how to manage them.

      Our website may also contain links to other websites. If you follow a link to any of these websites, please note that these websites have their own privacy and cookie policies. We do not accept any responsibility or liability for these policies. Please check these policies before you submit any personal data to these websites.` 
    },
    { 
      id: 'policy-changes', 
      title: 'Changes to this Policy',
      icon: FaLock,
      content: `We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page, and, where appropriate, notified to you. Please check back frequently to see any updates or changes.

      If we make significant changes to this policy, we may notify you through a notice on our website or by email.` 
    }
  ];

  return (
    <>
      <Head>
        <title>Cookie Policy | Spottive Technologies</title>
        <meta name="description" content="Learn about the cookies used on Spottive Technologies' website and how they enhance your browsing experience." />
      </Head>

      {/* Hero Banner */}
      <div className="relative py-16 bg-gradient-to-br from-green-600 to-teal-700">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-76 h-76 bg-white/10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-0 right-0 w-76 h-76 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-white/20 rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold mb-4 rounded-full">
              <FaCookieBite className="mr-2" />
              Cookie Information
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Cookie Policy
            </h1>
            <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto">
              Learn about the cookies used on our website and how they enhance your browsing experience
            </p>
            <div className="mt-8 text-sm text-green-200">
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
                  <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-green-500 to-teal-500"></span>
                </h3>
                <nav className="mt-6">
                  <ul className="space-y-2">
                    {cookieSections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            className={`flex items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                              activeSection === section.id
                                ? 'bg-green-50 text-green-700 font-medium'
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
                
                {/* Cookie Settings Card */}
                <div className="mt-8 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-5">
                  <h4 className="font-bold text-gray-900 mb-2">Cookie Settings</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    You can adjust your cookie preferences at any time using the button below:
                  </p>
                  <button
                    className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-teal-600 transition-all"
                    onClick={() => {
                      // This would typically open your cookie consent management tool
                      alert('Cookie preferences manager would open here');
                    }}
                  >
                    Manage Cookie Preferences
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:w-3/4">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                {cookieSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <section 
                      key={section.id} 
                      id={section.id}
                      ref={(el) => { sectionRefs.current[section.id] = el; }}
                      className="mb-12 scroll-mt-24"
                    >
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center text-white mr-4">
                          <Icon size={20} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                      </div>
                      <div className="text-gray-600 prose prose-green max-w-none ml-14">
                        {section.content.split('\n\n').map((paragraph, idx) => (
                          <p key={idx} className="mb-4">
                            {paragraph.includes('**') ? (
                              // Handle markdown-style bold text
                              <span dangerouslySetInnerHTML={{ 
                                __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                              }} />
                            ) : paragraph.trim().startsWith('•') ? (
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
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center text-white mr-4">
                      <FaLock size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 ml-14">
                    <p className="text-gray-700 mb-4">
                      If you have any questions about this Cookie Policy or our data practices, please contact us:
                    </p>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-900">Spottive Technologies</p>
                        <p className="text-gray-600">#2 Lootah Building, AI Raffa St., Bur Dubai, UAE</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <a href="mailto:sales@spottive.com" className="text-green-600 hover:text-green-800">
                          sales@spottive.com
                        </a>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <a href="tel:+971552341712" className="text-green-600 hover:text-green-800">
                          +971 55 234 1712
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* Cookie Illustration */}
                <div className="bg-green-50 rounded-2xl p-6 flex items-center justify-center mb-8 ml-14">
                  <div className="text-center">
                    <FaCookieBite size={64} className="mx-auto text-green-500 mb-4" />
                    <p className="text-green-800 font-medium">
                      We value your privacy and aim to be transparent about our data practices.
                    </p>
                  </div>
                </div>
                
                {/* Important Notice */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-r-lg ml-14">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        This cookie policy is provided for informational purposes only. It is not legal advice and does not create an attorney-client relationship. We recommend consulting with a qualified legal professional for specific advice about your situation.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Policy Navigation */}
                <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
                  <Link
                    href="/privacy-policy"
                    className="flex items-center text-green-600 hover:text-green-800 transition-colors"
                  >
                    <span className="mr-2">Privacy Policy</span>
                    <FaArrowRight size={12} />
                  </Link>
                  <Link
                    href="/terms-of-service"
                    className="flex items-center text-green-600 hover:text-green-800 transition-colors"
                  >
                    <span className="mr-2">Terms of Service</span>
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