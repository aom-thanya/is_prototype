const BASE_MOCK_CLIENT = {
  id: '1',
  clientId: 'CLI-001',
  companyNameTh: 'บริษัท โคคา-โคลา (ประเทศไทย) จำกัด',
  companyNameEn: 'Coca-Cola Thailand',
  industry: 'FMCG / Beverage',
  clientType: 'Existing Client',
  status: 'Active',
  address: 'กรุงเทพมหานคร',
  taxId: '0105550000000',
  accountOwner: 'Sales Team A',
  createdDate: '10 Jan 2025',
  updatedDate: '3 Jul 2026',
  
  kpis: {
    totalCampaigns: 18,
    totalRevenue: '8,200,000 THB',
    averageBudget: '455,000 THB',
    averageGp: '38%',
    lastCampaign: '15 Jun 2026',
    avgApprovalTime: '2 Days'
  },
  
  aiSummary: "ลูกค้ารายนี้เป็นลูกค้ากลุ่ม FMCG ที่เน้นภาพลักษณ์แบรนด์และความน่าเชื่อถือของ Creator เป็นหลัก แคมเปญที่ประสบความสำเร็จมักใช้ Creator สาย Lifestyle / Working Women และมี Proposal ที่แสดง KPI, Benchmark และ Case Study ชัดเจน ลูกค้าไม่ชอบงานที่ดูขายตรงเกินไปหรือใช้ Mood & Tone แบบตลก / Meme",
  
  contacts: [
    { id: 'c1', name: 'คุณแพร', position: 'Marketing Manager', role: 'Main Coordinator', phone: '081-234-5678', email: 'praew@example.com', lineId: 'praew.marketing', type: 'Marketing', isDecisionMaker: true, preferredChannel: 'LINE', note: 'ตอบเร็วช่วงเช้า และชอบให้สรุปเป็น bullet' },
    { id: 'c2', name: 'คุณนนท์', position: 'Procurement', role: 'Budget Approval', phone: '089-876-5432', email: 'non@example.com', lineId: '-', type: 'Procurement', isDecisionMaker: false, preferredChannel: 'Email', note: 'ดูแลเรื่อง PO และเอกสารการเงิน' }
  ],
  
  brands: [
    { id: 'b1', name: 'Coke', category: 'Beverage', product: 'Carbonated Drink', targetAudience: 'Gen Z / Mass', personality: 'Fun, Refreshing, Energetic', status: 'Active' },
    { id: 'b2', name: 'Minute Maid', category: 'Juice', product: 'Fruit Juice', targetAudience: 'Working Adults', personality: 'Healthy, Fresh, Family-friendly', status: 'Active' }
  ],
  
  campaignHistory: [
    { id: 'cam1', name: 'Coke Summer Refresh 2026', brand: 'Coke', period: '1 Jun 2026 - 30 Jun 2026', objective: 'Awareness', type: 'Ratecard', budget: '500,000 THB', platform: 'TikTok, Instagram', creatorType: 'Lifestyle, Food, Gen Z', status: 'Completed', result: 'Reach exceeded KPI by 18%', gp: '40%' },
    { id: 'cam2', name: 'Coke Zero Launch', brand: 'Coke Zero', period: '10 Mar 2026 - 25 Mar 2026', objective: 'Engagement', type: 'Standard', budget: '350,000 THB', platform: 'TikTok', creatorType: 'Fitness, Lifestyle', status: 'Completed', result: 'High engagement from working women audience', gp: '36%' }
  ],
  
  knowledge: {
    preferences: {
      contentStyle: ['Premium', 'Clean', 'Storytelling', 'Informative', 'Lifestyle Review'],
      creator: ['Female Creator', 'Lifestyle Creator', 'Working Women', 'Mid-tier Creator', 'High Credibility Creator'],
      visual: ['Bright Mood', 'Minimal', 'Luxury', 'Natural Light', 'Product Clearly Visible'],
      proposal: ['KPI Driven', 'Benchmark Required', 'Case Study Required', 'Concise Proposal', 'Not Over 15 Slides'],
      communication: ['Prefer LINE', 'Morning Follow-up', 'Bullet Summary', 'Meeting Before Proposal'],
      avoid: ['Avoid Meme', 'Avoid Dark Background', 'Avoid Hard Sell Wording', 'Avoid Funny Tone', 'Avoid Too Many Slides']
    },
    doList: [
      'ใช้ Creator ผู้หญิงสาย Lifestyle',
      'ใช้ภาพสว่าง สะอาด ดู Premium',
      'ใส่ KPI, Benchmark และ Case Study ใน Proposal',
      'สรุปงานเป็น Bullet ก่อนส่งให้ลูกค้า'
    ],
    dontList: [
      'หลีกเลี่ยง Meme หรือมุกตลก',
      'หลีกเลี่ยงภาพพื้นหลังมืด',
      'หลีกเลี่ยงคำขายตรง เช่น ถูกที่สุด, คุ้มที่สุด',
      'หลีกเลี่ยง Proposal ยาวเกิน 15 หน้า'
    ],
    decisionPattern: {
      approvalSpeed: 4,
      dataDriven: 5,
      budgetSensitivity: 4,
      creativeFreedom: 2,
      revisionFrequency: 3,
      riskAppetite: 2,
      aiInsight: 'ลูกค้ารายนี้ตัดสินใจจากข้อมูลค่อนข้างสูง ควรนำเสนอ Benchmark, KPI และ Case Study ทุกครั้ง มีความยืดหยุ่นด้าน Creative ค่อนข้างต่ำ จึงควรหลีกเลี่ยงงานที่ตีความกว้างเกินไป'
    },
    timeline: [
      { id: 't1', date: '15 Jun 2026', source: 'Campaign Feedback', campaign: 'Coke Summer Refresh 2026', note: 'ลูกค้าชอบ Creator ที่เล่าแบบธรรมชาติ ไม่ขายตรงเกินไป', createdBy: 'Planner', tag: 'Content Style' },
      { id: 't2', date: '20 Jun 2026', source: 'Revision Comment', campaign: 'Coke Summer Refresh 2026', note: 'ลูกค้า reject visual ที่ background มืด และขอเปลี่ยนเป็น mood สว่างขึ้น', createdBy: 'Ops', tag: 'Visual Preference' },
      { id: 't3', date: '25 Jun 2026', source: 'Meeting Note', campaign: 'Coke Zero Launch', note: 'ลูกค้าต้องการเห็น Benchmark เทียบกับแคมเปญเดิมทุกครั้ง', createdBy: 'Sales', tag: 'Proposal Preference' }
    ]
  },
  
  documents: [
    { id: 'd1', name: 'Coke Summer 2026 Proposal.pdf', type: 'Proposal', campaign: 'Coke Summer Refresh 2026', uploadedBy: 'Planner', uploadedDate: '1 Jun 2026' },
    { id: 'd2', name: 'Coke Rate Card.xlsx', type: 'Deal Sheet', campaign: 'Coke Zero Launch', uploadedBy: 'Sales', uploadedDate: '10 Mar 2026' },
    {
      id: 'doc3',
      name: 'Brand Guidelines 2026.pdf',
      type: 'PDF',
      size: '5.2 MB',
      uploadDate: '2026-06-25',
      uploadedBy: 'Jane Smith'
    }
  ],
  
  competitors: [
    {
      id: '1',
      clientId: "COMP-001",
      competitorName: "Pepsi",
      brandCompany: "บริษัท เป๊ปซี่-โคล่า (ไทย) เทรดดิ้ง จำกัด",
      websiteUrl: "https://www.suntorypepsico.co.th/",
      socialMediaUrl: "https://www.facebook.com/PepsiThai",
      campaignReferenceUrl: "",
      keyMessagePositioning: "For the Love of It - Youthful, energetic, and culturally relevant positioning.",
      strengths: "Strong association with music and food pairing (e.g. กินกับเป๊ปซี่). High engagement with Gen Z.",
      weaknesses: "Slightly less global market share compared to Coke, heavily reliant on local KOLs.",
      notes: "Main direct competitor. Always check their seasonal music campaigns."
    },
    {
      id: '2',
      clientId: "COMP-002",
      competitorName: "Est Cola",
      brandCompany: "บริษัท เสริมสุข จำกัด (มหาชน)",
      websiteUrl: "https://www.sermsukplc.com/",
      socialMediaUrl: "https://www.facebook.com/estcola",
      campaignReferenceUrl: "",
      keyMessagePositioning: "Awesome (ซ่า...ซี้ดสุดขั้ว) - Local pride with a highly affordable value proposition.",
      strengths: "Deep penetration in local restaurants, aggressive pricing, and massive local idol endorsements (e.g., K-pop / T-pop presenters).",
      weaknesses: "Brand perception is sometimes seen as a lower-tier alternative compared to global giants.",
      notes: "Very aggressive in school-tier marketing and upcountry distribution."
    },
    {
      id: '3',
      clientId: "COMP-003",
      competitorName: "Singha Lemon Soda",
      brandCompany: "บริษัท บุญรอดบริวเวอรี่ จำกัด",
      websiteUrl: "https://www.singhacorporation.com/",
      socialMediaUrl: "https://www.facebook.com/SinghaLemonSoda",
      campaignReferenceUrl: "",
      keyMessagePositioning: "Refreshing guilt-free soda (0% Sugar, 0 Kcal).",
      strengths: "Captures the health-conscious market effectively while retaining the 'fizzy' appeal. Very strong cafe and mixology association.",
      weaknesses: "Niche flavor profile, not a traditional dark cola.",
      notes: "Growing threat in the 'Zero Sugar' segment."
    }
  ]
};

