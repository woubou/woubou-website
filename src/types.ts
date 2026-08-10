export type ThemeMode = "light" | "dark";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  // bio: string;
  // skills: string[];
  email: string;
  portfolio: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "ERP" | "Custom Development" | "Support";
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  category: "custom" | "saas" | "automation";
  features: string[];
  techStack: string[];
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  reorderLevel: number;
  unitPrice: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

export interface CRMLead {
  id: string;
  companyName: string;
  contactPerson: string;
  value: number;
  stage: "Prospect" | "In Discussion" | "Proposal Sent" | "Closed Won";
  probability: number;
}

export interface FinancialMetric {
  month: string;
  revenue: number;
  expenses: number;
  netProfit: number;
}

export interface WorkflowJob {
  id: string;
  orderNumber: string;
  client: string;
  stage: "Design" | "Production" | "Quality Control" | "Dispatched";
  assignedTo: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
}

export interface QuoteFormData {
  name: string;
  email: string;
  companyName: string;
  phone: string;
  serviceType:
    | "ERP Platform"
    | "Custom Digital Solutions"
    | "Proprietary SaaS"
    | "General Inquiry";
  projectBudget: string;
  message: string;
}
