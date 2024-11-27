import { NextResponse } from "next/server";
import data from "./technologyData.json" with {type: "json"}

export async function GET() {
    return NextResponse.json(data);
}