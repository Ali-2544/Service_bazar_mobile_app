# Admin Dashboard Access Guide

## How to Access the Admin Dashboard

### 1. Login Process
1. Open the app - you'll be redirected to the login screen
2. Select "Admin" as your role
3. Use the following credentials:
   - **Email**: `admin@services.com`
   - **Password**: `admin123`

### 2. Quick Login (Demo)
- Click on the "Admin" quick login button on the login screen
- This will automatically fill in the admin credentials

### 3. Admin Dashboard Features

Once logged in as admin, you'll have access to 4 main sections:

#### 🔧 Services Management (`/admin`)
- Create new service categories
- Edit existing services
- Activate/deactivate services
- View service statistics
- Delete services

#### 👥 User Management (`/admin/users`)
- Approve/reject service providers
- Approve/reject customers
- View user profiles and documents
- Filter users by type and status
- View user statistics

#### 📊 Analytics (`/admin/analytics`)
- Daily, weekly, monthly, and yearly analytics
- User growth metrics
- Booking statistics
- Revenue breakdown
- Provider activity metrics
- Key performance indicators

#### ⚙️ Settings (`/admin/settings`)
- Profile management
- Password change
- Notification preferences
- Security settings
- Two-factor authentication
- Session timeout settings

### 4. Navigation
- The admin dashboard uses a bottom tab navigation
- Each tab represents a different admin function
- All screens are fully functional with mock data

### 5. Logout
- Go to Settings tab
- Click the "Logout" button
- Confirm logout to return to login screen

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@services.com | admin123 |
| Customer | customer@email.com | customer123 |
| Provider | provider@email.com | provider123 |

## Features Overview

### Services Management
- ✅ Add/Edit/Delete services
- ✅ Service status management
- ✅ Color-coded service categories
- ✅ Service statistics

### User Management
- ✅ User approval workflow
- ✅ Role-based filtering
- ✅ User profile viewing
- ✅ Document verification
- ✅ Status management

### Analytics Dashboard
- ✅ Time period selection (Daily/Weekly/Monthly/Yearly)
- ✅ Key metrics visualization
- ✅ User growth charts
- ✅ Revenue breakdown
- ✅ Booking status tracking
- ✅ Provider activity metrics

### Settings & Profile
- ✅ Profile information management
- ✅ Password change functionality
- ✅ Notification preferences
- ✅ Security settings
- ✅ Two-factor authentication toggle
- ✅ Session management

## Technical Notes

- Built with React Native and Expo
- Uses Expo Router for navigation
- Implements authentication context for state management
- Responsive design for different screen sizes
- Mock data for demonstration purposes
- Ready for backend integration
