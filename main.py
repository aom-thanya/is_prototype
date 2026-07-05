from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid

app = FastAPI(title="Brew & Co API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for beginner-friendly local development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory data
MENU = [
    {"name": "Latte", "price": 120},
    {"name": "Espresso", "price": 90},
    {"name": "Cold Brew", "price": 110},
]

class Order(BaseModel):
    drinks: list[str]

@app.get("/menu")
def get_menu():
    """Returns the three drinks as a list."""
    return MENU

@app.get("/menu/{name}")
def get_drink(name: str):
    """Returns one drink by name."""
    drink = next((d for d in MENU if d["name"].lower() == name.lower()), None)
    if not drink:
        raise HTTPException(status_code=404, detail="Drink not found")
    return drink

@app.post("/orders")
def place_order(order: Order):
    """Receives selected drinks and returns an order id."""
    if not order.drinks:
        raise HTTPException(status_code=400, detail="Order cannot be empty")
    
    # Generate a simple order ID
    order_id = str(uuid.uuid4())[:8].upper()
    return {"order_id": order_id, "status": "success"}
