# Authentication Flow Debugging Guide

## What I've Added

I've added comprehensive logging throughout the authentication flow to help troubleshoot the "unknown unknown unknown" issue. Here's what to check:

## Debugging Flow

### 1. **When Account Widget Mounts**

Look for:

```
🔐 [ACCOUNT WIDGET] Mounted, checking auth status
🔐 [AUTH STORE] Checking auth status...
```

### 2. **When Fetching User Context**

Look for:

```
🔐 [USER CONTEXT] Fetching user context...
🔐 [USER CONTEXT] Session: { hasSession, hasUser, userId, userEmail }
🔐 [USER CONTEXT] Querying database for user: <userId>
🔐 [USER CONTEXT] Database query result: { found, id, email, name, alias, hasImage, membershipLevel, membershipStatus }
```

**Key things to check:**

- Does the session exist? (`hasSession: true`)
- Does it have a user ID? (`userId: <some-id>`)
- Was the user found in the database? (`found: true`)
- What are the actual values for `name`, `alias`, `membershipLevel`, `membershipStatus`?

### 3. **When Auth Store Updates**

Look for:

```
🔐 [AUTH STORE] Response status: 200
🔐 [AUTH STORE] Response data: { isSignedIn, hasUser, userId, userName, userAlias, membershipLevel, membershipStatus }
🔐 [AUTH STORE] Setting user data in store: { ... }
```

**Key things to check:**

- Is the response successful? (`Response status: 200`)
- Does the response have user data? (`hasUser: true`)
- What values are in `userName`, `userAlias`, `membershipLevel`, `membershipStatus`?

### 4. **When Account Widget Receives User Data**

Look for:

```
🔐 [ACCOUNT WIDGET] User state changed: { isSignedIn, hasUser, userId, userName, userAlias, userEmail, membershipLevel, membershipStatus }
```

**Key things to check:**

- Is `isSignedIn: true`?
- Are `userName`, `userAlias`, `userEmail` populated?
- What are the membership values?

## Common Issues and Solutions

### Issue: "unknown • unknown" showing in membership

**Cause:** User doesn't have a record in the `memberships` table.
**Solution:** Either:

1. Create a membership record when user signs up
2. Don't show membership if it's "unknown"
3. Set a default membership when user is created

### Issue: Shows email instead of name/alias

**Cause:** User record doesn't have `name` or `alias` set.
**Solution:**

1. Check if the `name` from OAuth provider is being saved
2. Prompt user to set an alias during registration

### Issue: Shows "U" instead of initials

**Cause:** No name, alias, or email available.
**Solution:** Check why user data isn't being fetched from database.

## Testing Steps

1. **Clear your browser storage** to start fresh:

   - Open DevTools → Application → Storage → Clear site data

2. **Open the browser console** to see logs

3. **Click "Sign In"** and authenticate

4. **Watch the console** for the logging sequence above

5. **Note where the data becomes null/undefined/unknown**

## Database Check

To verify data in your database:

```sql
-- Check if user exists
SELECT id, email, name, alias, image FROM users WHERE email = 'your-email@example.com';

-- Check if membership exists
SELECT * FROM memberships WHERE user_id = '<user-id>';
```

## Expected Flow After Sign-In

1. User clicks Sign In → OAuth/Magic Link flow
2. NextAuth creates session
3. Account widget calls `checkAuthStatus()`
4. Auth store fetches `/api/auth/user-context`
5. API gets session and queries database
6. API returns user + membership data
7. Auth store updates with user data
8. Account widget renders with user info

## Current Improvements

✅ Added comprehensive logging at each step
✅ Better handling of missing name/alias (shows email or initials from email)
✅ Hide membership info if it's "unknown"
✅ Show email as fallback in dropdown header
✅ Generate initials from email username if no name/alias
