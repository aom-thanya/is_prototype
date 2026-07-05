export const MOCK_BUYER_RECOMMENDATIONS = {
  briefId: "BRF-202607-001",
  clientId: "CLI-001",
  recommendedCreators: [
    {
      id: "cr-1",
      creatorName: "Pimtha",
      platform: "Instagram",
      category: "Lifestyle / Beauty",
      follower: "4.5M",
      engagementRate: "3.2%",
      estimatedPrice: "120,000 THB",
      availabilityStatus: "Available",
      overallMatchScore: 94,
      clientPreferenceMatchScore: 98,
      scoreBreakdown: {
        audienceMatch: 95,
        budgetFit: 85,
        platformFit: 100,
        contentFit: 96,
        engagementScore: 88,
        historicalPerformance: 92,
        clientPreferenceFit: 98
      },
      reasonSummary: "Audience ตรงกับ Target (Female 25-34), ภาพสวยแนว Premium Lifestyle ตรงกับที่ลูกค้าชอบ",
      explanation: {
        summary: "AI แนะนำ Pimtha เนื่องจากภาพลักษณ์ Premium Lifestyle เข้ากับ Coke Summer Refresh และมีฐานแฟนคลับวัยทำงานสูง",
        evidence: [
          "Audience ผู้หญิงอายุ 25-34 คิดเป็น 65%",
          "สไตล์ภาพสว่าง ตรงตาม Client Preference 'Mood ภาพสว่าง / Premium'",
          "เคยร่วมงานแคมเปญ FMCG ได้ Engagement Rate ดีกว่าเกณฑ์เฉลี่ย 12%"
        ],
        risks: [
          "ราคาค่อนข้างสูง อาจกินงบประมาณเยอะ (24% ของ Budget)"
        ],
        similarCampaigns: [
          {
            name: "Coke Summer 2025",
            result: "Reach exceeded KPI by 20%, ER 3.5%"
          }
        ]
      },
      selectionStatus: "Recommended", // Recommended, Selected, Preferred, Not Fit
      buyerNote: ""
    },
    {
      id: "cr-2",
      creatorName: "GoyNattyDream",
      platform: "YouTube, TikTok",
      category: "Lifestyle / Entertainment",
      follower: "2.1M",
      engagementRate: "6.5%",
      estimatedPrice: "80,000 THB",
      availabilityStatus: "Available",
      overallMatchScore: 90,
      clientPreferenceMatchScore: 85,
      scoreBreakdown: {
        audienceMatch: 90,
        budgetFit: 95,
        platformFit: 100,
        contentFit: 85,
        engagementScore: 98,
        historicalPerformance: 90,
        clientPreferenceFit: 85
      },
      reasonSummary: "Engagement สูงมาก เหมาะสำหรับสร้าง Awareness หมู่กว้าง",
      explanation: {
        summary: "กลุ่มผู้ชมครอบคลุมวัยทำงานและวัยรุ่น Engagement ดีมาก เหมาะกับการสร้างกระแส",
        evidence: [
          "Engagement Rate บน TikTok สูงถึง 6.5%",
          "ราคาคุ้มค่าต่อ Reach ที่คาดหวัง"
        ],
        risks: [
          "เนื้อหาอาจมีความสนุกสนาน (Comedy) ซึ่งต้องระวังไม่ให้ดูตลกเกินไปจนลูกค้า Reject"
        ],
        similarCampaigns: []
      },
      selectionStatus: "Recommended",
      buyerNote: ""
    },
    {
      id: "cr-3",
      creatorName: "MayyR",
      platform: "Instagram, YouTube",
      category: "Food / Lifestyle",
      follower: "1.8M",
      engagementRate: "4.1%",
      estimatedPrice: "65,000 THB",
      availabilityStatus: "Available",
      overallMatchScore: 88,
      clientPreferenceMatchScore: 90,
      scoreBreakdown: {
        audienceMatch: 85,
        budgetFit: 100,
        platformFit: 90,
        contentFit: 92,
        engagementScore: 85,
        historicalPerformance: 88,
        clientPreferenceFit: 90
      },
      reasonSummary: "โดดเด่นเรื่อง Food Pairing และมี Lifestyle ดูเข้าถึงง่าย",
      explanation: {
        summary: "MayyR เป็น Creator สายอาหารและไลฟ์สไตล์ เหมาะกับแคมเปญเครื่องดื่มที่ใช้ Food Pairing",
        evidence: [
          "Content ส่วนใหญ่เกี่ยวกับการรีวิวอาหาร คาเฟ่",
          "Follower ส่วนใหญ่เป็นผู้หญิงวัยเรียนจนถึงวัยทำงาน"
        ],
        risks: [
          "Mood and Tone อาจจะไม่ใช่ Premium จ๋าแบบที่ลูกค้าคาดหวัง"
        ],
        similarCampaigns: [
          {
            name: "Sprite Food Pairing 2024",
            result: "Generated 1.5M views across platforms"
          }
        ]
      },
      selectionStatus: "Recommended",
      buyerNote: ""
    }
  ]
};
