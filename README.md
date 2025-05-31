# Valorant Skin Viewer

https://www.val-skins.com

Provides all skins and bundles available in-game through official video previews and assets.

> [!IMPORTANT]
>  Bundle data aquisition utilizes HenrikDev's unnoficial valorant api. An API key is required for the bundle page and is available through their official [discord](https://docs.henrikdev.xyz/authentication-and-authorization).
> HenrikDev API official [documentation](https://docs.henrikdev.xyz/authentication-and-authorization)

# Usage

## Prerequisites

- Node.js (v16 or later)
- npm or Yarn

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/Canyon-C/valorant-skin-viewer.git
   cd your-repo
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Environment Variables

Create a `.env` file in the project root:

```env
API_KEY=YOUR_HENRIKDEV_VALORANT_API_KEY
```

## Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
