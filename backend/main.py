from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import time
import json
from creators_mock import MOCK_CREATORS

app = FastAPI()

# Enable CORS so the React app can call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MOCK_BRIEFS = [
    { "id": '1', "briefNo": 'BRF-2026-001', "projectName": 'แคมเปญหน้าร้อน', "client": 'โคคา-โคลา', "brand": 'โค้ก', "briefType": 'มาตรฐาน', "status": 'Brief Creation', "salesOwner": 'สมชาย', "createdDate": '2026-07-01', "updatedDate": '2026-07-02' },
    { "id": '2', "briefNo": 'BRF-2026-002', "projectName": 'โปรโมชั่นไตรมาส 3', "client": 'ซัมซุง', "brand": 'กาแล็กซี่', "briefType": 'แพ็กเกจรวม', "status": 'Creator Sourcing', "salesOwner": 'สมหญิง', "createdDate": '2026-07-02', "updatedDate": '2026-07-02' },
    { "id": '3', "briefNo": 'BRF-2026-003', "projectName": 'รีวิวสินค้าโดย KOL', "client": 'ลอรีอัล', "brand": 'ปารีส', "briefType": 'เรทการ์ด', "status": 'Planning', "salesOwner": 'สมศักดิ์', "createdDate": '2026-07-03', "updatedDate": '2026-07-04' },
    { "id": '4', "briefNo": 'BRF-2026-004', "projectName": 'งานเปิดตัวสินค้า', "client": 'ไนกี้', "brand": 'สปอร์ตแวร์', "briefType": 'มาตรฐาน', "status": 'Sales Handover', "salesOwner": 'สมชาย', "createdDate": '2026-07-04', "updatedDate": '2026-07-05' },
    { "id": '5', "briefNo": 'BRF-2026-005', "projectName": 'สื่อโซเชียลรายเดือน', "client": 'แอปเปิล', "brand": 'ไอโฟน', "briefType": 'แพ็กเกจรวม', "status": 'Creator Sourcing', "salesOwner": 'สมหญิง', "createdDate": '2026-07-05', "updatedDate": '2026-07-05' },
    { "id": '6', "briefNo": 'BRF-2026-006', "projectName": 'กระจายสินค้าให้ Influencer', "client": 'ไดสัน', "brand": 'แฮร์แคร์', "briefType": 'เรทการ์ด', "status": 'Sales Handover', "salesOwner": 'สมศักดิ์', "createdDate": '2026-06-20', "updatedDate": '2026-06-25' },
    { "id": '7', "briefNo": 'BRF-2026-007', "projectName": 'แผนจัดการภาวะวิกฤต', "client": 'โตโยต้า', "brand": 'คอร์ปอเรท', "briefType": 'มาตรฐาน', "status": 'Planning', "salesOwner": 'สมชาย', "createdDate": '2026-06-28', "updatedDate": '2026-06-29' },
    { "id": '8', "briefNo": 'BRF-2026-008', "projectName": 'คอลเลกชันหน้าหนาว', "client": 'ยูนิโคล่', "brand": 'ไลฟ์แวร์', "briefType": 'มาตรฐาน', "status": 'Brief Creation', "salesOwner": 'สมหญิง', "createdDate": '2026-07-05', "updatedDate": '2026-07-05' },
    { "id": '9', "briefNo": 'BRF-2026-009', "projectName": 'โปรโมตเกมใหม่', "client": 'การีนา', "brand": 'RoV', "briefType": 'แพ็กเกจรวม', "status": 'Creator Sourcing', "salesOwner": 'สมศักดิ์', "createdDate": '2026-07-06', "updatedDate": '2026-07-06' },
    { "id": '10', "briefNo": 'BRF-2026-010', "projectName": 'โปรโมชั่นกลางปี', "client": 'ช้อปปี้', "brand": 'ช้อปปี้เพย์', "briefType": 'มาตรฐาน', "status": 'Planning', "salesOwner": 'สมชาย', "createdDate": '2026-07-07', "updatedDate": '2026-07-07' },
    { "id": '11', "briefNo": 'BRF-2026-011', "projectName": 'แคมเปญเพื่อสังคม', "client": 'บางจาก', "brand": 'องค์กร', "briefType": 'มาตรฐาน', "status": 'Sales Handover', "salesOwner": 'สมหญิง', "createdDate": '2026-07-08', "updatedDate": '2026-07-08' },
    { "id": '12', "briefNo": 'BRF-2026-012', "projectName": 'ลดราคาเครื่องใช้ไฟฟ้า', "client": 'โฮมโปร', "brand": 'โฮมโปร', "briefType": 'แพ็กเกจรวม', "status": 'Creator Sourcing', "salesOwner": 'สมศักดิ์', "createdDate": '2026-07-09', "updatedDate": '2026-07-09' },
    { "id": '13', "briefNo": 'BRF-2026-013', "projectName": 'แคมเปญวันแม่', "client": 'เซ็นทรัล', "brand": 'ห้างสรรพสินค้า', "briefType": 'เรทการ์ด', "status": 'Brief Creation', "salesOwner": 'สมชาย', "createdDate": '2026-07-10', "updatedDate": '2026-07-10' },
    { "id": '14', "briefNo": 'BRF-2026-014', "projectName": 'เปิดตัวเมนูใหม่', "client": 'แมคโดนัลด์', "brand": 'แมคคาเฟ่', "briefType": 'มาตรฐาน', "status": 'Planning', "salesOwner": 'สมหญิง', "createdDate": '2026-07-11', "updatedDate": '2026-07-11' },
    { "id": '15', "briefNo": 'BRF-2026-015', "projectName": 'แพ็กเกจมือถือ 5G', "client": 'เอไอเอส', "brand": '5G Max', "briefType": 'แพ็กเกจรวม', "status": 'Sales Handover', "salesOwner": 'สมศักดิ์', "createdDate": '2026-07-12', "updatedDate": '2026-07-12' }
]

