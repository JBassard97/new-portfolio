import { NextResponse } from "next/server";
import data from "../../projectData.json" assert {type: "json"};

type RouteParams = { params: Promise<{ label: string }> };

export const GET = async (request: Request, { params }: RouteParams) => {
    const { label } = await params;

    if (!label) {
        return NextResponse.json([]);
    }

    let cleanedLabel = label.replace("_", " ")

    const labelToFilter = (cleanedLabel: string) => {
        switch (cleanedLabel) {
            case "Frontend": return data.projectData.filter((project) => project.hasFrontend)
            case "Backend": return data.projectData.filter((project) => project.hasBackend)
            case "Fullstack": return data.projectData.filter((project) => project.isFullStack)
            case "Web App": return data.projectData.filter((project) => project.type === cleanedLabel)
            case "API": return data.projectData.filter((project) => project.type === cleanedLabel)
            case "CLI": return data.projectData.filter((project) => project.type === cleanedLabel)
            case "Other": return data.projectData.filter((project) => project.type === "Other")
            case "Complete": return data.projectData.filter((project) => project.isComplete)
            case "In Progress": return data.projectData.filter((project) => !project.isComplete)
            default: return [];
        }
    }

    const matchingProjects = labelToFilter(cleanedLabel);

    if (matchingProjects.length === 0) {
        return NextResponse.json([])
    }

    return NextResponse.json(matchingProjects);
}
