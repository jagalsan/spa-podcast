## Podcast WEBApp

A Podcast application built with React and Next.js that allows users to search, browse, and listen to various podcasts. This project demonstrates the usage of client-side data fetching, dynamic routing, and server-side rendering with Next.js.

### Features

-   Search podcasts by name or author.
-   Display detailed podcast information and episodes.
-   Listen to podcast episodes directly within the app.
-   Store podcast details in the client to avoid repeated API calls within a 24-hour window.
-   Different configurations for development and production environments.

## Getting Started

### Prerequisites

Ensure you have the following installed:

-   Node.js (>= 18.17.x)
-   npm or yarn

### Installation

Clone the repository:

```bash
    git clone https://github.com/yourusername/podcast-app.git
    cd podcast-app
```

### Install dependencies:

```bash
    npm install
    # or
    yarn install
```

### Environment Variables

Create a .env.local file in the root directory and add the following environment variables:

```bash
    NEXT_PUBLIC_PROXY_URL=https://api.allorigins.win/get
```

### Development

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production

To build the application for production, run:

```bash
    npm run build
    npm run start
    # or
    yarn build
    yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

