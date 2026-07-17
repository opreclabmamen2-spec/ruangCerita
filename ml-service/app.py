from flask import Flask, request, jsonify
from flask_cors import CORS

import pickle
import torch
import torch.nn.functional as F

from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification
)

app = Flask(__name__)
CORS(app)

MODEL_NAME = "zzzild/mental-health-indobert"

tokenizer = AutoTokenizer.from_pretrained(
    MODEL_NAME
)

model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_NAME
)

model.eval()

with open(
    "label_encoder.pkl",
    "rb"
) as f:

    label_encoder = pickle.load(f)

@app.route("/")
def home():

    return "Mental Health IndoBERT API Running"

@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()

        text = data.get("text")

        if not text:

            return jsonify({
                "success": False,
                "message": "Text is required"
            }), 400

        inputs = tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            padding=True,
            max_length=128
        )


        with torch.no_grad():

            outputs = model(**inputs)

            logits = outputs.logits

            probabilities = F.softmax(
                logits,
                dim=1
            )

        pred = torch.argmax(
            probabilities,
            dim=1
        ).item()

        confidence = torch.max(
            probabilities
        ).item() * 100


        label_name = label_encoder.inverse_transform(
            [pred]
        )[0]


        probability_result = {}

        probs = probabilities.cpu().numpy()[0]

        for i, prob in enumerate(probs):

            label = label_encoder.inverse_transform(
                [i]
            )[0]

            probability_result[label] = round(
                float(prob) * 100,
                2
            )

        message = None

        if label_name == "Suicidal":

            message = (
                "Terdeteksi adanya indikasi pikiran bunuh diri. "
                "Disarankan segera mencari bantuan profesional "
                "atau menghubungi orang terpercaya."
            )

        elif label_name in ["Depression", "Anxiety"]:

            message = (
                "Terdeteksi indikasi gangguan kesehatan mental. "
                "Pertimbangkan untuk berkonsultasi dengan psikolog "
                "atau tenaga profesional."
            )

        elif label_name == "Normal":

            message = (
                "Tidak ditemukan indikasi gangguan kesehatan mental "
                "yang dominan pada teks."
            )

        return jsonify({

            "success": True,

            "result": {

                "label": label_name,

                "confidence": round(
                    confidence,
                    2
                ),

                "probabilities": probability_result,

                "message": message
            }
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )