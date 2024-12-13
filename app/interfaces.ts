export interface Project {
    name: string;
    githubLink: string;
    images: string[];
    isComplete: boolean;
    isDeployed: boolean;
    deployedLink: string;
    desc: string;
    hasFrontend: boolean;
    hasBackend: boolean;
    isFullStack: boolean;
    type: string;
    hostedOn: string;
    stack: string[];
    tellMeMore: string[];
    whatILearned: string[];
}