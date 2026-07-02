from pydantic import BaseModel
from typing import List, Optional

class CropRecommendationRequest(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

class CropRecommendationResponse(BaseModel):
    recommended_crop: str
    confidence: float
    alternative_crops: List[str]

class YieldPredictionRequest(BaseModel):
    crop_name: str
    area_ha: float
    season: str
    expected_rainfall_mm: float
    avg_temperature_c: float

class YieldPredictionResponse(BaseModel):
    crop_name: str
    predicted_yield_tons: float
    expected_revenue_usd: Optional[float] = None
