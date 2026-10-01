# Getting Started - Content Cockpit

## 🚀 Quick Start

### 1. Installation

```bash
git clone https://github.com/X-mode772/content-cockpit.git
cd content-cockpit
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

### 3. Run Development Server

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 📱 Features (MVP v1)

### Landing Page
- ✅ Hero section mit Callout
- ✅ Form zur Kampagnen-Generierung
- ✅ Real-time campaign preview
- ✅ Link zum Dashboard

### Dashboard
- ✅ Kampagnen-Übersicht
- ✅ Kampagnen-Details anschauen
- ✅ Posts preview
- ✅ Campaign export (TXT)
- ✅ Campaign delete
- ✅ LocalStorage persistence

### API (NestJS)
- ✅ POST `/api/campaigns/generate` - Neue Kampagne erstellen
- ✅ GET `/api/campaigns` - Alle Kampagnen abrufen
- ✅ GET `/api/campaigns/:id` - Eine Kampagne abrufen
- ✅ PUT `/api/campaigns/:id` - Kampagne aktualisieren
- ✅ DELETE `/api/campaigns/:id` - Kampagne löschen

## 📊 Project Structure

```
content-cockpit/
├── apps/
│   ├── web/                    # Next.js Frontend
│   │   ├── app/
│   │   │   ├── page.tsx       # Landing Page
│   │   │   ├── dashboard/     # Dashboard
│   │   │   └── layout.tsx
│   │   └── components/
│   │       └── landing-page.tsx
│   └── api/                    # NestJS Backend
│       └── src/
│           ├── campaigns/
│           │   ├── campaigns.controller.ts
│           │   ├── campaigns.service.ts
│           │   ├── campaigns.module.ts
│           │   └── dto/
│           ├── app.module.ts
│           └── main.ts
├── packages/
│   └── shared/                 # Shared types
│       └── types.ts
└── docs/
    ├── SYSTEM_DESIGN.md
    ├── API.md
    └── DATA_MODELS.md
```

## 🔄 Current Flow

### Campaign Generation
1. User fills form on landing page
2. Frontend sends request to `/api/campaigns/generate`
3. Backend generates insights + 7 posts (multi-platform)
4. Frontend displays preview + saves to localStorage
5. User can view all campaigns in dashboard

## 🎯 Next Steps (Phase 2)

### Phase 2: Database & Auth
- [ ] PostgreSQL + Prisma ORM
- [ ] User authentication (NextAuth.js)
- [ ] Database schema for campaigns/posts
- [ ] User sessions & permissions

### Phase 3: Website Analysis
- [ ] Website crawler (Puppeteer)
- [ ] Meta tag extraction
- [ ] Content analysis
- [ ] Brand tone detection

### Phase 4: AI Integration
- [ ] OpenAI GPT-4 integration
- [ ] Dynamic post generation
- [ ] Hashtag suggestions
- [ ] Content optimization

### Phase 5: Social Publishing
- [ ] Meta Graph API integration
- [ ] Twitter/X API
- [ ] LinkedIn API
- [ ] One-click publishing
- [ ] Schedule posts

## 🛠️ Development

### Run only Frontend
```bash
npm run dev:web
```

### Run only Backend
```bash
npm run dev:api
```

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

## 📝 API Examples

### Generate Campaign
```bash
curl -X POST http://localhost:3001/api/campaigns/generate \
  -H "Content-Type: application/json" \
  -d '{
    "websiteUrl": "https://example.com",
    "brandName": "John Doe",
    "companyName": "My Company",
    "email": "john@example.com",
    "platforms": ["Instagram", "LinkedIn", "Facebook", "X / Twitter"]
  }'
```

### Get All Campaigns
```bash
curl http://localhost:3001/api/campaigns
```

### Get Campaign by ID
```bash
curl http://localhost:3001/api/campaigns/campaign-1234567890
```

## 🚨 Troubleshooting

### Port already in use
```bash
# Find and kill process on port 3000 or 3001
lsof -i :3000
kill -9 <PID>
```

### CORS errors
Make sure backend is running on http://localhost:3001 and frontend on http://localhost:3000

### API not responding
Check that both services are running:
```bash
# Terminal 1
npm run dev:web

# Terminal 2
npm run dev:api
```

## 📚 Documentation

- [System Design](./docs/SYSTEM_DESIGN.md)
- [API Reference](./docs/API.md)
- [Data Models](./docs/DATA_MODELS.md)
- [Setup Guide](./docs/SETUP_GUIDE.md)
