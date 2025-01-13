from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import httpx
from pydantic import BaseModel, model_validator
import json

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
#COMMENT IF ERR 429. API KEY REQUESTS ARE LIMITED
# # List of dictionaries of data from 2021 to 2024
# API_URL = "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey="
# API_KEY = "UdVNPWNCQOUi2gCvEdB7tcT71kJDfnqw"

async def fetch_data(request: Request):
    # UNCOMMENT IF ERR 429. API KEY REQUESTS ARE LIMITED.
    with open("AAPL-APIDATA.json") as f:
         return json.load(f)

    # url = f"{API_URL}{API_KEY}"

    # try:
    #     async with httpx.AsyncClient() as client:
    #         response = await client.get(url)
    #     if response.status_code == 200:
    #         data = response.json()
    #         return data #Dict
    #     else:
    #         raise HTTPException(status_code=response.status_code, detail=f"Failure fetching data")
    
    # except Exception as e:
    #     print(e)
    #     raise HTTPException(status_code=500, detail="An internal error has occured.")



@app.get("/display_data/")
async def display_data(request: Request):
    dataSet = await fetch_data(request)
    return dataSet


@app.get("/year/{year}/")
async def year(request: Request, year = None):
    dataSet = await fetch_data(request)
    year = int(year)
    if year != None:
        match year:
            case 0:
                dataSet = dataSet[0] #2024
                return [dataSet]
            case 1:
                dataSet = dataSet[1] #2023
                return [dataSet]
            case 2:
                dataSet = dataSet[2] #2022
                return [dataSet]
            case 3:
                dataSet = dataSet[3] #2021
                return [dataSet]
            case 4:
                dataSet = dataSet[4] #2020
                return [dataSet]
    return dataSet

class FilterOptions(BaseModel):
    min: int
    max: int

    @model_validator(mode='before')
    @classmethod
    def validate_to_json(cls, value):
        print(value)
        # print(isinstance(value, str))
        # print(type(value))
        if isinstance(value, bytes):
            value = value.decode()
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value

@app.post("/filter_revenue/")
async def filter_revenue(request: Request, item: FilterOptions):
    dataSet = await fetch_data(request)
    filteredSet = filter(lambda dict: dict['revenue'] >= item.min and dict['revenue'] <= item.max, dataSet)
    return list(filteredSet)

@app.post("/filter_income/")
async def filter_income(request: Request, item: FilterOptions):
    dataSet = await fetch_data(request)
    filteredSet = filter(lambda dict: dict['netIncome'] >= item.min and dict['netIncome'] <= item.max, dataSet)
    return list(filteredSet)