@app.get("/api/briefs")
async def get_briefs():
    # Simulate network delay for realistic loading states
    time.sleep(0.5)
    return MOCK_BRIEFS

@app.post("/api/briefs")
async def create_brief(req: dict):
    time.sleep(1) # simulate processing
    return {"status": "success", "message": "Brief created successfully", "data": req}

@app.get("/api/creators/search")
async def search_creators(q: Optional[str] = None):
    time.sleep(0.8) # simulate network delay
    if not q:
        return MOCK_CREATORS
    q = q.lower()
    return [c for c in MOCK_CREATORS if q in c["username"].lower() or q in c["displayName"].lower()]

@app.post("/api/creators/search_by_photo")
async def search_creators_by_photo():
    time.sleep(1.5) # simulate AI processing delay
    # Just return a subset of mocked creators for demonstration
    return sorted(MOCK_CREATORS, key=lambda x: x.get("similarityScore", 0), reverse=True)[:3]

@app.get("/api/briefs/summary")
async def get_briefs_summary():
    time.sleep(0.5)
    total_count = len(MOCK_BRIEFS)
    draft_count = sum(1 for b in MOCK_BRIEFS if b["status"] == "Draft")
    # Using 'Waiting Review' as originally calculated, though 'Brief' might be what they meant.
    # The original react code did: briefs.filter(b => b.status === 'Waiting Review').length
    waiting_count = sum(1 for b in MOCK_BRIEFS if b["status"] == "Waiting Review")
    completed_count = sum(1 for b in MOCK_BRIEFS if b["status"] == "Completed")

    return {
        "totalCount": total_count,
        "draftCount": draft_count,
        "waitingCount": waiting_count,
        "completedCount": completed_count
    }

# Load Dashboard Data
with open("dashboard_data.json", "r", encoding="utf-8") as f:
    dashboard_data = json.load(f)

