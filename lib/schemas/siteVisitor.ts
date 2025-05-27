export interface SiteVisitor {
  ip: string;
  userAgent: string;
  device: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  country: string;
  city: string;
  referrer: string;
  pageViews: number;
  timeOnSite: number; // in seconds
  timestamp: Date;
  path: string;
  query: string;
}