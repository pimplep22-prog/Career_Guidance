# Career Guidance Platform

A comprehensive, modern, AI-powered Career Guidance Website that helps students and graduates make informed career, education, exam, and job decisions.

## Features

### Core Features
- 🤖 **AI-Powered Career Recommendations** based on interests, aptitude, personality, education, and skills
- 🧪 **Personality, Interest & Aptitude Tests** with detailed analysis
- 🗺️ **Career Roadmaps** and Learning Paths
- 🎓 **Course/Degree Information** and Comparison Tools
- 🏫 **College Finder** with advanced search and filters
- 📝 **Competitive Exam Information** with syllabus, eligibility, and important dates
- 💼 **Job & Internship Finder** with real-time opportunities
- 🏆 **Scholarship Finder** for financial aid
- 📚 **Free Learning Resources** and certifications
- 💬 **AI Career Chatbot** for instant guidance
- 📊 **Personalized Dashboard** with recommendations and progress tracking
- 🌍 **Multi-language Support**: English, Marathi, Hindi, Kannada, Telugu, Tamil, Gujarati

### User Features
- User authentication and profile management
- Bookmarks and saved items
- Progress tracking
- Notifications and alerts
- Feedback and rating system
- Report incorrect information

### Admin Features
- Complete content management (CRUD operations)
- User management
- Analytics dashboard
- Bulk operations
- Data validation

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: Prisma ORM with SQLite (can be switched to PostgreSQL/MySQL)
- **UI Components**: shadcn/ui, Lucide Icons
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **Theme**: next-themes (Dark/Light mode)
- **AI**: Custom recommendation engine (can integrate with OpenAI/Anthropic)

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

## Installation

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set Up Environment Variables

The `.env.local` file is already created with default values:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
AI_API_KEY=""
AI_MODEL="gpt-3.5-turbo"
```

**Important**: Change `NEXTAUTH_SECRET` in production:
```bash
# Generate a secure secret
openssl rand -base64 32
```

### 3. Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database with sample data
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Default Login Credentials

After seeding the database, you can use these credentials:

### Admin Account
- **Email**: admin@careerguide.com
- **Password**: admin123

### Student Account
- **Email**: student@example.com
- **Password**: student123

**Important**: Change these passwords in production!

## Project Structure

```
├── app/                      # Next.js 14 App Router
│   ├── api/                 # API routes
│   │   └── auth/           # Authentication endpoints
│   ├── auth/               # Auth pages (login, register)
│   ├── careers/            # Career explorer pages
│   ├── colleges/           # College finder pages
│   ├── dashboard/          # User dashboard
│   ├── admin/              # Admin dashboard
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/              # Reusable React components
│   ├── ui/                 # shadcn/ui components
│   ├── navbar.tsx          # Main navigation
│   └── theme-provider.tsx  # Theme provider
├── lib/                     # Utility libraries
│   ├── ai/                 # AI recommendation engine
│   ├── auth.ts             # NextAuth configuration
│   ├── prisma.ts           # Prisma client
│   └── utils.ts            # Helper functions
├── prisma/                  # Database
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data
├── types/                   # TypeScript type definitions
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Database Schema

The platform includes comprehensive models:

- **User**: User accounts with roles (STUDENT, ADMIN)
- **Career**: Career information with detailed data
- **Course**: Academic courses and programs
- **College**: Educational institutions
- **Exam**: Competitive exams information
- **Job**: Job listings
- **Internship**: Internship opportunities
- **Scholarship**: Scholarship programs
- **LearningResource**: Free courses and materials
- **Test**: Assessment tests (Personality, Interest, Aptitude)
- **TestResult**: User test results
- **Recommendation**: AI-generated career recommendations
- **Bookmark**: User saved items
- **UserProgress**: Progress tracking
- **Notification**: User notifications
- **Feedback**: User feedback
- **Report**: Content issue reports

## Features Guide

### 1. Career Explorer
- Browse 500+ careers by category
- Detailed career information including salary, skills, job roles
- AI-powered recommendations based on user profile

### 2. AI Recommendations
The platform uses a sophisticated matching algorithm that considers:
- User interests and personality traits
- Current skills and aptitudes
- Education level and background
- Market demand and future trends

