import {
  TeamMember,
  FAQItem,
  ServiceItem,
  InventoryItem,
  CRMLead,
  FinancialMetric,
  WorkflowJob,
} from "../types";

// export const LOGO_URL = "https://lh3.googleusercontent.com/aida/AP1WRLuYKw89ZoZ-iwaLttsgcHEoJomW3e3BdIgp3wjS7ecuHI_mk5AY40FmjtPJpRUp8lss29f05DHN4TPY1WFOqhSK_637go7sxZTGjQygURRCknz3DdAcmFlPcpdBsnxgzdppQax-jefA9S9qTDpA_g4kUFlo_Ytf48cy6FvJuGbgmeeGjvSUCzCR6Ksyrc7izn5d9cZPlUqjJl90ig_1H6KrN5jzhFpa3MaKDdBx8d-fBIhIQBz86eMj5ZU";
export const LOGO_URL = "/assets/logo-dark.png";
export const HERO_IMAGE_3D =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAbJuygoKj4r_xSqKtDCEP1SULCCxSnfJKDzxoAzvA_0DmtoJAGKmTa9VyBZ7H32WGwH-GBcUESSq8xaSbn0C6AXtZff8yrWjlAq2OdzRACaE5vr_QUMbZLrGTYY4QFbn1PSublr2B5lqy96jm7B4rce-B5pUdKswywDwuO64YwFqiOSW9fVMldB8kXArNWVcyfNOHXVkHy0azsApvFIqh4oTWiWTrEyjjZJAFyVM4xr3ilZDuNo8y3";

