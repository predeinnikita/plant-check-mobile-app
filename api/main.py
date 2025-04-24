from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np
import tensorflow as tf
import pickle as pkl
from tensorflow.keras.models import load_model

app = FastAPI()

model = load_model("model")

CLASS_NAMES = [
    'Tomato_Bacterial_spot', 'Tomato_Early_blight', 'Tomato_Late_blight',
    'Tomato_Leaf_Mold', 'Tomato_Septoria_leaf_spot',
    'Tomato_Spider_mites_Two_spotted_spider_mite',
    'Tomato__Target_Spot', 'Tomato__Tomato_YellowLeaf__Curl_Virus',
    'Tomato__Tomato_mosaic_virus', 'Tomato_healthy'
]

IMG_SIZE = 256

@app.post("/process")
async def process_image(file: UploadFile = File(...)):
    image = Image.open(file.file).convert("RGB")
    image = image.resize((IMG_SIZE, IMG_SIZE))
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)

    prediction = model.predict(image_array)
    predicted_class = CLASS_NAMES[np.argmax(prediction)]
    confidence = float(np.max(prediction))

    return JSONResponse(content={
        "predicted_class": predicted_class,
        "confidence": round(confidence * 100, 2)
    })
