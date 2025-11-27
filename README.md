# Return in Islam Foundation — Full Site Starter

Features:
- Next.js + TailwindCSS
- next-translate (bn default, en)
- Supabase: Auth, Storage, DB (client + admin service role)
- Stripe Checkout server integration (server secret required)
- Full e-commerce: product grid, product detail, cart, wishlist, reviews, search, filters, pagination
- Admin: product CRUD, article CRUD, image upload to Supabase Storage
- Pages: /, /articles, /donate, /prayer-times, /about, /quran, /dowa, /hadith, /shop, /cart, /checkout, /admin

Setup:
1. Copy `.env.example` to `.env.local` and fill values. Do NOT put service role or stripe secret in git.
2. Install deps:
   npm install
3. Seed Supabase:
   - Create a Supabase project.
   - In Supabase SQL editor paste `supabase/schema-and-seed.sql` and run.
   - Create a storage bucket named `products` (public or with appropriate rules) if using Storage.
4. Run dev:
   npm run dev
5. Admin:
   - Create account via /auth/signup.
   - Login via /auth/login then visit /admin/products to create/edit products.
6. Stripe:
   - Add STRIPE_SECRET_KEY to server env and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to .env.local for client.

Security:
- Never commit SUPABASE_SERVICE_ROLE_KEY or STRIPE_SECRET_KEY.
- Use server-side environment variables for admin APIs.