export const ERP_MOCKUP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCVQgTaBoSiGDq_XxQjrmDjHGNwNAHaDv0b0fV-bxSfGDxztnIlavRFZtyMMThHGjbVONUS6gGCOsnrmxRqfVSxSffBH173y7Z55lK1_MYJYZlAi6MelQ0zkadrPuEDZDX36BpVHnSdLRncuakTVxlaptGIFnNyqTNpWLa6ho35FJ2Re7r65b7XG0jVsULzTOuG8mLdFaJ_-3fnUvRyLeL-sKbCWuBr0Ulpr9upqheAgyZLcONSp9Fh";

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "teddy-cubaka",
    name: "Teddy Cubaka",
    role: "CEO & Founder",
    image: "https://res.cloudinary.com/di64z9yxk/image/upload/v1786376898/zubu/1786376599148_grcd4r.png",
    email: "teddy@woubou.com",
    portfolio: "https://tcubaka.me",
  },
  // {
  //   id: "beniciel-kabuiku",
  //   name: "Beniciel Kabuiku",
  //   role: "Internal Relations Officer",
  //   image:
  //     "https://lh3.googleusercontent.com/aida-public/AB6AXuAjeJulgNMgMBi4TRyT48dVknpkxPe82sDJF-4oOZMlEeBge7ny94x4U3qiYeYkhivHgKyUXG1tanl62xrC-nwDIb1Om-kG_QEUuiF1igJPujj5YD0AklM4ZXxmyxvHsePul9_hPzSz7Wzl7KCcdaZrglUw4Qtubum09S5OS1PMuMOStf8oYygZw6rZ6_QHM-GbnOBbsM8N6lkPt1khIltwUl2YcsCQTB7mAPN9WsdQPRwCZzODQoMR",
  //   email: "john.smith@woubou.com",
  //   portfolio: "",
  // },
  {
    id: "fabrice-malanga",
    name: "Fabrice Malanga",
    role: "Web & mobile developper",
    image:
      "https://res.cloudinary.com/di64z9yxk/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1786377222/zubu/malanga-fabrice_mj5fq2.jpg",
    portfolio: "",
    email: "emily.chen@woubou.com",
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "custom-digital-solutions",
    title: "Custom Digital Solutions",
    shortDesc:
      "We build bespoke web applications, custom websites, and tailored software solutions that perfectly align with your unique business requirements and goals.",
    fullDesc:
      "Empower your growing enterprise with custom software crafted specifically for your operational realities. We bypass standard off-the-shelf constraints to develop web applications, APIs, and client portals engineered for scale.",
    iconName: "code",
    category: "custom",
    features: [
      "Tailored Web & Mobile Applications",
      "API & Multi-System Integrations",
      "High-Performance Database Design",
      "End-to-End Enterprise Security & Encryption",
      "Legacy System Modernization",
    ],
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "REST / GraphQL",
    ],
  },
  {
    id: "proprietary-saas-solutions",
    title: "Proprietary SaaS Solutions",
    shortDesc:
      "Access our suite of powerful SaaS platforms designed to optimize specific business processes, from resource planning to customer relationship management.",
    fullDesc:
      "Turn key operational hurdles into competitive advantages using Woubou’s ready-to-deploy modular SaaS ecosystem. Enjoy high stability, automatic updates, and multi-tenant isolation out of the box.",
    iconName: "dashboard",
    category: "saas",
    features: [
      "Centralized Resource Planning (ERP)",
      "Customer Relationship Management (CRM)",
      "Real-Time Analytics & Financial Reporting",
      "Automated Order & Inventory Tracking",
      "Role-Based Access Control & Auditing",
    ],
    techStack: [
      "Next-Gen Cloud Run",
      "Firestore / Cloud SQL",
      "WebSockets",
      "Recharts",
      "OAuth 2.0",
    ],
  },
  {
    id: "bespoke-ai-automation",
    title: "Enterprise AI & Workflow Automation",
    shortDesc:
      "Harness cutting-edge AI models and automated workflow pipelines to eliminate repetitive manual tasks, forecast demand, and extract insights.",
    fullDesc:
      "Transform unstructured business data into actionable automated decisions. From smart invoice parsing to automated inventory reordering, our intelligent bots work behind the scenes to save hundreds of administrative hours each month.",
    iconName: "psychology",
    category: "automation",
    features: [
      "Automated Document & Invoice Processing",
      "Predictive Inventory Forecasting",
      "Customer Support AI Co-Pilots",
      "Custom Gemini API Logic Integration",
      "Automated Multi-Channel Notifications",
    ],
    techStack: [
      "Gemini 2.5/3.0",
      "Python / TS Middleware",
      "Vector DB",
      "Automated Webhooks",
    ],
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "How long does a custom project usually take?",
    answer:
      "Project timelines vary depending on complexity and scope. A standard bespoke web application might take 6–10 weeks, while full enterprise ERP platform deployments typically roll out in phased 2–4 week modules. We provide transparent milestones and live preview access throughout development.",
    category: "Custom Development",
  },
  {
    id: "faq-2",
    question: "Do you offer ongoing support and maintenance after launch?",
    answer:
      "Yes, absolutely. We offer 24/7 proactive technical support, SLA-backed uptime monitoring, regular security patches, and iterative feature expansion plans to ensure your system evolves alongside your business.",
    category: "Support",
  },
  {
    id: "faq-3",
    question: "Can your ERP integrate with our existing tools and software?",
    answer:
      "Yes! Our ERP features a robust REST and GraphQL API layer. It seamlessly connects with accounting platforms (QuickBooks, Xero), payment gateways (Stripe, PayPal), CRM systems (HubSpot, Salesforce), and e-commerce stores (Shopify, WooCommerce).",
    category: "ERP",
  },
  {
    id: "faq-4",
    question: "How do you ensure data security and regulatory compliance?",
    answer:
      "Security is embedded into every tier of our architecture. We enforce TLS 1.3 encryption in transit, AES-256 encryption at rest, strict SOC2-compliant role-based access control (RBAC), and full compliance with GDPR guidelines.",
    category: "General",
  },
  {
    id: "faq-5",
    question:
      "Is Woubou suitable for small businesses or just medium enterprises?",
    answer:
      "Woubou is explicitly designed for growing SMEs (10 to 250+ employees). Our modular subscription plans allow smaller businesses to start with essential modules (like Inventory + CRM) and expand into full ERP capabilities as revenue grows.",
    category: "General",
  },
];

