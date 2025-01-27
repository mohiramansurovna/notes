/**
 * array of public routes 
 * than anyone can access
*/
export const publicRoutes=[
    "/auth",
]


/**
 * auth routes
 * users will be redirected to /settings page after login
 */
export const authRoutes=[
    "/auth/login",
    "/auth/register",
]


/**
 * Routes that starts with this prefix will be used for API
 * authentication purposes
 * @type {string}
 */
export const apiAuthPrefix="/api/auth"


/**
 * Default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT="/dashboard";
export const DEFAULT_LOGOUT_REDIRECT="/auth";