import { NextResponse } from "next/server";
import data from "./timelineData.json" with {type: "json"}

export async function GET() {
    return NextResponse.json(data);
}