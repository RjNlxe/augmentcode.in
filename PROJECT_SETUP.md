# Augment Code Community Project Platform

A community project sharing platform built with Next.js 15, React 19, TypeScript, and Supabase.

## Features

✅ **Database Schema**: Complete Supabase setup with RLS policies
✅ **Authentication**: Simple name/X profile authentication with 30-day sessions
✅ **Project Management**: CRUD operations with validation (website OR GitHub required)
✅ **Projects Listing**: Filtering, search, grid/list views
✅ **Project Details**: Comments, hearts/likes, social sharing
✅ **User Dashboard**: My Projects with create/edit/delete functionality
✅ **Admin Dashboard**: Approval workflow with pending/approved/all tabs
✅ **Navigation**: Responsive navigation with user menu
✅ **Security**: Row Level Security policies and session management

## Setup Instructions

### 1. Environment Configuration

Update `.env.local` with your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://jszbotjwtrmguhqaplbx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here

# Admin Configuration
ADMIN_EMAIL=admin@augmentcode.in
ADMIN_PASSWORD=SecureAdminPassword2025!

# Session Configuration
SESSION_SECRET=your_random_session_secret_here
SESSION_DURATION_DAYS=30
```

### 2. Database Setup

The database schema has been created with these tables:
- `users` - User profiles with admin flag
- `sessions` - 30-day session management
- `projects` - Project submissions with approval status
- `comments` - Project discussions
- `hearts` - Project likes/hearts

Admin user `admin@augmentcode.in` has been created.

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Run Development Server

```bash
pnpm dev
```

## Page Structure

- `/` - Homepage with navigation to projects
- `/projects` - Public projects listing (approved only)
- `/projects/[id]` - Individual project pages with comments
- `/my-projects` - User dashboard (requires auth)
- `/admin` - Admin dashboard (admin only)
- `/login` - Authentication page

## Key Components

- `Navigation` - Responsive navigation with user menu
- `ProjectCard` - Project display in grid/list modes
- `ProjectForm` - Create/edit project form
- `CommentSection` - Comments with user attribution
- `LoginForm` - Simple authentication form

## API Routes

- `POST /api/auth/login` - User authentication
- `POST /api/auth/logout` - Sign out
- `GET /api/auth/me` - Current user info
- `GET /api/projects` - List projects with filters
- `POST /api/projects` - Create project
- `GET /api/projects/[id]` - Get project details
- `PUT /api/projects/[id]` - Update project/status
- `DELETE /api/projects/[id]` - Delete project
- `GET /api/projects/[id]/comments` - Get comments
- `POST /api/projects/[id]/comments` - Add comment
- `POST /api/projects/[id]/hearts` - Add heart
- `DELETE /api/projects/[id]/hearts` - Remove heart

## Security Features

- Row Level Security (RLS) policies
- Session-based authentication
- Admin-only routes protection
- Input validation and sanitization
- CSRF protection via same-origin policy

## Admin Workflow

1. Users submit projects (status: pending)
2. Admin reviews in `/admin` dashboard
3. Admin can approve, reject, suspend, or delete
4. Only approved projects appear in public listing
5. Users can edit their own projects
6. Admin can manage all projects

## Testing

To test the platform:

1. **User Flow**:
   - Visit `/login` and sign in with name
   - Go to `/my-projects` and create a project
   - View project in pending state

2. **Admin Flow**:
   - Sign in as admin with `admin@augmentcode.in`
   - Go to `/admin` to see pending projects
   - Approve a project
   - Verify it appears in `/projects`

3. **Public Flow**:
   - Browse `/projects` without authentication
   - View project details and comments
   - Sign in to add comments and hearts

## Deployment

The platform is ready for deployment on Vercel with the existing configuration. Ensure environment variables are set in your deployment environment.

## Architecture Principles

Following Linus Torvalds' philosophy:
- **Simple data structures** - Clean relational model
- **No special cases** - Consistent validation and error handling
- **Pragmatic solutions** - Real-world functionality over theoretical perfection
- **Minimal complexity** - Straightforward code with clear purpose
