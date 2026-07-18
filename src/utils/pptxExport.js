import pptxgen from "pptxgenjs";

export const exportProposalPptx = (plannerData, influencers) => {
  if (!plannerData) return;

  // 1. Initialize PPTX
  const pres = new pptxgen();
  pres.author = "IsPrototype";
  pres.company = "IsPrototype";
  pres.title = `${plannerData.briefName || 'Campaign'} Proposal`;

  // Standard Theme Colors
  const brandColor = "0A2540"; // Dark Blue
  const accentColor = "635BFF"; // Purple/Blue Accent
  const textColor = "3C4257";
  const grayColor = "8792A2";

  // ==========================================
  // SLIDE 1: COVER
  // ==========================================
  const slideCover = pres.addSlide();
  slideCover.background = { color: brandColor };
  
  slideCover.addText(plannerData.briefName || 'Campaign Name', {
    x: 1.0, y: 2.0, w: 8.0, h: 1.0,
    color: 'FFFFFF',
    fontSize: 44,
    bold: true,
    align: 'center',
    fontFace: 'Noto Sans Thai'
  });

  slideCover.addText("PROPOSAL", {
    x: 1.0, y: 3.0, w: 8.0, h: 0.5,
    color: 'A9B5C5',
    fontSize: 24,
    align: 'center',
    letterSpacing: 0.1,
    fontFace: 'Noto Sans Thai'
  });

  // ==========================================
  // SLIDE 2: BRIEF DETAILS
  // ==========================================
  const slideBrief = pres.addSlide();
  
  // Title
  slideBrief.addText("Campaign Brief", {
    x: 0.5, y: 0.5, w: '90%',
    color: brandColor,
    fontSize: 28,
    bold: true,
    fontFace: 'Noto Sans Thai'
  });

  // Table Data
  const briefTableData = [
    [
      { text: "Client", options: { bold: true, color: accentColor, fill: 'F4F5F7' } },
      { text: plannerData.clientName || '-' }
    ],
    [
      { text: "Brand", options: { bold: true, color: accentColor, fill: 'F4F5F7' } },
      { text: plannerData.brand || '-' }
    ],
    [
      { text: "Objective", options: { bold: true, color: accentColor, fill: 'F4F5F7' } },
      { text: plannerData.briefInfo?.campaignObjective || '-' }
    ],
    [
      { text: "Target Audience", options: { bold: true, color: accentColor, fill: 'F4F5F7' } },
      { text: plannerData.briefInfo?.targetAudience || '-' }
    ],
    [
      { text: "KPI", options: { bold: true, color: accentColor, fill: 'F4F5F7' } },
      { text: plannerData.briefInfo?.kpi || '-' }
    ],
    [
      { text: "Budget", options: { bold: true, color: accentColor, fill: 'F4F5F7' } },
      { text: plannerData.briefInfo?.budget || '-' }
    ],
    [
      { text: "Scope of Work", options: { bold: true, color: accentColor, fill: 'F4F5F7' } },
      { text: plannerData.briefInfo?.scopeOfWork || '-' }
    ]
  ];

  slideBrief.addTable(briefTableData, {
    x: 0.5, y: 1.2,
    w: 9.0,
    colW: [2.5, 6.5],
    border: { pt: 1, color: 'E3E8EE' },
    fontSize: 14,
    color: textColor,
    fontFace: 'Noto Sans Thai',
    valign: 'middle',
    rowH: 0.5
  });

  // ==========================================
  // SLIDES 3+: INFLUENCERS
  // ==========================================
  if (influencers && influencers.length > 0) {
    influencers.forEach((inf, index) => {
      const slideInf = pres.addSlide();
      
      // Header Banner
      slideInf.addShape(pres.ShapeType.rect, {
        x: 0, y: 0, w: '100%', h: 0.8, fill: { color: brandColor }
      });

      slideInf.addText(`Recommended Creator ${index + 1}`, {
        x: 0.5, y: 0.15, w: '80%',
        color: 'FFFFFF',
        fontSize: 20,
        bold: true,
        fontFace: 'Noto Sans Thai'
      });

      // Creator Name
      slideInf.addText(inf.creatorName || 'Unknown Creator', {
        x: 0.5, y: 1.2, w: 9.0,
        color: accentColor,
        fontSize: 32,
        bold: true,
        fontFace: 'Noto Sans Thai'
      });

      // Categories / Tags
      slideInf.addText(inf.category || 'Creator', {
        x: 0.5, y: 1.8, w: 9.0,
        color: grayColor,
        fontSize: 16,
        fontFace: 'Noto Sans Thai'
      });

      // Metrics Table
      const metricsData = [
        [
          { text: "Platform", options: { bold: true, color: 'FFFFFF', fill: brandColor } },
          { text: "Followers", options: { bold: true, color: 'FFFFFF', fill: brandColor } },
          { text: "Engagement Rate", options: { bold: true, color: 'FFFFFF', fill: brandColor } },
          { text: "Estimated Price", options: { bold: true, color: 'FFFFFF', fill: brandColor } }
        ],
        [
          { text: inf.platform || '-' },
          { text: inf.follower || '-' },
          { text: inf.engagementRate || '-' },
          { text: inf.estimatedPrice || '-' }
        ]
      ];

      slideInf.addTable(metricsData, {
        x: 0.5, y: 2.5,
        w: 9.0,
        border: { pt: 1, color: 'E3E8EE' },
        fontSize: 16,
        color: textColor,
        fontFace: 'Noto Sans Thai',
        align: 'center',
        valign: 'middle',
        rowH: 0.6
      });

      // Reason Summary
      if (inf.reasonSummary) {
        slideInf.addText("Why Recommended:", {
          x: 0.5, y: 4.0, w: 9.0,
          color: brandColor,
          fontSize: 16,
          bold: true,
          fontFace: 'Noto Sans Thai'
        });
        
        slideInf.addText(inf.reasonSummary, {
          x: 0.5, y: 4.4, w: 9.0, h: 1.0,
          color: textColor,
          fontSize: 14,
          fontFace: 'Noto Sans Thai',
          valign: 'top'
        });
      }
    });
  }

  // ==========================================
  // FINAL SLIDE: THANK YOU
  // ==========================================
  const slideEnd = pres.addSlide();
  slideEnd.background = { color: brandColor };
  
  slideEnd.addText("Thank You", {
    x: 1.0, y: 2.0, w: 8.0, h: 1.5,
    color: 'FFFFFF',
    fontSize: 56,
    bold: true,
    align: 'center',
    fontFace: 'Noto Sans Thai'
  });

  // Export File
  const fileName = `${plannerData.briefName || 'Campaign'}_Proposal.pptx`;
  pres.writeFile({ fileName: fileName });
};
