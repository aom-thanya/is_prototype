# KOL Management Platform - Prototype

This is a prototype web application designed for an Influencer (KOL) Management Agency. It streamlines the end-to-end workflow between different internal teams (Sales, Buyers, and Planners) to manage client briefs, discover influencers, and track campaign proposals.

## 🚀 Key Features

*   **Role-Based Workflows**: Seamlessly simulates the experience for Sales, Buyers, and Planners with tailored workspaces.
*   **Brief Management**: Track campaign briefs with SLA indicators, status tags (Draft, Brief, Dealsheet, Proposal), and assignment owners.
*   **Influencer Recommendations**: AI-powered loading states and a recommendation engine where Buyers can select and submit suitable creators to Planners.
*   **Client Database**: A dedicated section to manage client profiles, brand information, and contact details.
*   **Interactive UI**: Incorporates skeleton loading, customized pagination, confirmation modals, and responsive data tables.

## 🛠️ Tech Stack

*   **Framework**: [React.js](https://react.dev/) powered by [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Routing**: [React Router](https://reactrouter.com/)
*   **Icons**: [@untitledui/icons](https://untitledui.com/)
*   **Typography**: IBM Plex Sans Thai

## 📦 Getting Started

To run this project locally, follow these steps:

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start the development server**:
    ```bash
    npm run dev
    ```

3.  **Open in browser**:
    Navigate to `http://localhost:5173` (or the port specified in your terminal) to view the application.

## 🧩 Project Structure

*   `src/pages/` - Contains main application views (Dashboard, Brief Management, Workspaces).
*   `src/components/base/` - Reusable UI components (Buttons, Inputs, Modals, Badges).
*   `src/mockData/` - Local JSON data simulating backend APIs for briefs, clients, and influencers.
*   `src/App.jsx` - Main application routing and layout wrapper (Sidebar + Content area).

## 🌐 Deployment

This project is optimized for deployment on platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

### Vercel Deployment Notes
If you are deploying to Vercel, the build settings should be automatically detected:
*   **Framework Preset**: Vite
*   **Build Command**: `npm run build`
*   **Output Directory**: `dist`
*   **Install Command**: `npm install`

*(Note: We have strictly pinned some UI dependencies to ensure compatibility with Tailwind CSS v3 during the Vercel build process).*

---
*Note: This is a frontend prototype relying on mock data. There is no active backend database connection.*
