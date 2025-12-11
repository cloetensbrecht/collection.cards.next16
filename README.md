This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Icons

All icons are stored in the `/icons` directory and are saved as a **`.tsx`** file.  
Each icon is defined as a Typed React component using the following structure:

```tsx
import {SVGProps} from 'react'

export function Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props}>
      <path fill="currentColor" d="..." />
    </svg>
  )
}
```

**Credits:**

- Pokémon Pokedex icons:  
  A mix of svg-icons, coming from [repositorio.sbrauble.com](https://repositorio.sbrauble.com/arquivos/up/pokedex/*.svg), [Google Drive of dreamworld.svg](https://drive.google.com/drive/folders/1DD84zq6yiQI90CtPU60F-mlI-qiFJI3U) and [Veekum - Dream World Art](https://veekun.com/dex/downloads)

### Alinea

Within **Alinea**, icons are sourced exclusively from the **Google Material Icons** collection on [**icones.js.org**](https://icones.js.org/collection/ic?variant=Outline).  
We **only use the Outline variant** of these icons to ensure a consistent and cohesive visual style throughout the project.