export const INITIAL_FINANCIALS: FinancialMetric[] = [
  { month: "Jan", revenue: 145000, expenses: 89000, netProfit: 56000 },
  { month: "Feb", revenue: 162000, expenses: 92000, netProfit: 70000 },
  { month: "Mar", revenue: 188000, expenses: 98000, netProfit: 90000 },
  { month: "Apr", revenue: 210000, expenses: 105000, netProfit: 105000 },
  { month: "May", revenue: 235000, expenses: 112000, netProfit: 123000 },
  { month: "Jun", revenue: 278000, expenses: 120000, netProfit: 158000 },
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: "inv-1",
    sku: "SKU-802",
    name: "Server Chassis 2U Pro",
    category: "Hardware",
    stock: 145,
    reorderLevel: 20,
    unitPrice: 1250,
    status: "In Stock",
  },
  {
    id: "inv-2",
    sku: "SKU-805",
    name: "High-Density Switch 48P",
    category: "Networking",
    stock: 8,
    reorderLevel: 15,
    unitPrice: 890,
    status: "Low Stock",
  },
  {
    id: "inv-3",
    sku: "SKU-912",
    name: "Fiber Patch Panel LC-LC",
    category: "Cabling",
    stock: 320,
    reorderLevel: 50,
    unitPrice: 110,
    status: "In Stock",
  },
  {
    id: "inv-4",
    sku: "SKU-404",
    name: "Enterprise Router Gateway",
    category: "Networking",
    stock: 0,
    reorderLevel: 10,
    unitPrice: 2400,
    status: "Out of Stock",
  },
  {
    id: "inv-5",
    sku: "SKU-119",
    name: "Power Distribution Unit 30A",
    category: "Hardware",
    stock: 82,
    reorderLevel: 15,
    unitPrice: 450,
    status: "In Stock",
  },
];

export const INITIAL_CRM_LEADS: CRMLead[] = [
  {
    id: "lead-1",
    companyName: "Acme Logistics Ltd",
    contactPerson: "Sarah Jenkins",
    value: 45000,
    stage: "Proposal Sent",
    probability: 80,
  },
  {
    id: "lead-2",
    companyName: "TechPro Global Solutions",
    contactPerson: "David Miller",
    value: 120000,
    stage: "In Discussion",
    probability: 50,
  },
  {
    id: "lead-3",
    companyName: "Apex Retail Group",
    contactPerson: "Chloe Vance",
    value: 85000,
    stage: "Closed Won",
    probability: 100,
  },
  {
    id: "lead-4",
    companyName: "Nexus BioHealth",
    contactPerson: "Dr. Alan Grant",
    value: 65000,
    stage: "Prospect",
    probability: 25,
  },
  {
    id: "lead-5",
    companyName: "Vanguard Industrial",
    contactPerson: "Marcus Thorne",
    value: 150000,
    stage: "In Discussion",
    probability: 60,
  },
];

export const INITIAL_WORKFLOW_JOBS: WorkflowJob[] = [
  {
    id: "job-101",
    orderNumber: "ORD-8942",
    client: "Acme Corp",
    stage: "Production",
    assignedTo: "John Smith",
    dueDate: "2026-08-15",
    priority: "High",
  },
  {
    id: "job-102",
    orderNumber: "ORD-8945",
    client: "TechPro",
    stage: "Design",
    assignedTo: "Michael Brown",
    dueDate: "2026-08-18",
    priority: "Medium",
  },
  {
    id: "job-103",
    orderNumber: "ORD-8930",
    client: "Global Dynamics",
    stage: "Quality Control",
    assignedTo: "Emily Chen",
    dueDate: "2026-08-10",
    priority: "High",
  },
  {
    id: "job-104",
    orderNumber: "ORD-8911",
    client: "Apex Retail",
    stage: "Dispatched",
    assignedTo: "Logistics Desk",
    dueDate: "2026-08-05",
    priority: "Low",
  },
];
