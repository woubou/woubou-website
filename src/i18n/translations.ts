export type Language = 'fr' | 'en';

export interface Translations {
  nav: {
    services: string;
    erp: string;
    calculator: string;
    team: string;
    faq: string;
    contact: string;
    sandbox: string;
    liveErpLink: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    servicesBtn: string;
    customApproach: string;
    humanSupport: string;
    scalableTech: string;
    expertiseLabel: string;
    expertiseCaption: string;
    testErpBtn: string;
    directErpBtn: string;
    contactBtn: string;
    sandboxDemo: string;
    realtimeSync: string;
    soc2Compliant: string;
    deploymentTime: string;
    liveInstance: string;
    revenue: string;
    kpis: string;
    health: string;
    syncedJustNow: string;
    exploreDashboard: string;
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterCustom: string;
    filterSaas: string;
    filterAutomation: string;
    viewDetails: string;
    techStack: string;
    keyFeatures: string;
    modalTitle: string;
    requestQuote: string;
    close: string;
  };
  erp: {
    badge: string;
    title: string;
    description: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    directLinkBtn: string;
    sandboxBtn: string;
    playgroundTitle: string;
    playgroundDesc: string;
    availableNow: string;
    online: string;
    teaserTitle: string;
    teaserDescription: string;
    discoverBtn: string;
    tabFinancials: string;
    tabInventory: string;
    tabCrm: string;
    tabWorkflow: string;
    // Financials
    ytdRevenue: string;
    ytdGrowth: string;
    expenses: string;
    expensesTarget: string;
    profitMargin: string;
    marginExpansion: string;
    // Inventory
    searchPlaceholder: string;
    newItemPlaceholder: string;
    addSkuBtn: string;
    thSku: string;
    thName: string;
    thCategory: string;
    thStock: string;
    thPrice: string;
    thStatus: string;
    thActions: string;
    restockBtn: string;
    inStock: string;
    lowStock: string;
    outOfStock: string;
    // CRM
    prospect: string;
    inDiscussion: string;
    proposalSent: string;
    closedWon: string;
    total: string;
    prob: string;
    // Workflow
    assignedTo: string;
    dueDate: string;
    priorityHigh: string;
    priorityMedium: string;
    priorityLow: string;
    stageLabel: string;
    advanceStageBtn: string;
  };
  calculator: {
    badge: string;
    title: string;
    subtitle: string;
    employeesLabel: string;
    adminHoursLabel: string;
    hourlyRateLabel: string;
    annualWaste: string;
    woubouSavings: string;
    hoursSavedMonth: string;
    roiPayback: string;
    roiChartTitle: string;
    roiChartSub: string;
    traditionalCost: string;
    woubouCost: string;
    netSavings: string;
    getQuoteBtn: string;
  };
  team: {
    badge: string;
    title: string;
    subtitle: string;
    viewProfile: string;
    skills: string;
    bio: string;
    getInTouch: string;
    close: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    allCategories: string;
    needMoreHelp: string;
    contactSupport: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    callUs: string;
    fullName: string;
    businessEmail: string;
    companyName: string;
    requestedSolution: string;
    projectScope: string;
    sendRequestBtn: string;
    successTitle: string;
    successDesc: string;
    submitAnother: string;
    optionErp: string;
    optionCustom: string;
    optionSaas: string;
    optionGeneral: string;
    copyright: string;
    privacyPolicy: string;
    termsOfService: string;
    cookiePolicy: string;
  };
  sandboxModal: {
    title: string;
    subtitle: string;
    dashboard: string;
    invoices: string;
    auditLogs: string;
    requestCustom: string;
    exitSandbox: string;
    directErpLink: string;
    totalBilled: string;
    pendingPayments: string;
    dbUptime: string;
    quickActions: string;
    createNewInvoice: string;
    runScan: string;
    clientName: string;
    amount: string;
    generateBtn: string;
    thInvId: string;
    thClient: string;
    thAmount: string;
    thDate: string;
    thStatus: string;
    thAction: string;
    markPaid: string;
  };
}

