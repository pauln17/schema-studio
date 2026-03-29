# Schema Studio

Schema Studio is a browser-based tool for designing and exploring database schemas as interactive diagrams. Instead of working only in SQL, you can create tables, edit columns, and manage relationships visually on a canvas.

## Overview

Start from a blank canvas or import PostgreSQL-style SQL. Schema Studio turns your schema into a visual diagram where you can move tables around, inspect structure, and make changes directly.

You can edit:

- tables and columns
- data types
- primary keys
- foreign keys and relationships
- indexes
- checks
- enums

## Demo

The demo is hosted on Render. Because it runs on a free tier, the app may take 30 seconds or more to load after being idle. If it seems stuck, wait a moment and refresh.

[schema-studio.onrender.com](https://schema-studio.onrender.com)

## Features

- **Visual Schema Editor**  
  Build and edit database structure directly on a canvas.

- **Blank Canvas or SQL Import**  
  Start from scratch or paste or upload PostgreSQL-style SQL to generate a diagram automatically.

- **Server-Side Rendering**  
  Render and load the app through the server for a smoother browser experience.

- **Shareable Editor Links**  
  Each saved schema gets a private editor URL with a secret token. Anyone with the link can open and edit the same schema.

- **Expiring Access Links**  
  Share links expire after seven days. You can regenerate a link at any time, which creates a new URL and immediately invalidates the old one.

- **Live Collaboration**  
  Multiple people using the same editor link can see updates sync in real time.

## Use Cases

Schema Studio is useful for:

- planning a new database design
- visualizing an existing schema from SQL
- reviewing structure with teammates
- exploring table relationships more quickly

## Tech Stack

**Frontend**
- Next.js
- React
- TypeScript
- Tailwind CSS
- React Flow

**Backend**
- Express
- Prisma
- PostgreSQL

## Who It's For

Schema Studio is for developers, students, and teams who want a faster, more visual way to design schemas, review database structure, or understand an existing `.sql` file.
