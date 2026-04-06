export interface CompanyConfig {
  name: string;
  industry: string;
  services: string[];
  phone: string;
  hours: string;
  location: string;
  avgJobValue: number;
  monthlyLeads: number;
  brandColor?: string;
}

export const companyConfigs: Record<string, CompanyConfig> = {
  'orlando-roofing-pros': {
    name: 'Orlando Roofing Pros',
    industry: 'Roofing',
    services: ['Roof Repair', 'Roof Replacement', 'Storm Damage', 'Inspections', 'Gutter Installation'],
    phone: '(407) 555-0123',
    hours: 'Mon-Fri 7am-6pm, Sat 8am-2pm',
    location: 'Orlando, FL',
    avgJobValue: 4500,
    monthlyLeads: 60,
    brandColor: '#1e40af',
  },
  'sunshine-hvac': {
    name: 'Sunshine HVAC',
    industry: 'HVAC',
    services: ['AC Repair', 'AC Installation', 'Heating Repair', 'Duct Cleaning', 'Maintenance Plans'],
    phone: '(407) 555-0456',
    hours: 'Mon-Sat 7am-7pm',
    location: 'Orlando, FL',
    avgJobValue: 3200,
    monthlyLeads: 45,
  },
  'premier-plumbing-orlando': {
    name: 'Premier Plumbing Orlando',
    industry: 'Plumbing',
    services: ['Emergency Plumbing', 'Drain Cleaning', 'Water Heater Repair', 'Pipe Repair', 'Bathroom Remodeling'],
    phone: '(407) 555-0789',
    hours: 'Mon-Fri 7am-7pm, Sat 8am-4pm',
    location: 'Orlando, FL',
    avgJobValue: 2800,
    monthlyLeads: 55,
  },
  'greenscape-landscaping': {
    name: 'GreenScape Landscaping',
    industry: 'Landscaping',
    services: ['Lawn Maintenance', 'Landscape Design', 'Irrigation Systems', 'Tree Trimming', 'Hardscaping'],
    phone: '(407) 555-0321',
    hours: 'Mon-Sat 7am-5pm',
    location: 'Orlando, FL',
    avgJobValue: 1800,
    monthlyLeads: 40,
    brandColor: '#15803d',
  },
};

export function buildSystemPrompt(config: CompanyConfig): string {
  return `You are the AI receptionist for ${config.name}, a ${config.industry} company in ${config.location}. You answer customer calls and chats professionally. Services offered: ${config.services.join(', ')}. Business hours: ${config.hours}. Your job is to help customers, answer questions about services, and book appointments. When booking, collect: customer name, phone number, preferred date/time, and service needed. Be friendly, professional, and efficient. Keep responses concise (2-3 sentences max). Do not use em dashes in your responses.`;
}

export function getCompanyFromParams(params: URLSearchParams): CompanyConfig | null {
  const name = params.get('name');
  const industry = params.get('industry');
  const services = params.get('services');

  if (!name || !industry) return null;

  return {
    name: name,
    industry: industry,
    services: services ? services.split(',').map(s => s.trim()) : [`${industry} Services`],
    phone: params.get('phone') || '(555) 000-0000',
    hours: params.get('hours') || 'Mon-Fri 8am-6pm',
    location: params.get('location') || 'Your Area',
    avgJobValue: parseInt(params.get('avgJobValue') || '3000'),
    monthlyLeads: parseInt(params.get('monthlyLeads') || '50'),
    brandColor: params.get('brandColor') || undefined,
  };
}