### 3. Assessment Tests
- Personality Test: Discover your personality type
- Interest Test: Identify your career interests
- Aptitude Test: Evaluate your natural abilities

### 4. Career Roadmaps
- Step-by-step career paths
- Required skills and certifications
- Learning resources and timelines
- Skill gap analysis

### 5. College Finder
- Search by location, type, courses
- Compare colleges side-by-side
- Admission requirements and cutoffs
- Placement statistics

### 6. Exam Information
- Competitive exam details
- Eligibility and syllabus
- Important dates and notifications
- Preparation resources

### 7. Job & Internship Finder
- Latest opportunities
- Filter by location, experience, salary
- Direct apply links
- Personalized recommendations

### 8. AI Chatbot
- 24/7 career guidance
- Context-aware responses
- Integration with career database
- Multi-language support

## API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Careers
- `GET /api/careers` - List careers
- `GET /api/careers/[id]` - Get career details
- `POST /api/careers` - Create career (Admin)
- `PUT /api/careers/[id]` - Update career (Admin)
- `DELETE /api/careers/[id]` - Delete career (Admin)

### Recommendations
- `GET /api/recommendations` - Get user recommendations
- `POST /api/recommendations/generate` - Generate new recommendations

### Tests
- `GET /api/tests` - List available tests
- `POST /api/tests/submit` - Submit test answers
- `GET /api/tests/results` - Get user test results

*Similar patterns for colleges, courses, exams, jobs, internships, scholarships*

## Development

### Database Management

```bash
# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma db push --force-reset

# Create migration (when switching from SQLite)
npx prisma migrate dev --name init
```

### Adding New Features

1. Update Prisma schema if needed
2. Create API routes in `app/api/`
3. Create React components
4. Add pages in `app/`
5. Update navigation in `components/navbar.tsx`

### Switching Database

To use PostgreSQL or MySQL instead of SQLite:

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql" // or "mysql"
  url      = env("DATABASE_URL")
}
```

2. Update DATABASE_URL in `.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/careerguide"
```

3. Run migrations:
```bash
npx prisma migrate dev --name init
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-secure-secret-key"
AI_API_KEY="your-ai-api-key" # Optional
```

## AI Integration

The platform includes a rule-based AI recommendation engine. To enhance with actual AI models:

### Option 1: OpenAI Integration

1. Get API key from [OpenAI](https://platform.openai.com/)
2. Add to `.env.local`:
```env
AI_API_KEY="sk-..."
AI_MODEL="gpt-4"
```
3. Update `lib/ai/recommendation-engine.ts` to use OpenAI API

### Option 2: Anthropic Claude

1. Get API key from [Anthropic](https://www.anthropic.com/)
2. Use Claude API for chatbot and recommendations

## Multi-language Support

The platform is ready for i18n using `next-intl`. To add translations:

1. Create translation files in `messages/[locale].json`
2. Configure supported locales in next.config.js
3. Use translation hooks in components

## Performance Optimization

- **Static Generation**: Career pages are statically generated
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **API Caching**: Implement with React Query or SWR
- **Database Indexing**: Already configured in Prisma schema

## Security

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Role-based access control (RBAC)
- Input validation with Zod
- XSS protection
- CSRF protection (NextAuth)

## Testing

```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for educational or commercial purposes.

## Support

For issues and questions:
- Create an issue on GitHub
- Email: admin@careerguide.com

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced AI using GPT-4/Claude
- [ ] Video counseling feature
- [ ] College application tracking
- [ ] Scholarship application management
- [ ] Career aptitude games
- [ ] Virtual career fairs
- [ ] Mentor-mentee matching
- [ ] Resume builder
- [ ] Interview simulator

## Acknowledgments

- Next.js team for the amazing framework
- shadcn for the beautiful UI components
- Prisma for the excellent ORM
- All open-source contributors

---

Built with ❤️ to empower the next generation of students.


## Team Contributions

- Pooja Pimple – Team Leader & Backend Developer
- Ankita Bajgire – Database & Content Management
- Namrata Bhujbal – Frontend Developer
- Priti Bhusagre – Resercher & Documentation
- Kaveri Goundgave – UI/UX Designer & Content Researcher