@app.get("/api/dashboard/briefs")
async def get_dashboard_briefs():
    time.sleep(0.5)
    return dashboard_data["briefs"]

@app.get("/api/dashboard/stats")
async def get_dashboard_stats():
    time.sleep(0.5)
    return dashboard_data["stats"]

MOCK_CLIENTS = [
    { "id": '1', "clientId": 'CLI-001', "companyNameTh": 'บริษัท โคคา-โคลา (ประเทศไทย) จำกัด', "addressTh": 'กรุงเทพมหานคร' },
    { "id": '2', "clientId": 'CLI-002', "companyNameTh": 'บริษัท ซัมซุง อิเลคโทรนิคส์ จำกัด', "addressTh": 'กรุงเทพมหานคร' },
    { "id": '3', "clientId": 'CLI-003', "companyNameTh": 'บริษัท ลอรีอัล (ประเทศไทย) จำกัด', "addressTh": 'กรุงเทพมหานคร' },
]

@app.get("/api/clients")
async def get_clients():
    time.sleep(0.5)
    return MOCK_CLIENTS

with open("client_details_data.json", "r", encoding="utf-8") as f:
    client_details_data = json.load(f)

@app.get("/api/clients/{client_id}")
async def get_client_details(client_id: str):
    time.sleep(0.5)
    if client_id in client_details_data:
        return client_details_data[client_id]
    raise HTTPException(status_code=404, detail="Client not found")

@app.get("/api/clients/{client_id}/brands")
async def get_client_brands(client_id: str):
    time.sleep(0.5)
    if client_id in client_details_data:
        return client_details_data[client_id].get("brands", [])
    raise HTTPException(status_code=404, detail="Client not found")

@app.get("/api/clients/{client_id}/campaign_history")
async def get_client_campaign_history(client_id: str):
    time.sleep(0.5)
    if client_id in client_details_data:
        return client_details_data[client_id].get("campaignHistory", [])
    raise HTTPException(status_code=404, detail="Client not found")

@app.get("/api/clients/{client_id}/knowledge")
async def get_client_knowledge(client_id: str):
    time.sleep(0.5)
    if client_id in client_details_data:
        return client_details_data[client_id].get("knowledge", None)
    raise HTTPException(status_code=404, detail="Client not found")

@app.get("/api/clients/{client_id}/competitors")
async def get_client_competitors(client_id: str):
    time.sleep(0.5)
    if client_id in client_details_data:
        return client_details_data[client_id].get("competitors", [])
    raise HTTPException(status_code=404, detail="Client not found")

@app.get("/api/clients/{client_id}/documents")
async def get_client_documents(client_id: str):
    time.sleep(0.5)
    if client_id in client_details_data:
        return client_details_data[client_id].get("documents", [])
    raise HTTPException(status_code=404, detail="Client not found")

@app.get("/api/clients/{client_id}/contacts")
async def get_client_contacts(client_id: str):
    time.sleep(0.5)
    if client_id in client_details_data:
        return client_details_data[client_id].get("contacts", [])
    raise HTTPException(status_code=404, detail="Client not found")

with open("buyer_workspace_data.json", "r", encoding="utf-8") as f:
    buyer_data = json.load(f)

@app.get("/api/workspace/buyer/{brief_id}")
async def get_buyer_workspace(brief_id: str):
    time.sleep(0.8) # simulate AI loading
    return {
        "brief": buyer_data["plannerDetails"],
        "recommendations": buyer_data["buyerRecommendations"]["recommendedCreators"]
    }

class SubmitRecommendationRequest(BaseModel):
    selectedCreators: List[str]

@app.post("/api/workspace/buyer/{brief_id}/submit")
async def submit_buyer_recommendation(brief_id: str, req: SubmitRecommendationRequest):
    time.sleep(1) # simulate processing
    # In a real app, you would save this to the database
    return {
        "status": "success", 
        "message": "Recommendations submitted successfully", 
        "brief_id": brief_id, 
        "selectedCreators": req.selectedCreators
    }




