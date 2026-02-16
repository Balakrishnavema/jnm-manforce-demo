from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
import json

app = FastAPI(title="JNM Manforce API Demo")

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy users
USERS = {"admin": "admin123"}

# Load dummy employee data
with open("dummy_data.json", "r") as f:
    EMPLOYEES = json.load(f)


class Token(BaseModel):
    access_token: str
    token_type: str


@app.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    username = form_data.username
    password = form_data.password
    if username not in USERS or USERS[username] != password:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"access_token": "demo-token", "token_type": "bearer"}


@app.get("/employees")
def get_employees(
    sector: str | None = None,
    trade: str | None = None,
    designation: str | None = None
):
    data = EMPLOYEES
    if sector:
        data = [d for d in data if d['sector'].lower() == sector.lower()]
    if trade:
        data = [d for d in data if d['trade'].lower() == trade.lower()]
    if designation:
        data = [d for d in data if d['designation'].lower() == designation.lower()]
    return data


@app.get("/employees/{emp_id}")
def get_employee(emp_id: int):
    emp = next((e for e in EMPLOYEES if e['id'] == emp_id), None)
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return emp


@app.get("/stats")
def stats():
    total = len(EMPLOYEES)
    available = len([e for e in EMPLOYEES if e['status'] == 'Available'])
    deployed = len([e for e in EMPLOYEES if e['status'] == 'Deployed'])
    return {"total": total, "available": available, "deployed": deployed}


# ✅ Root endpoint for Render health check
@app.get("/")
def home():
    return {"message": "JNM Manforce API is running 🚀"}
