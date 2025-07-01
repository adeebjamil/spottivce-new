import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MdArrowBack, 
  MdSecurity, 
  MdVideocam, 
  MdShield, 
  MdAnalytics, 
  MdCloud,
  MdCheckCircle,
  MdPlayArrow,
  MdDownload,
  MdPhone,
  MdClose,
  MdVolumeUp,
  MdVolumeOff,
  MdFullscreen,
  MdFullscreenExit,
  MdPause
} from 'react-icons/md';

type SolutionData = {
  title: string;
  subtitle: string;
  description: string;
  hero: string;
  icon: any;
  color: string;
  features: string[];
  benefits: Array<{ title: string; value: string }>;
  demoVideo?: string;
};

const solutionsData: Record<string, SolutionData> = {
  surveillance: {
    title: "Smart Surveillance Systems",
    subtitle: "AI-Powered Video Security Solutions",
    description: "Revolutionary surveillance technology that combines artificial intelligence with advanced video analytics to provide unparalleled security monitoring and threat detection capabilities.",
    hero: "/features-card/img0.webp",
    icon: MdVideocam,
    color: "blue",
    demoVideo: "https://youtu.be/gBV3nekvVxg?si=SEHEiDaukqdfm2Ui", // Replace with your actual video URL
    features: [
      "Real-time AI threat detection",
      "Facial recognition technology",
      "Advanced night vision capabilities",
      "Cloud-based storage solutions",
      "Mobile app integration",
      "24/7 monitoring support"
    ],
    benefits: [
      { title: "Reduce Security Incidents", value: "85%" },
      { title: "Faster Response Time", value: "60%" },
      { title: "Cost Reduction", value: "40%" },
      { title: "Detection Accuracy", value: "99.2%" }
    ]
  },
  "command-center": {
    title: "Unified Security Command Center",
    subtitle: "Centralized Security Management Platform",
    description: "Comprehensive security management solution that integrates all your security systems into a single, powerful command center for enhanced oversight and control.",
    hero: "/features-card/img1.webp",
    icon: MdShield,
    color: "purple",
    demoVideo: "https://youtu.be/gBV3nekvVxg?si=SEHEiDaukqdfm2Ui",
    features: [
      "Multi-site management",
      "Real-time dashboard analytics",
      "Automated alert systems",
      "Custom reporting tools",
      "Integration capabilities",
      "Role-based access control"
    ],
    benefits: [
      { title: "Operational Efficiency", value: "70%" },
      { title: "Response Coordination", value: "80%" },
      { title: "System Integration", value: "100%" },
      { title: "Cost Optimization", value: "45%" }
    ]
  },
  "rapid-response": {
    title: "Rapid Response Protocol",
    subtitle: "Lightning-Fast Security Response",
    description: "Advanced incident detection and automated response system with AI-driven threat assessment and emergency protocol activation.",
    hero: "/features-card/img2.webp",
    icon: MdSecurity,
    color: "emerald",
    demoVideo: "https://youtu.be/gBV3nekvVxg?si=SEHEiDaukqdfm2Ui",
    features: [
      "Instant alert systems",
      "Mobile access control",
      "Emergency protocols",
      "GPS tracking integration",
      "Real-time communication",
      "Automated escalation"
    ],
    benefits: [
      { title: "Response Speed", value: "90%" },
      { title: "Threat Prevention", value: "95%" },
      { title: "System Reliability", value: "99.8%" },
      { title: "Cost Efficiency", value: "50%" }
    ]
  },
  "cloud-security": {
    title: "Next-Gen Cloud Security",
    subtitle: "Advanced Cloud Infrastructure",
    description: "Cloud-based security infrastructure with edge computing, real-time synchronization, and unlimited scalability for modern businesses.",
    hero: "/features-card/img3.webp",
    icon: MdCloud,
    color: "orange",
    demoVideo: "https://youtu.be/gBV3nekvVxg?si=SEHEiDaukqdfm2Ui",
    features: [
      "Edge computing power",
      "Automatic backup systems",
      "Infinite scalability",
      "99.9% uptime guarantee",
      "Real-time sync",
      "Global accessibility"
    ],
    benefits: [
      { title: "Scalability", value: "Unlimited" },
      { title: "Uptime", value: "99.9%" },
      { title: "Performance", value: "300%" },
      { title: "Cost Savings", value: "60%" }
    ]
  },
  "security-analytics": {
    title: "Predictive Security Intelligence",
    subtitle: "AI-Powered Analytics Platform",
    description: "Machine learning-powered analytics platform that predicts security threats, optimizes performance, and provides actionable business insights.",
    hero: "/features-card/img4.webp",
    icon: MdAnalytics,
    color: "indigo",
    demoVideo: "https://youtu.be/gBV3nekvVxg?si=SEHEiDaukqdfm2Ui",
    features: [
      "Predictive AI modeling",
      "Threat intelligence",
      "Performance optimization",
      "Business insights",
      "Custom dashboards",
      "Advanced reporting"
    ],
    benefits: [
      { title: "Threat Prediction", value: "96%" },
      { title: "False Positives", value: "-80%" },
      { title: "Operational Efficiency", value: "75%" },
      { title: "ROI Improvement", value: "200%" }
    ]
  }
};

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Updated Video Modal Component for YouTube
const VideoModal = ({ isOpen, onClose, videoUrl, title }: {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const videoId = getYouTubeVideoId(videoUrl);
  
  if (!videoId) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-4">Invalid Video URL</h3>
          <p className="text-gray-600 mb-4">Please check the video URL.</p>
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-5xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h3 className="text-lg font-semibold">{title} - Demo Video</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close video"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* YouTube Video Container */}
        <div className="relative bg-black aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&fs=1`}
            title={`${title} Demo Video`}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t">
          <p className="text-sm text-gray-600 text-center">
            Press <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">ESC</kbd> to close or click outside the video
          </p>
        </div>
      </div>
    </div>
  );
};

