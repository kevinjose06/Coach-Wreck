# Coach Wreck 🎯

## Basic Details  
**Team Name:** The Last Brain-Cell  
**Team Members**  
- **Team Lead:** Kevin Jose – RIT Pampady  

## Project Description  
Coach Wreck is your ultimate anti-motivation companion. Ask for advice, and it roasts you instead. It's not here to help — it's here to humble you. Built to demolish your confidence, one sarcastic reply at a time.

---

## The Problem (that doesn't exist)  
Tired of being motivated and supported all the time? Fed up with chatbots that *actually* try to help you improve your life?

---

## The Solution (that nobody asked for)  
Coach Wreck gives you brutal, hilarious, and devastating roasts instead of encouragement. You ask a serious question, it delivers a sass-filled takedown. Think of it as your personal AI frenemy.

---

## Technical Details  

### Technologies/Components Used  

#### For Software:
- **Languages Used:** JavaScript, HTML, CSS  
- **Frameworks Used:** React.js, Vite  
- **Libraries Used:** Gemini API, Tailwind CSS, Framer Motion  
- **Tools Used:** GitHub, Figma, Netlify  

#### For Hardware:
> *No hardware was harmed in the making of this monstrosity.*

---

## Implementation   

# Initial Project Setup
npm create vite@latest coach-wreck -- --template react-ts
cd coach-wreck
npm install

# Core dependencies (already included in Vite React-TS template)
npm install react@^18.3.1 react-dom@^18.3.1

# UI and styling dependencies
npm install tailwindcss@^3.4.1 autoprefixer@^10.4.18 postcss@^8.4.35
npm install lucide-react@^0.344.0

# Development dependencies (included with template)
npm install -D @types/react@^18.3.5 @types/react-dom@^18.3.0
npm install -D @vitejs/plugin-react@^4.3.1
npm install -D typescript@^5.5.3
npm install -D eslint@^9.9.1 @eslint/js@^9.9.1
npm install -D eslint-plugin-react-hooks@^5.1.0-rc.0
npm install -D eslint-plugin-react-refresh@^0.4.11
npm install -D typescript-eslint@^8.3.0
npm install -D globals@^15.9.0
npm install -D vite@^5.4.2

# Initialize Tailwind CSS
npx tailwindcss init -p

# This creates:
tailwind.config.js
postcss.config.js

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

![Screenshot1](shot1.png) Home page

![Screenshot2](shot2.png) Page after a query is asked

![Screenshot3](shot3.png) Page after ask again is used


# Deployement 
https://stalwart-cajeta-21695d.netlify.app

#### Installation
```bash
git clone https://github.com/kevinjose06/Coach-Wreck.git  
cd coach-wreck  
npm install
