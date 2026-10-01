# Themes (fully modular)

Each theme is an independent package. You can edit or add themes without touching the core app.

## Folder structure

```
themes/
  classic/
    style.css     ← all visual styles for this theme
    render.js     ← HTML structure + meta (label, colors, allowed types)
  modern/
    style.css
    render.js
  ...
```

## How to customize an existing theme

1. Open `themes/<name>/style.css` → change layout, fonts, colors, spacing  
2. Open `themes/<name>/render.js` → change HTML structure, section order, extra blocks  
3. Refresh the browser — no rebuild needed

## How to add a new theme

### 1. Create folder

```bash
mkdir themes/mytheme
```

### 2. Create `themes/mytheme/style.css`

```css
.theme-mytheme {
  --accent: #e11d48;
  /* your styles */
}
.theme-mytheme .cv-header h1 { ... }
```

### 3. Create `themes/mytheme/render.js`

```js
(function () {
  const H = () => window.CVHelpers;

  CVThemes.register('mytheme', {
    meta: {
      label: 'My Theme',
      layout: 'custom',
      allowed: ['designed', 'web'],   // or include 'ats'
      colors: ['#e11d48', '#fff1f2'], // picker swatch
      desc: 'Short description',
      defaults: {
        accent: '#e11d48',
        header: '#ffffff',
        text: '#1c1917',
        muted: '#78716c',
        skill: '#ffe4e6',
        card: '#ffffff'
      }
    },
    css: 'themes/mytheme/style.css',
    render(d) {
      const { escapeHtml, nl2br, buildContactLine, buildSkills, buildLangs, buildExperience, buildEducation } = H();
      // return your HTML string
      return `<div class="cv-header">...</div>`;
    }
  });
})();
```

### 4. Register in HTML

Add to **both** `index.html` and `view.html`:

```html
<link rel="stylesheet" href="themes/mytheme/style.css" />
...
<script src="themes/mytheme/render.js"></script>
```

(Place the script **after** `js/theme-helpers.js` and **before** `js/app.js`.)

Done — the new theme appears in the picker automatically.

## Helpers available in render()

Via `window.CVHelpers`:

| Helper | Use |
|--------|-----|
| `escapeHtml(str)` | Safe text |
| `nl2br(str)` | Newlines → `<br>` |
| `formatMonth('2024-01')` | → `Jan 2024` |
| `buildContactLine(d)` | Email · phone · links |
| `buildSkills(d)` | Skill tags HTML |
| `buildLangs(d)` | Language tags HTML |
| `buildExperience(d, variant?)` | Experience blocks (`'minimal'` variant) |
| `buildEducation(d, variant?)` | Education blocks |

## Color customizer

For Designed & Web, users can override `defaults` colors live.  
Those map to CSS variables: `--accent`, `--header-bg`, `--text`, `--muted`, `--skill-bg`, `--card-bg`, etc.  
Use these variables in your `style.css` so the customizer works with your theme.
