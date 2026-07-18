import * as XLSX from 'xlsx';

/**
 * Helper to parse price string to number for Excel calculations.
 * e.g., "120,000 บาท" -> 120000
 */
const parsePrice = (priceStr) => {
  if (typeof priceStr === 'number') return priceStr;
  if (!priceStr || priceStr === 'N/A') return 0;
  const numStr = priceStr.toString().replace(/,/g, '').replace(/[^0-9.]/g, '');
  const num = parseFloat(numStr);
  return isNaN(num) ? 0 : num;
};

export const exportDealsheet = (plannerData, influencers) => {
  if (!plannerData) return;

  // -------------------------
  // Tab 1: Brief
  // -------------------------
  const briefData = [
    ["Campaign Setup"],
    ["Campaign Name", plannerData.briefName || ''],
    ["Client", plannerData.clientName || ''],
    ["Brand", plannerData.brand || ''],
    ["Created Date", plannerData.createdDate || ''],
    ["Due Date", plannerData.dueDate || ''],
    [],
    ["Campaign Requirements"],
    ["Objective", plannerData.briefInfo?.campaignObjective || ''],
    ["Target Audience", plannerData.briefInfo?.targetAudience || ''],
    ["KPI", plannerData.briefInfo?.kpi || ''],
    ["Budget", plannerData.briefInfo?.budget || ''],
    ["Platform", plannerData.briefInfo?.platform || ''],
    ["Scope of Work", plannerData.briefInfo?.scopeOfWork || ''],
    ["Remark", plannerData.briefInfo?.remark || '']
  ];

  const wsBrief = XLSX.utils.aoa_to_sheet(briefData);

  // Set column widths for Brief tab
  wsBrief['!cols'] = [
    { wch: 20 }, // Field Name
    { wch: 50 }, // Value
  ];

  // -------------------------
  // Tab 2: Influencer List
  // -------------------------
  
  // Headers
  const infHeaders = [["Creator", "Platform", "Metrics (Followers)", "Metrics (ER)", "Price"]];
  
  // Map influencer data to rows
  let totalPrice = 0;
  const infRows = (influencers || []).map(inf => {
    const priceNum = parsePrice(inf.estimatedPrice);
    totalPrice += priceNum;
    return [
      inf.creatorName || '',
      inf.platform || '',
      inf.follower || '',
      inf.engagementRate || '',
      priceNum
    ];
  });

  // Append Total row
  const totalRow = ["Total", "", "", "", totalPrice];
  
  const wsInfluencers = XLSX.utils.aoa_to_sheet([...infHeaders, ...infRows, totalRow]);

  // Format Price column as number with commas
  // Assuming Price is the 5th column (Index 4)
  const range = XLSX.utils.decode_range(wsInfluencers['!ref']);
  for (let R = 1; R <= range.e.r; ++R) { // skip header
    const cellAddress = { c: 4, r: R };
    const cellRef = XLSX.utils.encode_cell(cellAddress);
    if (wsInfluencers[cellRef]) {
      wsInfluencers[cellRef].z = '#,##0'; // Excel number format
    }
  }

  // Set column widths for Influencer tab
  wsInfluencers['!cols'] = [
    { wch: 25 }, // Creator
    { wch: 20 }, // Platform
    { wch: 15 }, // Followers
    { wch: 15 }, // ER
    { wch: 20 }, // Price
  ];

  // -------------------------
  // Create Workbook and Save
  // -------------------------
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, wsBrief, "Brief");
  XLSX.utils.book_append_sheet(wb, wsInfluencers, "Influencer List");

  const fileName = `${plannerData.briefName || 'Campaign'}.xlsx`;
  XLSX.writeFile(wb, fileName);
};