export const translations: Record<Language, Translations> = {
  fr: {
    nav: {
      services: 'Services',
      erp: 'Notre ERP',
      calculator: 'Calculateur ROI',
      team: 'Équipe',
      faq: 'FAQ',
      contact: 'Contact',
      sandbox: 'Bac à sable ERP',
      liveErpLink: 'Accéder à Woubou ERP'
    },
    hero: {
      badge: 'PARTENAIRE DE VOTRE TRANSFORMATION NUMÉRIQUE',
      titleStart: 'Nous transformons vos idées en',
      titleHighlight: 'solutions numériques utiles',
      subtitle: 'Woubou conçoit des produits numériques, des logiciels sur mesure et des automatisations intelligentes qui répondent aux réalités de votre entreprise.',
      servicesBtn: 'Découvrir nos services',
      customApproach: 'Solutions adaptées à vos besoins',
      humanSupport: 'Accompagnement humain',
      scalableTech: 'Technologies conçues pour évoluer',
      expertiseLabel: 'Ce que nous construisons',
      expertiseCaption: 'Une même équipe pour comprendre vos enjeux, concevoir la bonne solution et l’accompagner dans la durée.',
      testErpBtn: 'Tester Notre ERP',
      directErpBtn: 'Accéder à Woubou ERP',
      contactBtn: 'Nous Contacter',
      sandboxDemo: 'Démo Bac à Sable Interactive',
      realtimeSync: 'Synchro 100% Temps Réel',
      soc2Compliant: 'Conforme SOC2 & RGPD',
      deploymentTime: 'Déploiement en 2 Semaines',
      liveInstance: 'Instance en Direct Woubou ERP v0.2',
      revenue: 'Chiffre d\'Affaires',
      kpis: 'Indicateurs Clés',
      health: 'Santé Système',
      syncedJustNow: 'Données synchronisées il y a 2 secondes',
      exploreDashboard: 'Explorer le Tableau de Bord'
    },
    services: {
      badge: 'NOTRE EXPERTISE TECHNIQUE',
      title: 'Des Services Conçus Pour Votre Croissance',
      subtitle: 'De l\'automatisation IA au développement de logiciels propriétaires, nous proposons une suite complète de solutions technologiques.',
      filterAll: 'Tous les Services',
      filterCustom: 'Développement Sur Mesure',
      filterSaas: 'Solutions SaaS',
      filterAutomation: 'Automatisation IA',
      viewDetails: 'En savoir plus',
      techStack: 'Technologies Utilisées',
      keyFeatures: 'Fonctionnalités Clés',
      modalTitle: 'Détails de la Solution',
      requestQuote: 'Demander un Devis',
      close: 'Fermer'
    },
    erp: {
      badge: 'SISTÈME ERP NOUVELLE GÉNÉRATION',
      title: 'Découvrez la Puissance de Woubou ERP',
      description: 'Prenez le contrôle total de vos données d\'entreprise avec notre plateforme ERP intuitive et robuste. Gérez vos stocks, suivez vos ventes en direct, analysez les performances et automatisez vos flux de travail depuis un tableau de bord centralisé.',
      bullet1: 'Synchronisation des données en temps réel sur tous vos appareils',
      bullet2: 'Rapports personnalisables, prévisions financières et analyses poussées',
      bullet3: 'Intégrations fluides via API (Stripe, QuickBooks, Shopify, etc.)',
      directLinkBtn: 'Ouvrir portal.woubou.com',
      sandboxBtn: 'Lancer le Bac à Sable ERP',
      playgroundTitle: 'Bac à Sable Interactif ERP',
      playgroundDesc: 'Changez de module ci-dessous pour tester la logique de Woubou ERP directement sur cette page !',
      availableNow: 'UN PRODUIT WOUBOU DÉJÀ DISPONIBLE',
      online: 'Disponible',
      teaserTitle: 'Gérez votre quotidien avec Woubou ERP',
      teaserDescription: 'Parmi nos solutions, Woubou ERP aide les entreprises à centraliser leurs opérations, suivre leurs données et gagner du temps depuis un seul espace.',
      discoverBtn: 'Découvrir Woubou ERP',
      tabFinancials: 'Finances',
      tabInventory: 'Gestion des Stocks',
      tabCrm: 'Pipeline CRM',
      tabWorkflow: 'Ordres de Fabrication',
      ytdRevenue: 'CA Annuel Cumulé',
      ytdGrowth: '+18.5% de Croissance YoY',
      expenses: 'Dépenses Opérationnelles',
      expensesTarget: 'Conforme au budget à 4%',
      profitMargin: 'Marge Nette',
      marginExpansion: '+4.2% d\'expansion de marge',
      searchPlaceholder: 'Rechercher un SKU ou nom d\'article...',
      newItemPlaceholder: 'Nom du nouvel article...',
      addSkuBtn: '+ Ajouter SKU',
      thSku: 'SKU',
      thName: 'Nom de l\'article',
      thCategory: 'Catégorie',
      thStock: 'Stock',
      thPrice: 'Prix Unitaire',
      thStatus: 'Statut',
      thActions: 'Actions',
      restockBtn: '+ Réapprovisionner (+25)',
      inStock: 'En Stock',
      lowStock: 'Stock Faible',
      outOfStock: 'Rupture de Stock',
      prospect: 'Prospect',
      inDiscussion: 'En Négociation',
      proposalSent: 'Devis Envoyé',
      closedWon: 'Gagné / Signé',
      total: 'Total',
      prob: 'Prob.',
      assignedTo: 'Assigné à',
      dueDate: 'Échéance',
      priorityHigh: 'Élevée',
      priorityMedium: 'Moyenne',
      priorityLow: 'Basse',
      stageLabel: 'Étape',
      advanceStageBtn: 'Étape Suivante'
    },
    calculator: {
      badge: 'SIMULATEUR DE RENTABILITÉ PME',
      title: 'Calculez Votre Retour Sur Investissement',
      subtitle: 'Découvrez combien d\'heures administratives et de ressources financières Woubou ERP vous permet de sauvegarder chaque mois.',
      employeesLabel: 'Nombre d\'Employés Administratifs',
      adminHoursLabel: 'Heures de Saisie Manuelle / Semaine / Employé',
      hourlyRateLabel: 'Coût Horaire Moyen ($/h)',
      annualWaste: 'Coût Annuel des Inefficacités',
      woubouSavings: 'Économies Estimées avec Woubou',
      hoursSavedMonth: 'Heures Gagnées / Mois',
      roiPayback: 'Amortissement Estimé',
      roiChartTitle: 'Comparatif de Coût Cumulé sur 12 Mois ($)',
      roiChartSub: 'Comparaison Processus Traditionnels vs Écosystème Automatisé Woubou',
      traditionalCost: 'Coût Manuel Traditionnel',
      woubouCost: 'Coût Implémentation Woubou',
      netSavings: 'Économies Nettes Estimées',
      getQuoteBtn: 'Obtenir une Estimation Personnalisée'
    },
    team: {
      badge: 'DES EXPERTS À VOTRE SERVICE',
      title: 'Rencontrez l\'Équipe Woubou Digital',
      subtitle: 'Une équipe passionnée d\'architectes logiciels, de designers et de gestionnaires de produits dédiés à votre réussite.',
      viewProfile: 'Voir le Profil',
      skills: 'Compétences Clés',
      bio: 'Biographie',
      getInTouch: 'Contacter',
      close: 'Fermer'
    },
    faq: {
      badge: 'FOIRE AUX QUESTIONS',
      title: 'Questions Fréquentes',
      subtitle: 'Trouvez rapidement des réponses sur nos projets, la sécurité et notre ERP.',
      allCategories: 'Toutes les Catégories',
      needMoreHelp: 'Une autre question ?',
      contactSupport: 'Contacter notre équipe technique'
    },
    contact: {
      badge: 'CONSTRUISONS VOTRE PROJET ENSEMBLE',
      title: 'Prêt à Transformer Votre Entreprise ?',
      subtitle: 'Contactez-nous dès aujourd\'hui pour planifier une démonstration en direct ou discuter de vos besoins.',
      callUs: 'Appelez-nous au',
      fullName: 'Nom Complet *',
      businessEmail: 'E-mail Professionnel *',
      companyName: 'Nom de l\'Entreprise',
      requestedSolution: 'Solution Souhaitée',
      projectScope: 'Portée du Projet / Notes',
      sendRequestBtn: 'Envoyer la Demande de Devis',
      successTitle: 'Demande de Consultation Reçue !',
      successDesc: 'Merci. Un architecte de solutions Woubou vous contactera sous 2 heures ouvrables.',
      submitAnother: 'Envoyer une Autre Demande',
      optionErp: 'Plateforme Woubou ERP',
      optionCustom: 'Solutions Numériques Sur Mesure',
      optionSaas: 'Module SaaS Propriétaire',
      optionGeneral: 'Consultation Générale',
      copyright: '© 2026 Woubou Digital Agency. Tous droits réservés.',
      privacyPolicy: 'Politique de Confidentialité',
      termsOfService: 'Conditions d\'Utilisation',
      cookiePolicy: 'Politique des Cookies'
    },
    sandboxModal: {
      title: 'Centre de Contrôle Interactif ERP',
      subtitle: 'Environnement de simulation — Testez les flux réels de Woubou ERP',
      dashboard: 'Tableau de Bord',
      invoices: 'Facturation & Devis',
      auditLogs: 'Journaux d\'Audit',
      requestCustom: 'Demander un Déploiement',
      exitSandbox: 'Quitter la Démo',
      directErpLink: 'Accéder à portal.woubou.com',
      totalBilled: 'Total Facturé YTD',
      pendingPayments: 'Paiements en Attente',
      dbUptime: 'Disponibilité Base de Données',
      quickActions: 'Actions Rapides',
      createNewInvoice: '+ Créer une Nouvelle Facture',
      runScan: 'Lancer une Réconciliation de Stock',
      clientName: 'Nom du Client',
      amount: 'Montant ($)',
      generateBtn: 'Générer la Facture',
      thInvId: 'ID Facture',
      thClient: 'Client',
      thAmount: 'Montant',
      thDate: 'Date',
      thStatus: 'Statut',
      thAction: 'Action',
      markPaid: 'Marquer Payée'
    }
  },
  en: {
    nav: {
      services: 'Services',
      erp: 'Our ERP',
      calculator: 'ROI Calculator',
      team: 'Team',
      faq: 'FAQ',
      contact: 'Contact Us',
      sandbox: 'ERP Sandbox',
      liveErpLink: 'Access Woubou ERP'
    },
    hero: {
      badge: 'YOUR DIGITAL TRANSFORMATION PARTNER',
      titleStart: 'We turn your ideas into',
      titleHighlight: 'useful digital solutions',
      subtitle: 'Woubou designs digital products, custom software, and intelligent automations built around the realities of your business.',
      servicesBtn: 'Explore our services',
      customApproach: 'Solutions tailored to your needs',
      humanSupport: 'Human, hands-on support',
      scalableTech: 'Technology designed to scale',
      expertiseLabel: 'What we build',
      expertiseCaption: 'One team to understand your challenges, design the right solution, and support it over time.',
      testErpBtn: 'Test Our ERP',
      directErpBtn: 'Access Woubou ERP',
      contactBtn: 'Contact Us',
      sandboxDemo: 'Interactive Sandbox Demo',
      realtimeSync: '100% Real-Time Sync',
      soc2Compliant: 'SOC2 & GDPR Compliant',
      deploymentTime: '2-Week Deployment',
      liveInstance: 'Woubou ERP v0.2 Live Instance',
      revenue: 'Total Revenue',
      kpis: 'Active Users',
      health: 'System Health',
      syncedJustNow: 'Data synchronized 2 seconds ago',
      exploreDashboard: 'Explore Dashboard'
    },
    services: {
      badge: 'OUR TECHNICAL EXPERTISE',
      title: 'Tailored Services Designed For SME Growth',
      subtitle: 'From AI workflow automation to custom enterprise apps, we deliver high-value digital solutions.',
      filterAll: 'All Services',
      filterCustom: 'Custom Development',
      filterSaas: 'SaaS Solutions',
      filterAutomation: 'AI Automation',
      viewDetails: 'View Details',
      techStack: 'Tech Stack',
      keyFeatures: 'Key Features',
      modalTitle: 'Solution Overview',
      requestQuote: 'Request Quote',
      close: 'Close'
    },
    erp: {
      badge: 'NEXT-GENERATION ERP SYSTEM',
      title: 'Experience Our Powerful ERP',
      description: 'Take complete control of your business data with our intuitive and robust ERP platform. Manage inventory, track live sales pipelines, analyze multi-departmental performance, and automate manufacturing workflows from a single, centralized dashboard.',
      bullet1: 'Real-time data synchronization across all devices',
      bullet2: 'Customizable reporting, financial forecasting & analytics',
      bullet3: 'Seamless third-party API integrations (Stripe, QuickBooks, Shopify)',
      directLinkBtn: 'Open portal.woubou.com',
      sandboxBtn: 'Launch Full ERP Sandbox',
      playgroundTitle: 'Live Interactive ERP Playground',
      playgroundDesc: 'Switch modules below to test real Woubou ERP logic right inside this page!',
      availableNow: 'A WOUBOU PRODUCT AVAILABLE TODAY',
      online: 'Available',
      teaserTitle: 'Run your day-to-day with Woubou ERP',
      teaserDescription: 'Among our solutions, Woubou ERP helps businesses centralize operations, track their data, and save time from one workspace.',
      discoverBtn: 'Discover Woubou ERP',
      tabFinancials: 'Financials',
      tabInventory: 'Inventory',
      tabCrm: 'CRM Pipeline',
      tabWorkflow: 'Manufacturing Jobs',
      ytdRevenue: 'YTD Revenue',
      ytdGrowth: '+18.5% YoY Growth',
      expenses: 'Total Operating Expenses',
      expensesTarget: 'Within 4% of target budget',
      profitMargin: 'Net Profit Margin',
      marginExpansion: '+4.2% margin expansion',
      searchPlaceholder: 'Search SKU or item name...',
      newItemPlaceholder: 'New item name...',
      addSkuBtn: '+ Add SKU',
      thSku: 'SKU',
      thName: 'Item Name',
      thCategory: 'Category',
      thStock: 'Stock Qty',
      thPrice: 'Unit Price',
      thStatus: 'Status',
      thActions: 'Actions',
      restockBtn: '+ Restock (+25)',
      inStock: 'In Stock',
      lowStock: 'Low Stock',
      outOfStock: 'Out of Stock',
      prospect: 'Prospect',
      inDiscussion: 'In Discussion',
      proposalSent: 'Proposal Sent',
      closedWon: 'Closed Won',
      total: 'Total',
      prob: 'Prob.',
      assignedTo: 'Assigned to',
      dueDate: 'Due Date',
      priorityHigh: 'High',
      priorityMedium: 'Medium',
      priorityLow: 'Low',
      stageLabel: 'Stage',
      advanceStageBtn: 'Advance Stage'
    },
    calculator: {
      badge: 'SME PROFITABILITY SIMULATOR',
      title: 'Calculate Your Return On Investment',
      subtitle: 'See how many administrative hours and financial resources Woubou ERP can save your organization each month.',
      employeesLabel: 'Number of Administrative Staff',
      adminHoursLabel: 'Manual Entry Hours / Week / Employee',
      hourlyRateLabel: 'Average Hourly Rate ($/h)',
      annualWaste: 'Annual Inefficiency Cost',
      woubouSavings: 'Estimated Woubou Savings',
      hoursSavedMonth: 'Hours Saved / Month',
      roiPayback: 'Estimated Payback Period',
      roiChartTitle: '12-Month Cumulative Cost Comparison ($)',
      roiChartSub: 'Comparing Traditional Manual Process vs. Woubou Automated Ecosystem',
      traditionalCost: 'Traditional Manual Cost',
      woubouCost: 'Woubou Implementation Cost',
      netSavings: 'Estimated Net Savings',
      getQuoteBtn: 'Get Custom ROI Quote'
    },
    team: {
      badge: 'EXPERTS AT YOUR SERVICE',
      title: 'Meet the Woubou Digital Team',
      subtitle: 'A passionate team of software architects, designers, and product leaders dedicated to your success.',
      viewProfile: 'View Profile',
      skills: 'Core Skills',
      bio: 'Biography',
      getInTouch: 'Get in Touch',
      close: 'Close'
    },
    faq: {
      badge: 'FREQUENTLY ASKED QUESTIONS',
      title: 'Frequently Asked Questions',
      subtitle: 'Find quick answers regarding our custom projects, data security, and ERP platform.',
      allCategories: 'All Categories',
      needMoreHelp: 'Have more questions?',
      contactSupport: 'Contact Our Engineering Team'
    },
    contact: {
      badge: 'LET\'S BUILD SOMETHING GREAT TOGETHER',
      title: 'Ready to Transform Your Business?',
      subtitle: 'Get in touch with us today to schedule a live demo or discuss how our custom SaaS solutions can drive your growth.',
      callUs: 'Call us at',
      fullName: 'Full Name *',
      businessEmail: 'Business Email *',
      companyName: 'Company Name',
      requestedSolution: 'Requested Solution',
      projectScope: 'Project Scope / Notes',
      sendRequestBtn: 'Send Proposal Request',
      successTitle: 'Consultation Request Received!',
      successDesc: 'Thank you. A solution architect from Woubou will contact you within 2 business hours.',
      submitAnother: 'Submit Another Request',
      optionErp: 'Woubou ERP Platform',
      optionCustom: 'Custom Digital Solutions',
      optionSaas: 'Proprietary SaaS Module',
      optionGeneral: 'General Consultation',
      copyright: '© 2026 Woubou Digital Agency. All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      cookiePolicy: 'Cookie Policy'
    },
    sandboxModal: {
      title: 'ERP Interactive Control Center',
      subtitle: 'Simulated production environment — Test real Woubou ERP workflows',
      dashboard: 'Dashboard',
      invoices: 'Invoices & Billing',
      auditLogs: 'Audit Logs',
      requestCustom: 'Request Custom Deployment',
      exitSandbox: 'Exit Sandbox',
      directErpLink: 'Access portal.woubou.com',
      totalBilled: 'Total Billed YTD',
      pendingPayments: 'Open Pending Payments',
      dbUptime: 'Database Uptime',
      quickActions: 'Quick Actions',
      createNewInvoice: '+ Create New Invoice',
      runScan: 'Run Stock Reconciliation',
      clientName: 'Client Name',
      amount: 'Amount ($)',
      generateBtn: 'Generate Invoice',
      thInvId: 'Invoice ID',
      thClient: 'Client',
      thAmount: 'Amount',
      thDate: 'Date',
      thStatus: 'Status',
      thAction: 'Action',
      markPaid: 'Mark Paid'
    }
  }
};
