# Magic Link Debugging Guide

This guide explains the comprehensive debugging statements added to help troubleshoot magic link authorization issues in Cloudflare Workers.

## Debugging Coverage

The following components now have detailed debugging statements:

### 1. Email Sending (`app/lib/authSendRequest.ts`)

- **Debug Prefix**: `🔐 [MAGIC LINK DEBUG]`
- **What it tracks**:
  - Environment variables and configuration
  - Resend API request/response details
  - Email sending success/failure
  - Error details with stack traces

### 2. NextAuth Handlers (`app/api/auth/[...nextauth]/route.ts`)

- **Debug Prefix**: `🔐 [NEXTAUTH DEBUG]`
- **What it tracks**:
  - All GET/POST requests to NextAuth endpoints
  - Request headers and body content
  - Response status and headers
  - Error handling with stack traces

### 3. Authentication Configuration (`app/auth.ts`)

- **Debug Prefix**: `🔐 [AUTH DEBUG]`
- **What it tracks**:
  - signIn callback events
  - session callback events
  - JWT callback events
  - signIn/signOut events
  - User and account information

### 4. Auth Status Endpoint (`app/api/auth/status/route.ts`)

- **Debug Prefix**: `🔐 [AUTH STATUS DEBUG]`
- **What it tracks**:
  - Session retrieval process
  - Session object structure
  - User authentication state
  - Error details with debugging info

### 5. Turnstile Verification (`app/api/auth/turnstile/route.ts`)

- **Debug Prefix**: `🔐 [TURNSTILE DEBUG]`
- **What it tracks**:
  - Token verification process
  - Cloudflare Turnstile API responses
  - Environment variable availability
  - Error handling

### 6. Magic Link Component (`app/components/sign-in-magic-link.tsx`)

- **Debug Prefix**: `🔐 [MAGIC LINK COMPONENT DEBUG]`
- **What it tracks**:
  - Form submission process
  - Validation steps
  - Turnstile verification
  - SignIn API calls
  - Error handling

## How to Use

### 1. Enable Debug Mode

Set the environment variable to enable NextAuth debug mode:

```bash
NEXTAUTH_DEBUG=true
```

### 2. View Logs in Cloudflare

1. Go to your Cloudflare Workers dashboard
2. Navigate to your worker
3. Click on "Logs" tab
4. Filter by the debug prefixes to see specific components

### 3. Common Debug Patterns to Look For

#### Magic Link Email Sending Issues

Look for:

```
🔐 [MAGIC LINK DEBUG] Starting sendVerificationRequest
🔐 [MAGIC LINK DEBUG] Resend API response status: [status]
🔐 [MAGIC LINK DEBUG] Resend API error: [error details]
```

#### Authentication Flow Issues

Look for:

```
🔐 [NEXTAUTH DEBUG] GET/POST request received
🔐 [AUTH DEBUG] signIn callback triggered
🔐 [AUTH DEBUG] session callback triggered
```

#### Session Management Issues

Look for:

```
🔐 [AUTH STATUS DEBUG] Calling auth() function...
🔐 [AUTH STATUS DEBUG] Session object: [session details]
```

### 4. Troubleshooting Common Issues

#### Issue: Magic link email not sent

- Check `🔐 [MAGIC LINK DEBUG]` logs for Resend API errors
- Verify environment variables are set correctly
- Look for network connectivity issues

#### Issue: Magic link click results in server error

- Check `🔐 [NEXTAUTH DEBUG]` logs for request/response details
- Look for `🔐 [AUTH DEBUG]` callback errors
- Verify database connection and adapter configuration

#### Issue: Session not created after magic link verification

- Check `🔐 [AUTH STATUS DEBUG]` logs for session retrieval
- Look for `🔐 [AUTH DEBUG]` session callback issues
- Verify JWT token handling

#### Issue: Turnstile verification failing

- Check `🔐 [TURNSTILE DEBUG]` logs for API response details
- Verify `TURNSTILE_SECRET_KEY` environment variable
- Check Cloudflare Turnstile service status

### 5. Environment Variables to Verify

Make sure these are set in your Cloudflare Workers environment:

- `DATABASE_URL`
- `EMAIL_SERVER`
- `EMAIL_FROM`
- `AUTH_RESEND_KEY` (if using Resend)
- `TURNSTILE_SECRET_KEY`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

### 6. Log Analysis Tips

1. **Follow the flow**: Start from the component debug logs and trace through the authentication flow
2. **Look for error patterns**: Errors often repeat with similar stack traces
3. **Check environment differences**: Compare logs between development and production
4. **Monitor timing**: Some issues might be related to request timeouts or rate limiting

### 7. Removing Debug Statements

Once you've identified and fixed the issues, you can remove the debug statements by:

1. Reverting the changes to the modified files
2. Or setting up a debug flag to conditionally enable/disable logging

## Next Steps

1. Deploy these changes to your staging environment
2. Test the magic link flow and collect logs
3. Analyze the logs to identify the root cause
4. Fix the identified issues
5. Remove debug statements once resolved

The debug statements are designed to be comprehensive but not overly verbose, focusing on the critical points where magic link authentication can fail in a Cloudflare Workers environment.
