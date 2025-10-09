# Authentication & Membership Flow Fixes

## Issues Fixed

### 1. ✅ Redirect to Registration if No Membership

**Problem**: When a user signs in without a membership record, they were shown "unknown • unknown" in the account widget.

**Solution**: Added logic in `account-widget.tsx` to automatically redirect users to `/join/registration` if they sign in without a membership.

**How it works**:

- After sign-in, the account-widget checks if the user has a membership
- If `membership` is missing or `membership.level === 'unknown'`, the user is redirected to `/join/registration`
- The sign-in dialog closes automatically before redirect
- User completes the free Explorer membership registration

**Files changed**:

- `app/components/account-widget.tsx`

---

### 2. ✅ Refresh User Context After Registration

**Problem**: After completing registration, the account-widget didn't update to show the new membership information (alias, level, etc.).

**Solution**: Added `checkAuthStatus()` calls in the registration flow to refresh the auth-store.

**How it works**:

1. When user submits the MembershipStep, after successful API response, we call `checkAuthStatus()` to fetch updated user context
2. When the ConfirmMembershipStep loads, it also calls `checkAuthStatus()` to ensure the latest data is displayed
3. This triggers the auth-store to fetch from `/api/auth/user-context` which includes the new membership data
4. The account-widget automatically updates when the auth-store changes

**Files changed**:

- `app/(main)/join/registration/MembershipStep.tsx` - Added auth store refresh after membership creation
- `app/(main)/join/registration/ConfirmMembershipStep.tsx` - Added auth store refresh on mount

---

### 3. ✅ Fix Next.js Image Component for OAuth Avatars

**Problem**: The Next.js Image component threw errors when displaying avatar images from OAuth providers (Google, GitHub, etc.) because those domains weren't in the allowed list.

**Solution**: Added common OAuth provider domains to the `remotePatterns` configuration in `next.config.ts`.

**Domains added**:

- `lh3.googleusercontent.com` - Google avatars
- `avatars.githubusercontent.com` - GitHub avatars
- `cdn.discordapp.com` - Discord avatars
- `platform-lookaside.fbsbx.com` - Facebook avatars
- `pbs.twimg.com` - Twitter avatars

**Files changed**:

- `next.config.ts`

**Note**: You'll need to restart your Next.js dev server for the config changes to take effect.

---

## Testing the Complete Flow

### New User Sign-In Flow

1. User clicks "Sign In" on account-widget
2. User authenticates via OAuth or Magic Link
3. NextAuth creates session
4. Account-widget checks auth status
5. **NEW**: If no membership found → Auto-redirect to `/join/registration`
6. User completes registration (alias, terms, privacy)
7. **NEW**: Auth store refreshes with new membership data
8. User sees confirmation page with updated info
9. **NEW**: Account-widget now shows alias and membership level

### Existing User Sign-In Flow

1. User clicks "Sign In" on account-widget
2. User authenticates via OAuth or Magic Link
3. NextAuth creates session
4. Account-widget checks auth status
5. Membership found → User stays on current page
6. Account-widget shows user's alias and membership level
7. **NEW**: Avatar images from OAuth providers display correctly

### Avatar Display

- OAuth provider avatars (Google, GitHub, etc.) now display correctly
- No more Next.js Image optimization errors
- Falls back to initials if no image available

---

## Debugging

All the console logging from the previous debugging session is still active:

```
🔐 [ACCOUNT WIDGET] User state changed: { ... }
🔐 [ACCOUNT WIDGET] User has no membership, redirecting to registration
🔐 [MEMBERSHIP STEP] Membership created, refreshing auth status
🔐 [CONFIRM MEMBERSHIP] Refreshing auth status to update membership info
🔐 [AUTH STORE] Checking auth status...
🔐 [USER CONTEXT] Returning user context: { ... }
```

This makes it easy to trace the complete flow and verify everything is working correctly.

---

## What Happens Now

### For Users Without Membership:

1. Sign in → Auto-redirect to registration → Complete free membership → See updated info

### For Users With Membership:

1. Sign in → See their membership level and alias immediately

### For All Users:

- Avatar images from OAuth providers display correctly
- Membership info refreshes properly after registration
- Clean UX with automatic redirects and updates
