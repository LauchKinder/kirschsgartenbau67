
# Kirschs Gartenbau - Webauftritt

Dieses Projekt ist optimiert für den Upload auf GitHub und das Deployment auf Vercel.

## 🚀 Deployment auf Vercel

1.  **GitHub-Upload:** Lade alle Dateien in ein neues GitHub-Repository hoch.
2.  **Vercel-Import:** Verbinde dein Vercel-Konto mit GitHub und wähle das Repository aus.
3.  **WICHTIG (Environment Variable):** 
    Gehe in Vercel zu: **Settings** -> **Environment Variables**.
    Füge eine neue Variable hinzu:
    - **Key:** `API_KEY`
    - **Value:** *Dein echter API-Key von Google AI Studio*
4.  **Deploy:** Vercel erkennt die `package.json` und die `api/`-Route automatisch.

## 🛡️ Warum diese Struktur?
- **Proxy-Architektur:** Dein API-Key wird serverseitig verarbeitet und ist niemals im Browser-Quellcode sichtbar.
- **Edge Runtime:** Die KI-Antworten werden extrem schnell gestreamt.
- **Zero-Config:** Vercel erkennt die Edge-Functions im `api/` Ordner ohne weitere Einstellungen.
