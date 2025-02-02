import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BASE_URL = "https://api.picaapi.com/aigc/image";
const HEADERS = {
  "app-version-code": "1040200",
  authorization: `Bearer ${process.env.ARTGURU_AUTH_TOKEN}`,
  vtoken: process.env.ARTGURU_VTOKEN,
  "distinct-id":
    "194c2a6aec879a-0555435a87d4bc8-1d525636-2007040-194c2a6aec9abb",
  "accept-language": "en-US,en;q=0.9",
  from: "web",
  lang: "en",
  origin: "https://www.artguru.ai",
  referer: "https://www.artguru.ai/",
};

export async function POST(req: NextRequest) {
  try {
    const path = req.nextUrl.searchParams.get("path");
    if (!path) {
      return NextResponse.json(
        { error: "Missing API path parameter" },
        { status: 400 }
      );
    }

    // Clone headers and preserve original
    const headers = new Headers(HEADERS);
    const contentType = req.headers.get("content-type") || "";
    headers.set("content-type", contentType);

    // Get raw body stream
    const body = await req.arrayBuffer();

    const response = await fetch(`${BASE_URL}/${path}`, {
      method: "POST",
      headers: headers,
      body: body,
    });

    // Forward exact response
    const responseBody = await response.arrayBuffer();

    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("[Artguru Proxy Error]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