export const GET_MOCK_CLIENT = (id) => {
  const client = JSON.parse(JSON.stringify(BASE_MOCK_CLIENT));
  client.id = id;
  
  if (id === '2') {
    client.clientId = 'CLI-002';
    client.companyNameTh = 'บริษัท ซัมซุง อิเลคโทรนิคส์ จำกัด';
    client.companyNameEn = 'Samsung Electronics Thailand';
    client.competitors = [
      {
        id: 'c1',
        clientId: "COMP-S01",
        competitorName: "Apple",
        brandCompany: "Apple Inc.",
        websiteUrl: "https://www.apple.com/th/",
        socialMediaUrl: "https://www.facebook.com/apple",
        campaignReferenceUrl: "",
        keyMessagePositioning: "Premium, seamless ecosystem, privacy-focused.",
        strengths: "Incredibly strong brand loyalty, high premium market share.",
        weaknesses: "High price point, less customizable.",
        notes: "Direct competitor in the premium smartphone and tablet segment."
      },
      {
        id: 'c2',
        clientId: "COMP-S02",
        competitorName: "Xiaomi",
        brandCompany: "Xiaomi Corporation",
        websiteUrl: "https://www.mi.com/th",
        socialMediaUrl: "https://www.facebook.com/XiaomiThailand",
        campaignReferenceUrl: "",
        keyMessagePositioning: "Innovation for everyone, high spec-to-price ratio.",
        strengths: "Very aggressive pricing, huge variety of smart home products.",
        weaknesses: "Brand perception still leaning towards budget/mid-range.",
        notes: "Major competitor in the mid-to-low tier smartphone market."
      }
    ];
  } else if (id === '3') {
    client.clientId = 'CLI-003';
    client.companyNameTh = 'บริษัท ลอรีอัล (ประเทศไทย) จำกัด';
    client.companyNameEn = "L'Oréal Thailand";
    client.competitors = [
      {
        id: 'c1',
        clientId: "COMP-L01",
        competitorName: "Unilever (Beauty)",
        brandCompany: "บริษัท ยูนิลีเวอร์ ไทย เทรดดิ้ง จำกัด",
        websiteUrl: "https://www.unilever.co.th/",
        socialMediaUrl: "",
        campaignReferenceUrl: "",
        keyMessagePositioning: "Everyday beauty and personal care for everyone.",
        strengths: "Massive distribution network, highly affordable.",
        weaknesses: "Less focus on premium/dermatological segments compared to L'Oréal.",
        notes: "Competes heavily in hair care and mass skin care."
      },
      {
        id: 'c2',
        clientId: "COMP-L02",
        competitorName: "Estée Lauder",
        brandCompany: "บริษัท เอสเต ลอเดอร์ (ประเทศไทย) จำกัด",
        websiteUrl: "https://www.esteelauder.co.th/",
        socialMediaUrl: "",
        campaignReferenceUrl: "",
        keyMessagePositioning: "Prestige beauty and luxury skincare.",
        strengths: "Strong hold on the luxury and department store segments.",
        weaknesses: "Limited presence in the mass market.",
        notes: "Direct competitor for L'Oréal's Luxe division (e.g., Lancôme, Kiehl's)."
      }
    ];
  }
  
  return client;
};
