# In a real-world scenario, you would load a trained model here (e.g., joblib.load('model.pkl'))
import random

CROPS = ['rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas',
         'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate',
         'banana', 'mango', 'grapes', 'watermelon', 'muskmelon', 'apple',
         'orange', 'papaya', 'coconut', 'cotton', 'jute', 'coffee']

class AgriPredictor:
    def __init__(self):
        # self.model = joblib.load('crop_recommendation_model.pkl')
        pass

    def recommend_crop(self, features: list) -> dict:
        """
        Mock prediction logic based on features 
        [N, P, K, temperature, humidity, ph, rainfall]
        """
        # A simple deterministic mock based on temp and rainfall just for demonstration
        temp = features[3]
        rainfall = features[6]
        
        if temp > 25 and rainfall > 150:
            primary = 'rice'
            alts = ['jute', 'papaya']
        elif temp < 20 and rainfall < 100:
            primary = 'chickpea'
            alts = ['kidneybeans', 'lentil']
        elif 20 <= temp <= 30 and 50 <= rainfall <= 150:
            primary = 'maize'
            alts = ['cotton', 'millet']
        else:
            primary = random.choice(CROPS)
            alts = random.choices(CROPS, k=2)

        return {
            "recommended_crop": primary,
            "confidence": round(random.uniform(0.70, 0.99), 2),
            "alternative_crops": alts
        }
        
    def predict_yield(self, crop: str, area: float, temp: float, rainfall: float) -> dict:
        """Mock crop yield prediction"""
        
        # Base yield per hectare 
        base_yields = {
            'rice': 4.5,
            'maize': 5.0,
            'wheat': 3.5,
            'cotton': 2.0
        }
        
        base = base_yields.get(crop.lower(), 3.0)
        
        # Apply some random "weather effects"
        weather_multiplier = random.uniform(0.8, 1.2)
        
        predicted_tons = base * area * weather_multiplier
        
        return {
            "crop_name": crop,
            "predicted_yield_tons": round(predicted_tons, 2),
        }

predictor = AgriPredictor()
