import { NextResponse } from "next/server";
import data from "../../projectData.json" with {type: "json"}

type RouteParams = { params: Promise<{ technology: string }> };

export const GET = async (request: Request, { params }: RouteParams) => {
    const { technology } = await params;

    if (!technology) {
        return NextResponse.json([]);
    }

    const matchingProjects = data.projectData.filter((project) => project.stack.includes(technology));

    if (matchingProjects.length === 0) {
        return NextResponse.json([])
    }

    return NextResponse.json(matchingProjects);
}