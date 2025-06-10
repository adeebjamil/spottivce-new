import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  FaFileContract, 
  FaUserTie, 
  FaHandshake, 
  FaFileInvoiceDollar, 
  FaCopyright, 
  FaBan, 
  FaGavel, 
  FaGlobeAsia, 
  FaExclamationCircle, 
  FaArrowRight
} from 'react-icons/fa';

export default function TermsOfService() {
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

  // Terms sections with content
  const termsSections = [
    { 
      id: 'introduction', 
      title: 'Introduction',
      icon: FaFileContract,
      content: `Welcome to Spottive Technologies. These Terms of Service ("Terms") govern your use of our website, products, and services ("Services").

      By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access our Services.

      We reserve the right to modify these Terms at any time. We will always post the most current version on our website and indicate the date of the latest revision. Your continued use of our Services after any changes indicates your acceptance of the modified Terms.` 
    },
    { 
      id: 'account-responsibilities', 
      title: 'Account & Responsibilities',
      icon: FaUserTie,
      content: `When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding your account credentials and for all activities that occur under your account.

      You agree to notify us immediately of any unauthorized use of your account or any other breach of security. We cannot and will not be liable for any loss or damage arising from your failure to comply with these obligations.

      You are responsible for all content and activity on your account, even when content is posted by others who have access to your account.` 
    },
    { 
      id: 'service-usage', 
      title: 'Service Usage & Restrictions',
      icon: FaHandshake,
      content: `Our Services are provided for your legitimate business or personal use only. You agree not to use our Services:

      • In any way that violates any applicable national or international law or regulation
      • To transmit any material that is defamatory, obscene, or otherwise objectionable
      • To impersonate or attempt to impersonate Spottive Technologies, a Spottive Technologies employee, another user, or any other person
      • To engage in any conduct that restricts or inhibits anyone's use or enjoyment of our Services
      • To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of our Services or any server, computer, or database connected to our Services
      
      We reserve the right to terminate or suspend your account and refuse any current or future use of our Services for any reason at our sole discretion.` 
    },
    { 
      id: 'payment-terms', 
      title: 'Payment Terms',
      icon: FaFileInvoiceDollar,
      content: `For certain Services, you may be required to pay fees. You agree to provide current, complete, and accurate purchase and account information for all purchases made through our site.

      All payment information will be treated in accordance with our Privacy Policy. By submitting your payment information, you authorize us to charge your payment method for the total amount of your order.

      Prices for our Services may change at any time, and we do not provide price protection or refunds in the event of price reductions or promotional offerings. We will notify you of any changes in pricing before they take effect.

      You are responsible for any taxes, duties, or other governmental charges associated with your purchase.` 
    },
    { 
      id: 'intellectual-property', 
      title: 'Intellectual Property',
      icon: FaCopyright,
      content: `The Service and all content, features, and functionality, including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof (collectively, "Content"), are owned by Spottive Technologies, its licensors, or other providers of such material and are protected by UAE and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.

      These Terms permit you to use our Services for your personal, non-commercial use only. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Services, except as follows:

      • Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials
      • You may store files that are automatically cached by your web browser for display enhancement purposes
      • You may print or download one copy of a reasonable number of pages of the website for your own personal, non-commercial use and not for further reproduction, publication, or distribution
      
      You must not access or use for any commercial purposes any part of the website or any services or materials available through the website.` 
    },
    { 
      id: 'prohibited-activities', 
      title: 'Prohibited Activities',
      icon: FaBan,
      content: `You may use our Services only for lawful purposes and in accordance with these Terms. In addition to the restrictions outlined in other sections, you agree not to:

      • Use our Services in any manner that could disable, overburden, damage, or impair the site or interfere with any other party's use of the website
      • Use any robot, spider, or other automatic device, process, or means to access our Services for any purpose, including monitoring or copying any of the material on our Services
      • Use any manual process to monitor or copy any of the material on our Services or for any other unauthorized purpose
      • Use any device, software, or routine that interferes with the proper working of our Services
      • Introduce any viruses, trojan horses, worms, logic bombs, or other harmful material to our Services
      • Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of our Services
      • Attack our Services via a denial-of-service attack or a distributed denial-of-service attack

      We may terminate or suspend your access to all or part of our Services, without notice, for any conduct that we, in our sole discretion, believe is in violation of these Terms or is harmful to other users of our Services, us, or third parties, or for any other reason.` 
    },
    { 
      id: 'liability-disclaimer', 
      title: 'Liability & Disclaimer',
      icon: FaGavel,
      content: `Our Services and all Content are provided on an "as is," "as available" basis, without warranties of any kind, either express or implied. Neither Spottive Technologies nor any person associated with Spottive Technologies makes any warranty or representation with respect to the completeness, security, reliability, quality, accuracy, or availability of the Services.

      To the maximum extent permitted by law, Spottive Technologies disclaims all warranties of any kind, whether express or implied, statutory, or otherwise, including but not limited to any warranties of merchantability, non-infringement, and fitness for a particular purpose.

      Spottive Technologies will not be liable for any loss or damage caused by a distributed denial-of-service attack, viruses, or other technologically harmful material that may infect your computer equipment, computer programs, data, or other proprietary material due to your use of our Services or any services or items obtained through our Services or to your downloading of any material posted on it, or on any website linked to it.

      In no event will Spottive Technologies, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, the Services, any websites linked to it, any content on the websites or such other websites, including any direct, indirect, special, incidental, consequential, or punitive damages, including but not limited to, personal injury, pain and suffering, emotional distress, loss of revenue, loss of profits, loss of business or anticipated savings, loss of use, loss of goodwill, loss of data, and whether caused by tort (including negligence), breach of contract, or otherwise, even if foreseeable.` 
    },
    { 
      id: 'governing-law', 
      title: 'Governing Law',
      icon: FaGlobeAsia,
      content: `These Terms and any dispute or claim arising out of or in connection with them or their subject matter or formation (including non-contractual disputes or claims) shall be governed by and construed in accordance with the laws of the United Arab Emirates.

      Any legal suit, action, or proceeding arising out of, or related to, these Terms or our Services shall be instituted exclusively in the courts located in Dubai, UAE. You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.

      Any cause of action or claim you may have arising out of or relating to these Terms or our Services must be commenced within one (1) year after the cause of action accrues; otherwise, such cause of action or claim is permanently barred.` 
    }
  ];

  return (
    <>
      <Head>
        <title>Terms of Service | Spottive Technologies</title>
        <meta name="description" content="The terms and conditions governing your use of Spottive Technologies' website, products, and services." />
      </Head>

      {/* Hero Banner */}
      <div className="relative py-16 bg-gradient-to-br from-purple-600 to-indigo-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-76 h-76 bg-white/10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-0 right-0 w-76 h-76 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-white/20 rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold mb-4 rounded-full">
              <FaFileContract className="mr-2" />
              Legal Agreement
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto">
              The terms and conditions governing your use of Spottive Technologies' website, products, and services
            </p>
            <div className="mt-8 text-sm text-indigo-200">
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
                  Table of Contents
                  <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500"></span>
                </h3>
                <nav className="mt-6">
                  <ul className="space-y-2">
                    {termsSections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            className={`flex items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                              activeSection === section.id
                                ? 'bg-purple-50 text-purple-700 font-medium'
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
                <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-5">
                  <h4 className="font-bold text-gray-900 mb-2">Questions?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    If you have any questions about our terms, please contact us:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-700">
                      <span className="font-medium">Email:</span>
                      <a href="mailto:sales@spottive.com" className="ml-2 text-purple-600 hover:text-purple-800">
                        sales@spottive.com
                      </a>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="font-medium">Phone:</span>
                      <a href="tel:+971552341712" className="ml-2 text-purple-600 hover:text-purple-800">
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
                {/* Agreement Notice */}
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 mb-10">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaExclamationCircle className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Notice</h3>
                      <p className="text-gray-700">
                        By accessing or using Spottive Technologies' services, you agree to be bound by these Terms of Service. Please read them carefully before proceeding. If you do not agree with these terms, you must not access or use our services.
                      </p>
                    </div>
                  </div>
                </div>
                
                {termsSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <section 
                      key={section.id} 
                      id={section.id}
                      ref={(el) => { sectionRefs.current[section.id] = el; }}
                      className="mb-12 scroll-mt-24"
                    >
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white mr-4">
                          <Icon size={20} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                      </div>
                      <div className="text-gray-600 prose prose-purple max-w-none ml-14">
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
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white mr-4">
                      <FaFileContract size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 ml-14">
                    <p className="text-gray-700 mb-4">
                      If you have any questions about these Terms of Service, please contact us:
                    </p>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-900">Spottive Technologies</p>
                        <p className="text-gray-600">#2 Lootah Building, AI Raffa St., Bur Dubai, UAE</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <a href="mailto:sales@spottive.com" className="text-purple-600 hover:text-purple-800">
                          sales@spottive.com
                        </a>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <a href="tel:+971552341712" className="text-purple-600 hover:text-purple-800">
                          +971 55 234 1712
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* Legal Disclaimer */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-r-lg ml-14">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaExclamationCircle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        These Terms of Service are provided for informational purposes only. They do not constitute legal advice and do not create an attorney-client relationship. We recommend consulting with a qualified legal professional for specific advice about your situation.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Policy Navigation */}
                <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
                  <Link
                    href="/privacy-policy"
                    className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    <span className="mr-2">Privacy Policy</span>
                    <FaArrowRight size={12} />
                  </Link>
                  <Link
                    href="/cookie-policy"
                    className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
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