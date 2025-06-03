# SHU-ProjectWiseHub-Project

Here are the complete steps to run the SHU ProjectWise Hub project locally:

## 📋 **Prerequisites**

Make sure you have these installed on your computer:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager (comes with Node.js)
- A code editor like **VS Code** (recommended)
  

## 🚀 **Step-by-Step Setup**

### 1. **Extract and Navigate to Project**
```
# Extract the downloaded zip file
# Navigate to the project folder in terminal/command prompt
cd shu-projectwise-hub
```

## 2. **Enable PowerShell Scripts (Recommended)**

**Run PowerShell as Administrator:**

1. Press `Windows + X` and select "Windows PowerShell (Admin)" or "Terminal (Admin)"
2. Run this command:
3. You can even open the "Open in Integrated Terminal" by right clicking in VS Code project window. and execute the below commands.

```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 3. **Install Dependencies**
```
# Install all required packages
npm install --legacy-peer-deps

# OR if you prefer yarn
yarn install
```
This will bypass the dependency resolution conflict and install the packages.


## 4. **Fix the Dependency Conflict First**

The issue is with `react-day-picker` and `date-fns` version mismatch. Let's resolve this:

```
# Remove the problematic packages first
npm uninstall react-day-picker date-fns

# Install compatible versions
npm install date-fns@^3.6.0 --legacy-peer-deps
```

### 5. **Install Additional Required Packages**

Since this is a Next.js project with shadcn/ui, run these commands:
```
npm install @radix-ui/react-tabs @radix-ui/react-select @radix-ui/react-progress --legacy-peer-deps
npm install @radix-ui/react-alert-dialog @radix-ui/react-dropdown-menu --legacy-peer-deps
npm install lucide-react class-variance-authority clsx tailwind-merge --legacy-peer-deps
npm install @radix-ui/react-slot --legacy-peer-deps
npm install -D @types/node @types/react @types/react-dom --legacy-peer-deps
```


### 6. **Run the Development Server**

```
# Start the development server
npm run dev

# OR with yarn
yarn dev
```

### 7. **Access the Application**

Open your browser and go to:

```
http://localhost:3000
```

## 🔑 **Demo Login Credentials**

- **Student:** [student@student.sacredheart.edu](mailto:student@student.sacredheart.edu)
- **Faculty:** [faculty@sacredheart.edu](mailto:faculty@sacredheart.edu)
- **Admin:** [admin@sacredheart.edu](mailto:admin@sacredheart.edu)



## 🛠️ **Troubleshooting**

### If you get dependency errors:

```
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### If TypeScript errors occur:

```
# Install missing type definitions
npm install -D typescript @types/react @types/node
```

### If shadcn components are missing:

```
# Reinstall shadcn/ui
npx shadcn@latest init --force
```

### If the build fails:

```
# Try building the project
npm run build
```

📁 **Project Structure**

```
shu-projectwise-hub/
├── app/
│   ├── layout.tsx                 # Root layout with metadata template
│   ├── page.tsx                   # Main login page (/)
│   ├── globals.css                # Global styles
│   │
│   ├── student/
│   │   ├── dashboard/
│   │   │   ├── page.tsx           # Server component with metadata
│   │   │   ├── client.tsx         # Client component with dashboard UI
│   │   │   └── loading.tsx        # Loading state component
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx           # Student login page
│   │   │
│   │   └── submit/
│   │       ├── page.tsx           # Server component with metadata
│   │       └── client.tsx         # Client component with submission form
│   │
│   ├── faculty/
│   │   └── dashboard/
│   │       ├── page.tsx           # Server component with metadata
│   │       ├── client.tsx         # Client component with dashboard UI
│   │       ├── FacultyDashboardClientComponent.tsx  # Alternative client component
│   │       └── loading.tsx        # Loading state component
│   │
│   └── admin/
│       └── dashboard/
│           └── page.tsx           # Admin dashboard page
│
├── components/
│   ├── ui/                        # shadcn/ui components
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── progress.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   └── ... (other UI components)
│   │
│   └── theme-provider.tsx         # Theme provider component
│
├── lib/
│   └── utils.ts                   # Utility functions (cn function for class merging)
│
├── hooks/
│   ├── use-mobile.tsx             # Hook for detecting mobile devices
│   └── use-toast.ts               # Toast notification hook
│
├── public/                        # Static assets
│   └── ...
│
├── next.config.mjs                # Next.js configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Project dependencies and scripts
```

Once you complete these steps, SHU ProjectWise Hub should be running locally at `http://localhost:3000`! 🎉

## Key Architecture Decisions

### 1. **Next.js App Router Structure**

- Uses the new App Router with file-based routing
- Each route has a `page.tsx` file that exports metadata and renders client components
- Client components are separated into `client.tsx` files to avoid hydration issues


### 2. **Role-Based Routing**
```
/                    → Main login page (role selection)
/student/dashboard   → Student dashboard
/student/submit      → Project submission form
/faculty/dashboard   → Faculty research portal
/admin/dashboard     → Administrative panel
```
### 3. **Component Organization**

- **Server Components**: Handle metadata and initial rendering
- **Client Components**: Handle interactivity and state management
- **UI Components**: Reusable shadcn/ui components in `/components/ui/`


### 4. **Metadata Management**

Each page properly sets its title using Next.js metadata API:
```
export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description",
}
```
### 5. **State Management**

- Uses React's built-in `useState` and `useEffect` hooks
- localStorage for simple authentication state
- No external state management library needed for this demo


### 6. **Styling**

- Tailwind CSS for utility-first styling
- shadcn/ui for consistent component design
- Custom red color scheme matching Sacred Heart University branding


### 7. **Authentication Flow**
```
Login Page → Role Selection → Dashboard
     ↓
localStorage stores:
- userRole: "student" | "faculty" | "admin"
- userEmail: user's email address
```

### 8. **Features by Role**

**Students:**

- Project submission with multi-step form
- Dashboard with project tracking
- Notifications and analytics


**Faculty:**

- Advanced project search and filtering
- Bookmark and comment on projects
- Integration with course management


**Admin:**

- Submission queue management
- User management
- Content moderation
- System health monitoring


This structure provides a scalable foundation for a university project repository system with clear separation of concerns and role-based access control.
