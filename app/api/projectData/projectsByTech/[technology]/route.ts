import { NextResponse } from "next/server";
import data from "../../projectData.json" with {type: "json"}

export const GET = async (request: Request, { params }: { params: { technology: string } }) => {
    const { technology } = await params;

    if (!technology) {
        return NextResponse.json("No technology name provided.");
    }

    const matchingProjects = data.projectData.filter((project) => project.stack.includes(technology));

    if (matchingProjects.length === 0) {
        return NextResponse.json(`No projects found for ${technology}`)
    }

    return NextResponse.json(matchingProjects);
}