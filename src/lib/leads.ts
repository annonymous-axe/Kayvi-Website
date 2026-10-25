import { siteConfig } from '@/config/site';

export interface CalculatorLeadData {
  name: string;
  phone: string;
  city?: string;
  monthlyBill: number;
  systemSize: string; // e.g., "5.0 kW"
  monthlySavings: number;
  twentyYearSavings: number;
  payback: string; // e.g., "5.9 years"
  roofType: string;
  exposure: string;
  locale: string;
}

export interface LeadSubmissionResult {
  success: boolean;
  message?: string;
  whatsappUrl: string;
}

export function generateWhatsAppUrl(data: CalculatorLeadData): string {
  const cleanPhone = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
  const message = `Hello Kayvi Solar,
My name is *${data.name}* (${data.city || 'Surat'}).
I calculated a *${data.systemSize}* solar system for my electricity bill of *₹${data.monthlyBill.toLocaleString('en-IN')}/month* on your website calculator.
- Estimated Monthly Savings: *₹${data.monthlySavings.toLocaleString('en-IN')}*
- 20-Year Savings: *₹${data.twentyYearSavings.toLocaleString('en-IN')}*
- Roof Type: *${data.roofType}*
Please share the formal quotation and PM Surya Ghar subsidy eligibility details with me.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export async function submitLead(data: CalculatorLeadData): Promise<LeadSubmissionResult> {
  const whatsappUrl = generateWhatsAppUrl(data);
  const webhookUrl = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL || (siteConfig as any).leadWebhookUrl || 'https://api.kayvisolar.com/api/v1/leads';

  const payload = {
    source: 'Website Solar Calculator',
    leadType: 'Calculator Quote Request',
    customer: {
      name: data.name,
      phone: data.phone,
      city: data.city || 'Surat',
    },
    solarDetails: {
      monthlyBillINR: data.monthlyBill,
      systemSizeKW: parseFloat(data.systemSize) || 0,
      monthlySavingsINR: data.monthlySavings,
      twentyYearSavingsINR: data.twentyYearSavings,
      paybackPeriod: data.payback,
      roofType: data.roofType,
      sunExposure: data.exposure,
    },
    metadata: {
      locale: data.locale,
      submittedAt: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
    }
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn(`[Lead Webhook] Received status ${response.status} from ${webhookUrl}. Falling back to client-side record.`);
    } else {
      console.log('[Lead Webhook] Lead successfully delivered to software endpoint:', payload);
    }
  } catch (err) {
    console.warn('[Lead Webhook] Note: Lead webhook dispatch handled gracefully (endpoint offline or placeholder):', err);
  }

  // Backup in localStorage if available
  try {
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('kayvi_solar_leads') || '[]');
      existing.push(payload);
      localStorage.setItem('kayvi_solar_leads', JSON.stringify(existing));
    }
  } catch {
    // Ignore localStorage errors
  }

  return {
    success: true,
    whatsappUrl,
  };
}
