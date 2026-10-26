# TerraScope — Global Emissions Analytics (MERN Stack)

A clean, modern, responsive web dashboard built with the **MERN** stack (MongoDB, Express.js, React, Node.js) converting the TerraScope environmental analytics design into a fully interactive, production-ready application.

![TerraScope Dashboard Preview](client/src/assets/hero.png)

---

## 🌍 Design & Aesthetic System

Crafted to adhere to the environmental analytics specification:
- **Off-white Background:** `#F7F8F4`
- **Forest Green Primary:** `#163D33` (Used in the hero header, atmospheric lighting, and high-impact badges)
- **Leaf Green Chart & Accent:** `#2F765B` (Used for area curves, ranking bars, and map choropleth steps)
- **Soft Lime Highlights:** `#D9EFAB` (Subtle highlights, active indicators, and badges)
- **Dark Charcoal Text:** `#202824`
- **Typography:** **Manrope** for headings and key metrics; **Inter** for crisp data labels and body copy.
- **Visuals:** Rounded card geometry (`rounded-2xl`), subtle borders (`#E3E8E1`), restrained iconography via Lucide, and generous whitespace.

---

## 📊 Dashboard Modules & Interactivity

1. **Header & Atmospheric Hero:**
   - Compact **TerraScope** branding with leaf emblem.
   - Interactive **Year Selector Dropdown** (2022, 2020, 2015, 2010, 2005, 2000, 1995, 1990) that dynamically recomputes all KPIs, rankings, map choropleth, and comparison series.
   - **Dashboard / Analysis** dual-tab navigation.
   - Eco-badge: *"A cleaner planet through clearer data"*.

2. **Four Core KPI Cards:**
   - **Total Global CO₂ Emissions:** `36,827` Million tonnes (`↑ 1.1% vs previous year`).
   - **Countries Covered:** `196` Countries / Economies with a vector world silhouette.
   - **CO₂ per Person:** `4.6` Tonnes per person (`↑ 0.5% vs previous year`).
   - **Year-on-Year Change:** `+1.1%` Global annual change with dynamic ascending spark-bars.

3. **Global CO₂ Emissions Trend:**
   - Interactive historical trend (1990 – 2022) powered by **Recharts**.
   - Perspective dropdown: Toggle between **Total Emissions**, **CO₂ per Capita**, and **Cumulative Emissions**.
   - Custom environmental tooltip with YoY growth indicators.

4. **Top 10 Emitting Countries:**
   - Ranked horizontal bar chart featuring China (11,472 Mt), USA (5,057 Mt), India (2,909 Mt), Russia (1,761 Mt), Japan (1,107 Mt), Iran (736 Mt), Germany (674 Mt), Saudi Arabia (626 Mt), Indonesia (618 Mt), and South Korea (611 Mt).
   - Proportional pill progress bars and one-click interaction to add any country into the comparison chart.

5. **CO₂ Emissions by Country (Choropleth World Map):**
   - Color-coded country map divided into six emission brackets:
     - `> 5,000 Mt` (Deep forest)
     - `1,000 – 5,000 Mt`
     - `500 – 1,000 Mt`
     - `100 – 500 Mt`
     - `10 – 100 Mt`
     - `< 10 Mt` (Pale green)
   - Interactive hover tooltips with country name, emissions in Mt, and per capita footprint.
   - Clicking any region adds it directly to the comparison chart.

6. **Country Comparison:**
   - Multi-country comparison chart supporting multi-select with search and removable badge chips.
   - Radio toggle between **Total Emissions** and **Emissions per Person**.
   - Multi-line visualization with distinctive environmental palette colors.

7. **Key Insights Section:**
   - Real-time bulleted highlights summarizing global shares, historical trends, and per capita averages.

8. **Analysis Tab View:**
   - In-depth searchable data table across 196+ territories.
   - Continent filtering and column sorting (by Rank, Country, Total Emissions, Per Capita, and Global Share).

9. **Data Provenance Footer:**
   - Attributions to *Our World in Data (Global Carbon Project)* with latest reporting year badge.

---

## 🛠️ Tech Stack (MERN)

- **Frontend:**
  - React 19
  - Vite 8
  - Tailwind CSS v4 (`@tailwindcss/vite`)
  - Recharts (responsive SVG charts)
  - Lucide React (feather-style icons)
- **Backend:**
  - Node.js & Express.js
  - RESTful API with CORS and JSON middleware
  - Mongoose Schemas (`GlobalStat`, `CountryEmission`)
  - Dual Mode Database Driver: Automatically connects and seeds local MongoDB (`mongodb://localhost:27017/terrascope`), with an in-memory fallback engine so the application works out of the box without requiring external daemons.

---

## 🚀 Running the Project

### 1. Start the Backend API Server
```bash
cd server
npm start
# Server listens on http://localhost:5000
```

### 2. Start the Frontend Client
```bash
cd client
npm run dev
# Frontend is accessible at http://localhost:5173
```

### Or run from the workspace root:
```bash
# Terminal 1: Backend
npm run server

# Terminal 2: Frontend
npm run client
```

---

## 📡 REST API Reference

| Endpoint | Method | Query Parameters | Description |
|---|---|---|---|
| `/api/overview` | `GET` | `year` (e.g. `2022`) | Returns KPI stats (total emissions, coverage, per capita, YoY). |
| `/api/trends` | `GET` | `metric` (`total`, `perCapita`, `cumulative`) | Returns historical trend series from 1990 to 2022. |
| `/api/top10` | `GET` | `year` (e.g. `2022`) | Returns top 10 emitting countries sorted with % global share. |
| `/api/countries` | `GET` | `year` (e.g. `2022`) | Returns all country records for world map and analysis view. |
| `/api/compare` | `GET` | `countries`, `metric` | Multi-country comparison time series data. |
| `/api/insights` | `GET` | `year` (e.g. `2022`) | Curated insights and data conclusions. |
| `/api/health` | `GET` | - | Health status and MongoDB connection verification. |