export default function SolutionPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [solution, setSolution] = useState<SolutionData | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    if (slug && solutionsData[slug as string]) {
      setSolution(solutionsData[slug as string]);
    }
  }, [slug]);

  const handleGetStarted = () => {
    router.push('/contact');
  };

  const handleWatchDemo = () => {
    setIsVideoModalOpen(true);
  };

  const handleDownloadBrochure = () => {
    // Map solution slugs to their corresponding brochure files
    const brochureMap: Record<string, string> = {
      'surveillance': 'surveillance-brochure.pdf',
      'command-center': 'commercial-brochure.pdf', // Command center uses commercial brochure
      'rapid-response': 'commercial-brochure.pdf',  // Rapid response uses commercial brochure
      'cloud-security': 'cloud-brochure.pdf',
      'security-analytics': 'commercial-brochure.pdf' // Analytics uses commercial brochure
    };

    const brochureFile = brochureMap[slug as string];
    
    if (brochureFile) {
      // Create download link for the actual PDF file
      const link = document.createElement('a');
      link.href = `/brochures/${brochureFile}`;
      link.download = brochureFile;
      link.target = '_blank'; // Open in new tab if download fails
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log(`Downloading: ${brochureFile}`);
    } else {
      console.error('Brochure not found for solution:', slug);
      alert('Brochure not available for this solution. Please contact us for more information.');
    }
  };

  if (!solution) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading solution details...</p>
        </div>
      </div>
    );
  }

  const IconComponent = solution.icon;

  return (
    <>
      <Head>
        <title>{solution.title} | Security Solutions</title>
        <meta name="description" content={solution.description} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Back Button */}
            <Link href="/#features" className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 group">
              <MdArrowBack size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Solutions</span>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className={`inline-flex items-center px-4 py-2 bg-${solution.color}-100 text-${solution.color}-800 rounded-full text-sm font-semibold mb-6 shadow-lg`}>
                  <IconComponent className="mr-2" size={16} />
                  {solution.subtitle}
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                    {solution.title}
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {solution.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleGetStarted}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group"
                  >
                    <span>Get Started</span>
                    <MdArrowBack className="rotate-180 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                  </button>
                  
                  <button 
                    onClick={handleWatchDemo}
                    className="px-8 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group"
                  >
                    <MdPlayArrow size={20} className="group-hover:scale-110 transition-transform duration-300" />
                    <span>Watch Demo</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl group">
                  <Image
                    src={solution.hero}
                    alt={solution.title}
                    width={600}
                    height={400}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={handleWatchDemo}
                      className="p-4 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
                      aria-label="Watch demo video"
                    >
                      <MdPlayArrow size={32} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Key Features</h2>
              <p className="text-xl text-gray-600">Everything you need for comprehensive security</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solution.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <MdCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Proven Results</h2>
              <p className="text-xl text-gray-600">See the impact on your business</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {solution.benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{benefit.value}</div>
                  <div className="text-gray-700 font-medium">{benefit.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Security?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get started with our comprehensive security solution today and experience the difference.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={handleGetStarted}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <MdPhone size={20} />
                <span>Contact Sales</span>
              </button>
              <button onClick={handleDownloadBrochure} className="px-8 py-4 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                <MdDownload size={20} />
                <span>Download Brochure</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={solution.demoVideo || ''}
        title={solution.title}
      />
    </>
  );
}