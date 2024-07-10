## Backend

Ogni comando che segue è da eseguire all'interno della cartella `backend`

- per creare l'ambiente virtuale con **venv**: `python -m venv venv`
- per attivare l'ambiente virtuale: `.\venv\Scripts\activate` su windows o `source venv/bin/activate` su linux
- per installare le librerie del progetto: `pip install -r requirements.txt`
- **IMPORTANTE** dopo aver installato una nuova libreria eseguire anche `pip freeze > requirements.txt` per assiucarsi che venga tracciata
- per far partire il backend: `python main.py`

## Frontend

Ogni comando che segue è da eseguire all'interno della cartella `frontend`

- per installare le librerie del progetto: `npm install`
- per far partire il frontend `npm start`
