# Esmeralda En Linea Dashboard

## Description
This project is a web-based dashboard for managing an e-commerce platform. It provides administrative functionalities to oversee products, categories, and other aspects of the online store.

## Features
- **Dashboard:** Overview of key metrics and activities.
- **Product Management:** Add, edit, and remove products.
- **Category Management:** Organize products into categories and subcategories.
- **Authentication:** Secure login for administrators.
- **Settings Management:** Configure application settings.
- **Unit Management:** Manage product units.
- **Tag Management:** Manage product tags.

## Getting Started

### Prerequisites
- Node.js (v20 or higher recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd esmeralda-en-linea-dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the application
To start the development server:
```bash
npm run dev
```
This will typically start the application on `http://localhost:3000`.

## Technologies Used
- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI (based on Radix UI)
- **State Management/Data Fetching:** (Likely React Context/Hooks, SWR or TanStack Query - needs further confirmation if critical)
- **API Communication:** Axios
- **Linting:** ESLint
- **Package Manager:** npm
- **Deployment (potentially):** Docker (inferred from Dockerfile and docker-compose.yaml)

## Building for Production
To build the application for production:
```bash
npm run build
```

## Starting the Production Server
To start the production server after building:
```bash
npm run start
```
