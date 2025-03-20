import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isStudentRoute = createRouteMatcher(["/user/(.*)"]);
const isTeacherRoute = createRouteMatcher(["/teacher/(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // If no user is logged in, continue with the request
  if (!userId) {
    return NextResponse.next();
  }

  try {
    const user = await (await clerkClient()).users.getUser(userId);
    const userRole =
      (user?.publicMetadata?.userType as "student" | "teacher") || "student";

    if (isStudentRoute(req) && userRole !== "student") {
      return NextResponse.redirect(new URL("/teacher/courses", req.url));
    }

    if (isTeacherRoute(req) && userRole !== "teacher") {
      return NextResponse.redirect(new URL("/user/courses", req.url));
    }

    // Default case - continue with the request
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // In case of error, still allow the request to continue
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
