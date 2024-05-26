import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

export default function middleware(
  request: NextRequest,
  //   event: NextFetchEvent,
) {
  console.log("[MIDDLEWARE]", request.nextUrl.href);
  return NextResponse.next();
}

const excludePathPattern = [
  "_next", // start with _next
  ".*\\..*", // end with dot-extension.
];

export const config: MiddlewareConfig = {
  matcher: `/((?!${excludePathPattern.join("|")}).*)`,
};
