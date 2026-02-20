# 🚀 Quick Start Guide - Animal Shelter App

## Prerequisites
- ✅ Backend server created and ready
- ✅ Frontend React app created
- ✅ All dependencies installed

## Start the Application

### Terminal 1: Start Backend
```bash
cd "c:\Users\sanke\OneDrive\Documents\CODING\Projects\Animal Shelter FULLSTACK\server"
npm run dev
```
**Expected Output**: `🚀 Server running on port 5000`

### Terminal 2: Start Frontend  
```bash
cd "c:\Users\sanke\OneDrive\Documents\CODING\Projects\Animal Shelter FULLSTACK\client"
npm start
```
**Expected Output**: Opens browser at `http://localhost:3000`

## First Time Setup

### 1. Create Database Tables
Make sure you've run the SQL script from `db.sql` to create all necessary tables.

### 2. Register Your First Admin User
1. Open browser to `http://localhost:3000`
2. Click "Register" button
3. Fill in:
   - **Name**: Your name
   - **Email**: your.email@example.com
   - **Role**: Select "Admin"
   - **Password**: Your secure password (min 6 characters)
   - **Confirm Password**: Same password
4. Click "Register"
5. You'll be automatically logged in and redirected to Admin Dashboard

### 3. Add Some Sample Data

#### Add a Staff Member
1. From sidebar, click "Staff" (Admin only)
2. Or register another user with "Staff" role

#### Add an Adopter
1. From sidebar, click "Adopters"
2. Click "Add Adopter" button
3. Fill in:
   - Name: "John Doe"
   - Address: "123 Main St, City"
   - Phone: "555-1234" (optional)
4. Click "Add Adopter"

#### Add an Animal
1. From sidebar, click "Animals"
2. Click "Add Animal" button
3. Fill in:
   - Name: "Buddy"
   - Age: 3
   - Breed: "Golden Retriever"
   - Admission Date: Select date
   - Adopter: Select from dropdown (optional)
   - Staff: Select from dropdown (optional)
4. Click "Add Animal"

## Test Different User Roles

### Test as Admin
- ✅ Should see full dashboard with statistics
- ✅ Can access Animals, Adopters, Staff, Donations, Medical Records
- ✅ Sidebar shows all menu items

### Test as Staff
1. Logout (click user icon → Logout)
2. Register new user with "Staff" role
3. Login with staff credentials
4. ✅ Should see limited dashboard
5. ✅ Can access Animals and Adopters
6. ✅ No access to Staff, Donations, Medical Records

### Test as Public
1. Logout completely
2. Go to home page (`http://localhost:3000`)
3. ✅ Should see available animals
4. ✅ Can browse without login
5. ✅ Click "Adopt Me" redirects to login

## Application URLs

| Page | URL | Auth Required |
|------|-----|---------------|
| Home (Public Animals) | http://localhost:3000 | No |
| Login | http://localhost:3000/login | No |
| Register | http://localhost:3000/register | No |
| Dashboard | http://localhost:3000/dashboard | Yes |
| Animals List | http://localhost:3000/animals | Yes |
| Add Animal | http://localhost:3000/animals/new | Yes |
| Adopters List | http://localhost:3000/adopters | Yes |
| Add Adopter | http://localhost:3000/adopters/new | Yes |

## Features to Test

### Authentication
- ✅ Register new user
- ✅ Login with credentials
- ✅ Logout
- ✅ Token persists on page reload
- ✅ Protected routes redirect to login
- ✅ Role-based dashboard routing

### Animal Management
- ✅ View all animals
- ✅ Add new animal
- ✅ See adoption status (Available/Adopted)
- ✅ Link animal to adopter
- ✅ Link animal to staff

### Adopter Management
- ✅ View all adopters
- ✅ Add new adopter
- ✅ Add phone number with adopter
- ✅ Delete adopter

### Dashboard Features
- ✅ Admin sees statistics
- ✅ Quick action buttons
- ✅ Role-based content

### Navigation
- ✅ Navbar user menu
- ✅ Sidebar drawer (click menu icon)
- ✅ Role-based sidebar items
- ✅ Breadcrumb navigation

## Troubleshooting

### Frontend won't start
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm start
```

### Backend connection error
- Make sure backend is running on port 5000
- Check console for CORS errors
- Verify `services/api.js` has correct baseURL

### 401 Unauthorized errors
- Clear browser localStorage
- Logout and login again
- Check JWT_SECRET in backend `.env` file

### Animals/Adopters not loading
- Open browser DevTools (F12)
- Check Network tab for API calls
- Verify backend database has tables created
- Check Console tab for JavaScript errors

## Development Tips

### View Current User
Open browser console:
```javascript
JSON.parse(localStorage.getItem('user'))
```

### View JWT Token
```javascript
localStorage.getItem('token')
```

### Clear All Data
```javascript
localStorage.clear()
```

### Monitor API Calls
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "XHR" or "Fetch"
4. Perform actions in app
5. Click on requests to see details

## What's Next?

### Immediate Testing
1. Register admin user ✓
2. Add 2-3 animals ✓
3. Add 2-3 adopters ✓
4. Test adoption workflow ✓
5. Test role-based access ✓

### Future Enhancements
1. Add animal images
2. Implement medical records UI
3. Add search and filter
4. Create adoption request workflow
5. Add staff management
6. Implement donations tracking
7. Add email notifications

## Success Criteria

✅ Backend running on port 5000
✅ Frontend running on port 3000
✅ Can register and login
✅ Can add animals
✅ Can add adopters
✅ Role-based dashboards working
✅ Navigation working
✅ API calls successful

## Support Files Created

- 📄 `FRONTEND_GUIDE.md` - Detailed frontend documentation
- 📄 `IMPLEMENTATION_SUMMARY.md` - What was built
- 📄 `QUICK_START.md` - This file

## Project Structure

```
Animal Shelter FULLSTACK/
├── server/              # Backend (Node.js + Express)
│   ├── config/          # DB and Passport config
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth middleware
│   ├── routes/          # API routes
│   └── index.js         # Server entry point
│
├── client/              # Frontend (React)
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # Reusable components
│       ├── pages/       # Page components
│       ├── context/     # React contexts
│       ├── services/    # API services
│       └── App.js       # Main app
│
└── db.sql               # Database schema

```

## Happy Coding! 🎉

Your Animal Shelter management system is ready to use!

For detailed documentation, see:
- Backend: `server/API_Docs.md`
- Frontend: `FRONTEND_GUIDE.md`
- Summary: `IMPLEMENTATION_SUMMARY.md`
