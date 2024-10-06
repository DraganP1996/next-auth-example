/**
 * An Array of Routes that are accessible to the public
 * These routes do not require authentication
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * An Array of Routes that are used for authentication
 * These routes willl redirect loggedIn users to /settings
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API auth routes
 * Routes that starts with this prefix are used for API auth
 * purposes
 */
export const apiAuthPrefix = "/api/auth/";

/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
