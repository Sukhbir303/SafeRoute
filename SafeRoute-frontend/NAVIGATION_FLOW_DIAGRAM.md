# 🎯 SafeRoute Navigation Flow Diagram

## Complete App Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         APP LAUNCH                               │
│                              ↓                                   │
│                    Check AsyncStorage                            │
│               (@saferoute_auth, @saferoute_user)                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────┴─────────┐
                    │                   │
            ┌───────▼────────┐  ┌──────▼────────┐
            │  isLoading?    │  │ Authenticated?│
            │     YES        │  │      NO       │
            └───────┬────────┘  └───────┬───────┘
                    │                   │
            ┌───────▼────────┐         │
            │ Loading Screen │         │
            └────────────────┘         │
                                       │
        ┌──────────────────────────────┴─────────────────────┐
        │                                                      │
┌───────▼──────────┐                              ┌───────────▼────────┐
│  Authenticated?  │                              │   needsProfile?    │
│       YES        │                              │        YES         │
└───────┬──────────┘                              └────────┬───────────┘
        │                                                  │
        │                                         ┌────────▼───────────┐
        │                                         │ ProfileFormScreen  │
        │                                         │  Complete Profile  │
        │                                         └────────┬───────────┘
        │                                                  │
        │                                         ┌────────▼───────────┐
        │                                         │ completeProfile()  │
        │                                         │ isAuthenticated =  │
        │                                         │      true          │
        │                                         └────────┬───────────┘
        │                                                  │
        └──────────────────────────────────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │    APP STACK      │
                    │   (HomeScreen)    │
                    └───────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│              ONBOARDING STACK (Not Authenticated)                 │
└──────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │ hasSeenCarousel?  │
                    └─────┬─────────┬───┘
                          │         │
                    NO ◄──┘         └──► YES
                          │              │
                ┌─────────▼────────┐     │
                │ CarouselScreen   │     │
                │  (5 Slides)      │     │
                └─────────┬────────┘     │
                          │              │
                ┌─────────▼─────────┐    │
                │ markCarouselSeen()│    │
                └─────────┬─────────┘    │
                          │              │
                          └──────┬───────┘
                                 │
                        ┌────────▼────────┐
                        │  SignupScreen   │
                        └────┬────────┬───┘
                             │        │
              ┌──────────────┘        └─────────────┐
              │                                      │
      ┌───────▼───────┐                    ┌────────▼────────┐
      │ Click "Login" │                    │ Click "Sign Up" │
      │     Link      │                    │     Button      │
      └───────┬───────┘                    └────────┬────────┘
              │                                     │
      ┌───────▼────────┐                   ┌───────▼────────┐
      │  LoginScreen   │                   │   signup()     │
      └───────┬────────┘                   │  needsProfile  │
              │                            │     = true     │
      ┌───────▼────────┐                   └───────┬────────┘
      │    login()     │                           │
      │isAuthenticated │                  ┌────────▼────────┐
      │    = true      │                  │ProfileFormScreen│
      └───────┬────────┘                  └────────┬────────┘
              │                                    │
              │                           ┌────────▼────────┐
              │                           │completeProfile()│
              │                           │isAuthenticated  │
              │                           │    = true       │
              │                           └────────┬────────┘
              │                                    │
              └────────────────┬───────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │     APP STACK       │
                    │    (HomeScreen)     │
                    └─────────────────────┘
```

## APP STACK Navigation

```
┌────────────────────────────────────────────────────────────┐
│                      HOME SCREEN                            │
│  (Main App - Map, SOS, FloatingNavbar)                     │
└────────┬───────────────────────────────────────────────────┘
         │
         ├──────────► SearchRouteScreen (Route Search)
         │
         ├──────────► CircleScreen (Trusted Circle)
         │
         └──────────► Settings (Logout Available)
```

## Auth State Transitions

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTH STATES                               │
└─────────────────────────────────────────────────────────────┘

State 1: New User
─────────────────
isAuthenticated: false
needsProfile: false
hasSeenCarousel: false
→ Shows: Carousel → Signup

State 2: After Signup
──────────────────────
isAuthenticated: false
needsProfile: true
→ Shows: ProfileFormScreen

State 3: After Profile Complete / After Login
─────────────────────────────────────────────
isAuthenticated: true
needsProfile: false
→ Shows: HomeScreen (AppStack)

State 4: Returning User (App Restart)
──────────────────────────────────────
isAuthenticated: true (from AsyncStorage)
hasSeenCarousel: true
→ Shows: HomeScreen directly
```

## AsyncStorage Data Flow

