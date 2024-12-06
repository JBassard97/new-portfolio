import { NextResponse } from "next/server";
import data from "../../projectData.json" with {type: "json"};

type RouteParams = { params: Promise<{ project: string }> };

export const GET = async (request: Request, { params }: RouteParams) => {
    const { project } = await params;

    if (!project) {
        return NextResponse.json([]);
    }

    let matchingProject = data.projectData.filter((projectitem) => projectitem.name == project)

    if (!matchingProject) {
        return NextResponse.json([]);
    }

    return NextResponse.json(matchingProject);
}