/**
 * Express router for handling Google and Facebook OAuth authentication.
 *
 * @module socialAuthRoutes
 */

/**
 * @swagger
 * tags:
 *   name: Social Authentication
 *   description: Endpoints for Google and Facebook OAuth authentication
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Initiate Google OAuth authentication Test with web browser.
 *     tags: [Social Authentication]
 *     responses:
 *       302:
 *         description: Redirects to Google OAuth consent screen
 */

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback Test with web browser.
 *     tags: [Social Authentication]
 *     responses:
 *       302:
 *         description: Redirects after Google authentication
 */

/**
 * @swagger
 * /auth/facebook:
 *   get:
 *     summary: Initiate Facebook OAuth authentication Test with web browser.
 *     tags: [Social Authentication]
 *     responses:
 *       302:
 *         description: Redirects to Facebook OAuth consent screen
 */

/**
 * @swagger
 * /auth/facebook/callback:
 *   get:
 *     summary: Facebook OAuth callback Test with web browser.
 *     tags: [Social Authentication]
 *     responses:
 *       302:
 *         description: Redirects after Facebook authentication
 */
