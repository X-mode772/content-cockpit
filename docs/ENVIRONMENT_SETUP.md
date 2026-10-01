# Environment Configuration - Content Cockpit

## Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Content Cockpit
```

## Backend (.env.local)

### Database
```env
DATABASE_URL=postgresql://user:password@localhost:5432/content_cockpit
```

### Authentication
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### API
```env
PORT=3001
NODE_ENV=development
```

## Setup Database

### 1. PostgreSQL installieren

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Database erstellen

```bash
psql -U postgres

CREATE DATABASE content_cockpit;
\q
```

### 3. Prisma Migrations durchführen

```bash
cd apps/api
npm run prisma:migrate:dev -- --name init
```

### 4. Starter-Daten laden (optional)

```bash
npm run prisma:seed
```

## Running the Application

### Terminal 1: Backend
```bash
cd apps/api
npm install
npm run dev
```

### Terminal 2: Frontend
```bash
cd apps/web
npm install
npm run dev
```

Die App ist dann unter http://localhost:3000 erreichbar.

## Troubleshooting

### "Connection refused" bei Datenbank
- Prüfen Sie, dass PostgreSQL läuft: `sudo systemctl status postgresql`
- Starten Sie PostgreSQL neu: `sudo systemctl restart postgresql`

### "CORS Error"
- Stellen Sie sicher, dass das Backend auf Port 3001 läuft
- Überprüfen Sie `NEXT_PUBLIC_API_URL` im Frontend

### JWT Token Fehler
- Ändern Sie `JWT_SECRET` in `.env.local`
- Starten Sie beide Services neu
