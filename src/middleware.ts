import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "pinpku-secret-key-change-in-production"
);

const studentPaths = [
  "/dashboard",
  "/cv-builder",
  "/surat-lamaran",
  "/tips-wawancara",
  "/bank-contoh",
];

const adminPaths = [
  "/admin/dashboard",
  "/admin/mahasiswa",
  "/admin/bank-contoh",
  "/admin/tips-wawancara",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect student routes
  if (studentPaths.some((p) => pathname.startsWith(p))) {
    const token = request.cookies.get("pinpku_session")?.value;
    if (!token) return NextResponse.redirect(new URL("/", request.url));
    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protect admin routes (except /admin login page)
  if (adminPaths.some((p) => pathname.startsWith(p))) {
    const token = request.cookies.get("pinpku_admin_session")?.value;
    if (!token) return NextResponse.redirect(new URL("/admin", request.url));
    try {
      const { payload } = await jwtVerify(token, secret);
      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // Protect admin API routes
  if (pathname.startsWith("/api/admin/") && !pathname.startsWith("/api/admin/login")) {
    const token = request.cookies.get("pinpku_admin_session")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    try {
      const { payload } = await jwtVerify(token, secret);
      if (payload.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.next();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/cv-builder/:path*",
    "/surat-lamaran/:path*",
    "/tips-wawancara/:path*",
    "/bank-contoh/:path*",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
