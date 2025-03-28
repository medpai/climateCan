# Canada Weather

A comprehensive web application for analyzing Canadian climate data across provinces and territories.

## Project Overview

Canada Weather provides visualization and analysis of climate data for all Canadian provinces and territories, focusing on:

- **Temperature Data**: Monthly average temperatures (°C) from 2021-2024
- **Pollution Data**: CO2 emissions (megatonnes) from 2021-2023
- **Precipitation Data**: Monthly precipitation levels (mm) from 2021-2023

The application offers interactive charts, comparative analysis tools, and detailed data tables to help users understand climate trends across Canada.

## Features

- Interactive data visualization with line charts and bar charts
- Provincial comparison of climate metrics
- Historical data analysis from 2021-2024
- Responsive design for desktop and mobile devices
- Comprehensive analysis of climate trends

## Technology Stack

- **Frontend**: Next.js, React, Chart.js
- **Backend**: Node.js
- **Database**: PostgreSQL with Sequelize ORM
- **Styling**: Tailwind CSS

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Database Setup

The application requires a PostgreSQL database. Set up your database connection in the `.env` file:

```
DATABASE_URL=postgresql://username:password@localhost:5432/canada_weather
```

## Project Structure

- `/app`: Next.js application code
  - `/components`: Reusable UI components
  - `/models`: Database models and schemas
  - `/services`: Data services for fetching and analyzing climate data
  - `/[feature]`: Feature-specific pages (temperature, pollution, precipitation)

## License

MIT
