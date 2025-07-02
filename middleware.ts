export { default } from "next-auth/middleware";

// This specifies which routes should be protected.
export const config = {
  matcher: ["/admin/:path*"],
};