const fs = require('fs');
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

en.Navigation = {
  ...en.Navigation,
  "residential": "Residential Solar",
  "commercial": "Commercial Solar",
  "waterHeater": "Solar Water Heater"
};

en.Layout = {
  "header": {
    "language": "EN"
  },
  "footer": {
    "tagline": "Powering a Brighter Future with Solar.",
    "quickLinks": "Quick Links",
    "services": "Our Services",
    "legal": "Legal",
    "privacy": "Privacy Policy",
    "terms": "Terms of Service",
    "newsletter": "Subscribe to our Newsletter",
    "emailPlaceholder": "Enter your email",
    "subscribe": "Subscribe",
    "builtBy": "Built by Kayvi Solar."
  }
};

en.AboutPage = {
  "hero": {
    "title": "About Kayvi Solar",
    "subtitle": "Leading the transition to sustainable energy since 2014."
  },
  "story": {
    "title": "Our Story",
    "content": "Kayvi Solar was founded with a simple mission: to make clean, renewable energy accessible and affordable for everyone. Over the past decade, we have grown from a small local installer into one of the most trusted solar providers in the region, helping thousands of homeowners and businesses reduce their carbon footprint and take control of their energy costs."
  },
  "mission": {
    "title": "Our Mission",
    "content": "To accelerate the world's transition to sustainable energy by providing premium, reliable, and cost-effective solar solutions."
  },
  "team": {
    "title": "Meet Our Team",
    "members": {
      "m1": { "name": "Rajesh Patel", "role": "CEO & Founder" },
      "m2": { "name": "Priya Sharma", "role": "Head of Engineering" },
      "m3": { "name": "Anil Kumar", "role": "Operations Manager" }
    }
  }
};

en.ServicesPage = {
  "hero": {
    "title": "Our Services",
    "subtitle": "Comprehensive solar solutions tailored to your energy needs."
  },
  "cta": "Learn More"
};

en.ContactPage = {
  "hero": {
    "title": "Contact Us",
    "subtitle": "Get in touch for a free consultation or any inquiries."
  },
  "form": {
    "title": "Send us a message",
    "name": "Full Name",
    "namePlaceholder": "John Doe",
    "email": "Email Address",
    "emailPlaceholder": "john@example.com",
    "phone": "Phone Number",
    "phonePlaceholder": "+1 (555) 000-0000",
    "projectType": "Project Type",
    "projectPlaceholder": "Select a project type",
    "message": "Message",
    "messagePlaceholder": "Tell us about your energy needs...",
    "submit": "Send Message",
    "success": "Message sent successfully!"
  },
  "info": {
    "title": "Contact Information",
    "address": "123 Solar Way, Tech Park, City, Country",
    "phone": "+1 (555) 123-4567",
    "email": "info@kayvisolar.com"
  }
};

fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));

function clearValues(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      clearValues(obj[key]);
    } else {
      obj[key] = "";
    }
  }
}

const hi = JSON.parse(JSON.stringify(en));
clearValues(hi);
fs.writeFileSync('messages/hi.json', JSON.stringify(hi, null, 2));

const gu = JSON.parse(JSON.stringify(en));
clearValues(gu);
fs.writeFileSync('messages/gu.json', JSON.stringify(gu, null, 2));

console.log("Locales updated!");
