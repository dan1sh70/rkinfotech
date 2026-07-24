# RK Infotech LLC

Premium, human-centric web application for RK Infotech LLC, a US-based IT staffing, recruitment, and career-services firm.

## 🚀 Features

- **Premium Light Theme**: High-end aesthetic with pure whites, deep charcoal typography (`#111827`), and vibrant brand accents (Coral, Gold, Cyan, Violet).
- **Responsive Bento Grid**: Modern services layout optimizing readability and interaction.
- **Cinematic Hero Section**: Fluid mesh gradient backgrounds with glassmorphic UI components.
- **Dynamic Marquee**: Infinite scrolling "Trusted By" logos with custom SVG implementations.
- **Scroll-to-Top Navigation**: Seamless routing experience utilizing React Router.
- **Modular Component Architecture**: Extracted global components (`Navbar`, `Footer`, `ScrollToTop`).

## 🛠️ Tech Stack

- **Frontend:** React (Vite), React Router DOM
- **Icons:** Lucide React
- **Styling:** Vanilla CSS with a strict CSS Variables Design System
- **Typography:** IBM Plex Sans (Headings/Body), IBM Plex Mono (Data/Accents)

## 📦 Quick Start

1. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Design System (v5)

The application utilizes a custom CSS variable system defined in `index.css`:

```css
/* Core Palette */
--bg-root: #ffffff;
--bg-surface: #f9fafb;
--bg-card: #ffffff;

/* Accents */
--coral: #e03144;
--gold: #d99a00;
--cyan: #00b39c;
--violet: #8b5cf6;

/* Typography */
--text-primary: #111827;
--text-secondary: #4b5563;
```

## 📁 Project Structure

```
client/
├── src/
│   ├── components/      # Global components (Navbar, Footer, ScrollToTop)
│   ├── pages/           # Route views (Home, Services, Pricing, Contact, FAQ, ReferEarn)
│   ├── App.jsx          # App routing and layout
│   └── index.css        # Global design system & variables
```
