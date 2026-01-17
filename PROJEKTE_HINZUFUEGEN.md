# Anleitung: Deine echten Projekte hinzufügen

## 📁 Projektdaten-Format

Für jedes deiner 5 Projekte brauche ich folgende Informationen:

### Textdaten (in einer Datei oder hier als Text):
```json
{
  "title": "Projektname",
  "description": "Kurze Beschreibung (1-2 Sätze für die Vorschau)",
  "longDescription": "Ausführliche Beschreibung für das Popup-Modal. Hier kannst du Details erklären, Herausforderungen beschreiben, etc.",
  "technologies": ["Technologie 1", "Technologie 2", "Technologie 3"],
  "githubUrl": "https://github.com/deinusername/projektname",
  "liveUrl": "https://projekt-demo.com",
  "featured": true
}
```

### Bilder:
- **Format**: JPG, PNG oder WebP
- **Größe**: Max 5MB pro Bild
- **Anzahl**: 1-5 Bilder pro Projekt
- **Benennung**: `projekt1-bild1.jpg`, `projekt1-bild2.jpg`, etc.

---

## 🎯 Wie du mir die Daten gibst

### **Option 1: Direkt in den Chat (Empfohlen für Text)**
Schreibe für jedes Projekt:

```
PROJEKT 1:
- Titel: [Name]
- Kurzbeschreibung: [1-2 Sätze]
- Lange Beschreibung: [Details]
- Technologien: [Tech1, Tech2, Tech3]
- GitHub: [URL]
- Live Demo: [URL]
- Bildernamen: projekt1-bild1.jpg, projekt1-bild2.jpg

PROJEKT 2:
...
```

### **Option 2: Bilder hochladen**
Die Bilder kannst du:
1. In einen Ordner im Workspace legen, z.B.:
   ```
   /frontend/public/project-images/
   ├── projekt1-bild1.jpg
   ├── projekt1-bild2.jpg
   ├── projekt2-bild1.jpg
   └── ...
   ```
2. Oder mir die Bilder als Links geben (z.B. Google Drive, Dropbox)

### **Option 3: JSON-Datei erstellen**
Erstelle eine Datei `meine-projekte.json`:
```json
[
  {
    "title": "Projekt 1",
    "description": "Kurze Beschreibung",
    "longDescription": "Lange Beschreibung...",
    "technologies": ["React", "Node.js", "MongoDB"],
    "images": ["projekt1-bild1.jpg", "projekt1-bild2.jpg"],
    "githubUrl": "https://github.com/...",
    "liveUrl": "https://...",
    "featured": true
  },
  {
    "title": "Projekt 2",
    ...
  }
]
```

---

## 🚀 Was ich dann mache

Sobald du mir die Daten gibst:
1. ✅ Lösche die Test-Projekte aus der Datenbank
2. ✅ Lade deine Bilder ins Backend `/uploads` Verzeichnis hoch
3. ✅ Füge deine echten Projekte in die MongoDB ein
4. ✅ Teste, ob alles im Frontend korrekt angezeigt wird

---

## 📋 Beispiel

**Projekt 1:**
- **Titel**: E-Commerce Shop
- **Kurz**: Ein vollständiger Online-Shop mit Warenkorb und Checkout
- **Lang**: Entwickelt mit React und Node.js. Features: Produktkatalog, Warenkorb, Stripe Payment Integration, User Authentication, Admin Dashboard zur Produktverwaltung
- **Technologien**: React, Node.js, MongoDB, Stripe, JWT
- **GitHub**: https://github.com/username/eshop
- **Live**: https://eshop-demo.com
- **Bilder**: eshop-home.jpg, eshop-product.jpg, eshop-checkout.jpg

---

## 💡 Am einfachsten

Schreib mir einfach im Chat für jedes Projekt:
- Name
- Kurze + lange Beschreibung
- 3 Technologien
- Optional: GitHub/Live Links

Und sage mir, wo die Bilder sind (Ordner im Projekt oder externe Links).

**Ich kümmere mich um den Rest!** 🎉
