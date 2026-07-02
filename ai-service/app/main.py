from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import CropRecommendationRequest, CropRecommendationResponse, YieldPredictionRequest, YieldPredictionResponse
from .predictor import predictor

app = FastAPI(
    title="Smart Agriculture AI Service",
    description="Provides machine learning predictions for crop recommendations and yield forecasting.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/ai/health")
def health_check():
    return {"status": "ok", "service": "ai-service"}

@app.post("/api/ai/recommend-crop", response_model=CropRecommendationResponse)
def recommend_crop(request: CropRecommendationRequest):
    try:
        features = [
            request.nitrogen,
            request.phosphorus,
            request.potassium,
            request.temperature,
            request.humidity,
            request.ph,
            request.rainfall
        ]
        
        result = predictor.recommend_crop(features)
        
        return CropRecommendationResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/ai/predict-yield", response_model=YieldPredictionResponse)
def predict_yield(request: YieldPredictionRequest):
    try:
        result = predictor.predict_yield(
            request.crop_name,
            request.area_ha,
            request.avg_temperature_c,
            request.expected_rainfall_mm
        )
        
        # Calculate rough revenue based on fixed prices
        prices = {'rice': 300, 'maize': 200, 'wheat': 250}
        price_per_ton = prices.get(request.crop_name.lower(), 150)
        
        revenue = result["predicted_yield_tons"] * price_per_ton
        result["expected_revenue_usd"] = revenue
        
        return YieldPredictionResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
