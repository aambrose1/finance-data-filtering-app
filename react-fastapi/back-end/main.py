from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

origins = [
    "https://127.0.0.1:8000",
    "http://localhost:5173" ,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

# List of dictionaries of data from 2021 to 2024
API_URL = "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey="
API_KEY = "8bMDrZT7MhS3C6sNzLeujKMlfedx5vIM"

async def fetch_data(request: Request):
    url = f"{API_URL}{API_KEY}"

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
        if response.status_code == 200:
            data = response.json()
            return data #Dict
        else:
            raise HTTPException(status_code=response.status_code, detail=f"Failure fetching data")
    
    except:
        raise HTTPException(status_code=500, detail="An internal error has occured.")


#TO-DO : Make data filters. Years: Buttons, Net: Search, Rev: Search
@app.get("/display_data/")
async def display_data(request: Request):
    dataSet = await fetch_data(request)
    data2024 = dataSet[0]
    data2023 = dataSet[1]
    data2022 = dataSet[2]
    data2021 = dataSet[3]
    data2020 = dataSet[4]
    return dataSet
