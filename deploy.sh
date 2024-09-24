#!/bin/bash

cd /codice/rifiutopoli

cd frontend
npm install
npm run build

cd ../backend
source venv/bin/activate
pip install -r requirements.txt

python main.py
