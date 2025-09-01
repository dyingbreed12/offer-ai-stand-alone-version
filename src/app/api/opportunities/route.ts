import { NextResponse } from "next/server";

// Handles GET requests to search for opportunities
export async function GET(req: Request) {
  const key = process.env.GHL_API_KEY;
  const loc = process.env.GHL_LOCATION_ID;

  if (!key || !loc) {
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

// ----------------------------------------------------------------------------------------------------

// Handles POST requests to update a custom field on an opportunity
export async function POST(req: Request) {
  const key = process.env.GHL_API_KEY;
  const loc = process.env.GHL_LOCATION_ID;

  if (!key || !loc) {
    return NextResponse.json(
      { error: "Server misconfigured: missing env vars" },
      { status: 500 }
    );
  }

  try {
    const { opportunityId, customFieldId, field_value } = await req.json();

    if (!opportunityId || !customFieldId || field_value === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const res = await fetch(
      `https://services.leadconnectorhq.com/opportunities/${opportunityId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${key}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customFields: [
            {
              id: customFieldId,
              field_value: field_value,
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      // Log the status and response body for debugging
      console.error(`Failed to update opportunity. Status: ${res.status}`);
      let errorDetails = "No error details available.";
      try {
        const errorData = await res.json();
        errorDetails = JSON.stringify(errorData, null, 2);
      } catch (e) {
        errorDetails = await res.text();
      }
      console.error("External API Response:", errorDetails);
      return NextResponse.json(
        { error: `Failed to update opportunity. See server logs for details. Status: ${res.status}` },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}