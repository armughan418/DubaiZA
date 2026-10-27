# DubaiZA backend

## Configuration

Create `backend/.env` with:

```env
DB_URL=your-mongodb-connection-string
JWT_SECRET=a-random-secret-at-least-32-characters-long
PORT=5000
FRONTEND_URL=http://localhost:5173
```

Keep the database URL and token secret private. For a frontend and API on
different sites, set `COOKIE_SAME_SITE=None` and use HTTPS in production.
`FRONTEND_URL` may contain comma-separated allowed frontend origins.
When the API is not at `http://localhost:5000`, set the frontend's
`VITE_API_URL` to the API URL ending in `/api`.

Run the API from this directory with `npm run dev`.

## API

- `POST /api/auth/register` and `POST /api/auth/login` set an HTTP-only session
  cookie and return the public user profile.
- `POST /api/auth/logout` clears the session cookie.
- `GET /api/auth/me` returns the signed-in profile; `PATCH /api/auth/me` updates
  the account name and email.
- `GET /api/posts` and `GET /api/posts/:postId` return public listings.
- `POST /api/posts` creates an authenticated user's listing.
- `GET /api/posts/mine` returns the signed-in user's listing count and listings.
- `PUT /api/posts/:postId` and `DELETE /api/posts/:postId` manage only listings
  owned by the signed-in user.

The browser sends the session cookie automatically. Listing photos are stored
with each listing; send 1-8 JPEG, PNG, WEBP, or GIF data URLs with a combined
decoded size no greater than 10 MB.