```
┌──────────────────────────────────────────────────────────────┐
│                   ASYNCSTORAGE KEYS                           │
└──────────────────────────────────────────────────────────────┘

Key: @saferoute_auth
Value: 'true' | 'false'
Updated: login(), signup(), completeProfile(), logout()

Key: @saferoute_profile_complete
Value: 'true' | 'false'
Updated: signup() → false, completeProfile() → true

Key: @saferoute_user
Value: JSON { email, phoneNumber, uid, fullName, ... }
Updated: signup(), login(), completeProfile()

Key: @saferoute_carousel_seen
Value: 'true' | 'false'
Updated: markCarouselSeen() when user finishes carousel
```

## Navigation Decisions

```
┌─────────────────────────────────────────────────────────────┐
│              RootNavigator Decision Tree                     │
└─────────────────────────────────────────────────────────────┘

if (isLoading) {
    → Show Loading Screen
}
else if (isAuthenticated) {
    → Show AppStack (HomeScreen + other screens)
}
else if (needsProfile) {
    → Show ProfileFormScreen
}
else {
    → Show OnboardingStack
        if (!hasSeenCarousel) {
            → Start with CarouselScreen
        }
        else {
            → Start with Signup/Login
        }
}
```

## Component Hierarchy

```
App.jsx
 └─ SafeAreaProvider
     └─ ThemeProvider
         └─ AuthProvider ← Manages all auth state
             └─ NavigationContainer
                 └─ RouteProvider
                     └─ RootNavigator ← Decides which stack
                         ├─ OnboardingStack (Not auth)
                         │   ├─ CarouselScreen
                         │   ├─ SignupScreen
                         │   ├─ LoginScreen
                         │   └─ ProfileFormScreen
                         │
                         ├─ ProfileFormScreen (needsProfile)
                         │
                         └─ AppStack (Authenticated)
                             ├─ HomeScreen
                             ├─ SearchRouteScreen
                             ├─ CircleScreen
                             └─ Settings
```

## User Journey Examples

### Example 1: First Time User
```
1. Open App
   → Loading... (checking AsyncStorage)
   → isAuthenticated = false, hasSeenCarousel = false
   
2. CarouselScreen appears
   → User swipes through 5 slides
   → Clicks "Continue"
   → markCarouselSeen() called
   
3. SignupScreen appears
   → User enters email, phone, password
   → Clicks "Sign Up"
   → signup() sets needsProfile = true
   
4. ProfileFormScreen appears
   → User fills name, DOB, address, contacts
   → Clicks "Submit"
   → completeProfile() sets isAuthenticated = true
   
5. HomeScreen appears
   → User can now access all app features
   
6. User closes app, reopens later
   → Loading... (reading AsyncStorage)
   → isAuthenticated = true
   → Directly shows HomeScreen ✨
```

### Example 2: User Chooses Login
```
1. Open App → CarouselScreen → SignupScreen
2. User clicks "Log In" link
3. LoginScreen appears
4. User enters email & password
5. Clicks "Log In"
6. login() sets isAuthenticated = true
7. HomeScreen appears (No profile form!) ✨
```

### Example 3: User Logs Out
```
1. User is on any screen in AppStack
2. Goes to Settings
3. Clicks "Logout"
4. logout() clears AsyncStorage
5. isAuthenticated = false
6. App shows SignupScreen (carousel skipped since hasSeenCarousel = true)
```

## Screen Properties

```
┌─────────────────────────────────────────────────────────────┐
│                    SCREEN HEADERS                            │
└─────────────────────────────────────────────────────────────┘

OnboardingStack: headerShown = false
├─ CarouselScreen (no header)
├─ SignupScreen (no header)
├─ LoginScreen (no header)
└─ ProfileFormScreen (no header)

AppStack: headerShown = configurable
├─ HomeScreen (no header)
├─ SearchRouteScreen (header: "Search Route")
├─ CircleScreen (header: "My Circle")
└─ Settings (header: "Settings")
```

---

## Quick Reference

**Auth Methods:**
- `login(userData)` - Set user as authenticated
- `signup(userData)` - Mark user needs profile
- `completeProfile(profileData)` - Complete signup process
- `logout()` - Clear all auth data
- `markCarouselSeen()` - Skip carousel in future

**Auth State:**
- `isAuthenticated` - User can access app
- `needsProfile` - User must complete profile
- `isLoading` - Checking AsyncStorage
- `hasSeenCarousel` - Carousel already shown
- `user` - User data object

**Navigation:**
- Automatic based on auth state
- No manual navigation needed after auth actions
- RootNavigator handles all routing logic
