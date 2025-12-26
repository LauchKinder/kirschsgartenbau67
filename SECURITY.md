
# Sicherheitsarchitektur Kirschs Gartenbau

Um maximale Sicherheit beim Upload auf GitHub zu gewährleisten, nutzt dieses Projekt folgende Standards:

## 1. Schutz des API-Schlüssels
- **Environment Variables:** Der Gemini API-Key wird niemals im Quellcode gespeichert. Er wird über `process.env.API_KEY` aufgerufen.
- **Injektion:** Beim Deployment (z.B. auf Vercel) wird der Key sicher in den Umgebungsvariablen hinterlegt. Er gelangt niemals in das öffentliche Repository.

## 2. Datenschutz (DSGVO)
- **Keine Speicherung:** Chatverläufe werden nur lokal im Browser des Nutzers während der Sitzung vorgehalten und nicht auf unseren Servern gespeichert.
- **Formular-Sicherheit:** Kontaktanfragen werden verschlüsselt direkt an unser Postfach weitergeleitet.

## 3. GitHub-Sicherheit
- Die Datei `.env` (für lokale Tests) ist in der `.gitignore` enthalten, sodass sie niemals versehentlich veröffentlicht wird.
- Sollte ein Key jemals im Klartext committet werden, muss dieser sofort im Google AI Studio gesperrt werden.
