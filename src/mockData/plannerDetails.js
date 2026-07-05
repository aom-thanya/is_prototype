export const MOCK_PLANNER_DETAILS = {
  briefId: "BRF-202607-001",
  briefNo: "BRF-202607-001",
  briefName: "Coke Summer Refresh 2026",
  clientName: "Coca-Cola Thailand",
  brand: "Coke",
  briefType: "Ratecard",
  status: "Planner Review",
  createdBy: "Sales Team A",
  assignedPlanner: "Planner A",
  assignedBuyer: "Buyer B",
  createdDate: "5 Jul 2026",
  dueDate: "8 Jul 2026",

  briefInfo: {
    campaignObjective: "Awareness",
    targetAudience: "Female 25-34, Working Women, Bangkok",
    kpi: "Reach 2,000,000",
    platform: "TikTok, Instagram",
    budget: "500,000 THB",
    scopeOfWork: "TikTok Video 15 creators, IG Story 10 creators",
    remark: "ลูกค้าต้องการ Mood premium และหลีกเลี่ยง content ขายตรง"
  },

  similarCampaigns: [
    {
      id: "sc-1",
      similarityScore: 91,
      campaignName: "Coke Summer 2025",
      brand: "Coke",
      campaignPeriod: "Mar - May 2025",
      objective: "Awareness",
      budget: "480,000 THB",
      platform: "TikTok, Instagram",
      creatorType: "Lifestyle, Working Women",
      resultSummary: "Reach exceeded KPI by 18%",
      keyLearning: "Female lifestyle creators performed best in driving engagement on IG Story.",
      proposalUrl: "#",
      dealSheetUrl: "#"
    },
    {
      id: "sc-2",
      similarityScore: 82,
      campaignName: "Sprite Cool Refresh",
      brand: "Sprite",
      campaignPeriod: "Oct - Dec 2025",
      objective: "Awareness, Engagement",
      budget: "350,000 THB",
      platform: "TikTok",
      creatorType: "Gen Z, Comedy",
      resultSummary: "High engagement on TikTok but missed IG target.",
      keyLearning: "Comedy content worked well but client requested to tone down the humor.",
      proposalUrl: "#",
      dealSheetUrl: "#"
    }
  ],

  clientIntelligence: {
    briefingStats: {
      totalCampaigns: 18,
      averageBudget: "455,000 THB",
      averageApprovalTime: "2 Days",
      campaignSuccessRate: "89%"
    },
    preferences: {
      do: [
        "ใช้ Creator ผู้หญิงสาย Lifestyle",
        "ใช้ Mood ภาพสว่าง / Premium",
        "ใส่ KPI และ Benchmark ใน Proposal",
        "Proposal ควรกระชับ ไม่เกิน 15 หน้า"
      ],
      dont: [
        "หลีกเลี่ยง Meme",
        "หลีกเลี่ยง Dark Background",
        "หลีกเลี่ยง Hard Sell Wording",
        "หลีกเลี่ยง Proposal ที่ยาวเกินไป"
      ]
    },
    checklist: [
      { id: "c1", label: "KPI included", checked: true },
      { id: "c2", label: "Benchmark included", checked: false },
      { id: "c3", label: "Case Study included", checked: false },
      { id: "c4", label: "Timeline included", checked: true },
      { id: "c5", label: "Creator Rationale included", checked: false },
      { id: "c6", label: "Client Preference considered", checked: true }
    ],
    aiRecommendation: "แนะนำให้ใช้ Creator กลุ่ม Female Lifestyle / Working Women เป็นหลัก และควรใส่ Benchmark จากแคมเปญ Coke Summer 2025 เนื่องจากลูกค้ารายนี้ให้ความสำคัญกับข้อมูลประกอบการตัดสินใจ",
    warning: "ลูกค้ารายนี้เคย Reject Proposal ที่มี Mood ตลก / Meme และเคยขอแก้ Visual ที่ใช้ Background มืด ควรตรวจสอบ Mood & Tone ก่อนส่ง Sales Review"
  }
};
