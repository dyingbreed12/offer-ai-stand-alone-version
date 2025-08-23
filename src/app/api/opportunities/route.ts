import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const key = process.env.GHL_API_KEY;
  const loc = process.env.GHL_LOCATION_ID;

  if (!key || !loc) {
    // Don’t leak the secret—just say it’s missing.
    return NextResponse.json(
      { error: "Server misconfigured: missing env vars" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  const res = await fetch(
    `https://services.leadconnectorhq.com/opportunities/search?location_id=${loc}&q=${encodeURIComponent(q)}`,
    {
      headers: {
        Authorization: `Bearer ${key}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch opportunities" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
