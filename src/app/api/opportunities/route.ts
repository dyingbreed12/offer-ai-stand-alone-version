import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  try {
    const res = await fetch(
      `https://services.leadconnectorhq.com/opportunities/search?location_id=${process.env.GHL_LOCATION_ID}&q=${encodeURIComponent(q)}`,
      {
        headers: {
          "Authorization": `Bearer ${process.env.GHL_API_KEY}`,
          "Version": "2021-07-28",
          "Content-Type": "application/json"
        }
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch opportunities" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
