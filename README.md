# CV Builder (ATS · Designed · Web)

A lightweight, fully client-side CV builder built with **vanilla HTML, CSS & JavaScript**.

## Features

| Type       | Output          | Data saved? | Themes |
|------------|-----------------|-------------|--------|
| **ATS**    | PDF (A4)        | No          | Classic (+ others) |
| **Designed** | PDF (A4)      | No          | 6 color themes, two-column |
| **Web**    | Live URL        | Yes (30 days) | 6 color themes |

- Live preview while typing
- Add / remove Experience & Education entries
- Theme switcher (color + layout)
- PDF export via `html2pdf.js` (no server)
- Web CVs stored in **Firebase Firestore**, auto-expire after 30 days

## Tech stack

- HTML5 + vanilla JS
- [Pico CSS](https://picocss.com) (class-light framework)
- Custom CSS for CV themes
- Firebase Firestore (Web CVs only)
- html2pdf.js for client-side PDF

## Quick start (local)

```bash
# just open the folder with any static server
npx serve .
# or
python -m http.server 8080
```

Then open `http://localhost:8080` (or the port shown).

> PDF download and Web publish work offline except the real Firebase save.

## Firebase setup (for real Web CVs)

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Add a **Web** app → copy the config
3. Paste it into `js/firebase-config.js`
4. Enable **Cloud Firestore** (start in test mode for development)
5. Suggested security rules (test mode is open – lock it down later):

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /webcvs/{id} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasAll(['type','theme','data','createdAt','expiresAt'])
                    && request.resource.data.type == 'web';
      allow update, delete: if false; // only the scheduled cleaner deletes
    }
  }
}
```

### Auto-delete after 30 days

Firestore does **not** have built-in TTL on documents in the free tier the same way as Realtime Database.
Two easy options:

**Option A – Cloud Function (recommended)**

```js
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.cleanupExpiredCVs = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async () => {
    const now = new Date().toISOString();
    const snap = await admin.firestore()
      .collection('webcvs')
      .where('expiresAt', '<', now)
      .get();
    const batch = admin.firestore().batch();
    snap.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    console.log(`Deleted ${snap.size} expired CVs`);
  });
```

**Option B – Client-side check**  
The public page (`view.html`) already checks `expiresAt` and refuses to render expired CVs.  
You can also run a manual cleanup script periodically.

## File structure

```
cv-builder/
├── index.html          # main builder UI
├── view.html           # public Web CV viewer
├── css/
│   ├── styles.css      # layout + components
│   └── themes.css      # color themes + ATS/Designed differences
├── js/
│   ├── app.js          # all builder logic
│   └── firebase-config.js
└── README.md
```

## Customisation ideas

- Add more themes in `css/themes.css` + the `THEMES` object in `app.js`
- Add photo upload (Designed / Web only)
- Add sections: Projects, Certifications, Interests
- Export to DOCX with a library such as `docx`
- Multi-language UI

## License

MIT – use freely.
