const techToLogo = (tech: string) => {
    if (!tech || typeof (tech) !== "string") {
        return "/charizard.png"
    }

    switch (tech.toLowerCase()) {
        case "angular":
            return "/angular.svg"
        case "apollo":
            return "/apollo.svg"
        case "aws":
            return "/aws.svg"
        case "bootstrap":
            return "/bootstrap.svg"
        case "c":
            return "/c.svg"
        case "c++":
            return "/cplusplus.svg"
        case "css":
            return "/css.svg"
        case "deno":
            return "/deno.svg"
        case "django":
            return "/django.svg"
        case "express.js":
            return "/express.svg"
        case "figma":
            return "/figma.svg"
        case "flask":
            return "/flask.svg"
        case "github":
            return "/github.svg"
        case "graphql":
            return "/graphql.svg"
        case "handlebars":
            return "/handlebars.svg"
        case "html":
            return "/html.svg"
        case "insomnia":
            return "/insomnia.svg"
        case "java":
            return "/java.svg"
        case "javascript":
            return "/javascript.svg"
        case "jquery":
            return "/jquery.svg"
        case "mongodb":
            return "/mongo.svg"
        case "mongoose":
            return "/mongoose.svg"
        case "mysql":
            return "/mysql.svg"
        case "netlify":
            return "/netlify.svg"
        case "next.js":
            return "/next-js.svg"
        case "nodejs":
            return "/node.svg"
        case "npm":
            return "/npm.svg"
        case "php":
            return "/php.svg"
        case "postgresql":
            return "/postgres.svg.png"
        case "postman":
            return "/postman.svg"
        case "python":
            return "/python.svg"
        case "react":
            return "/react_svg.svg"
        case "render":
            return "/render.svg"
        case "sass":
            return "/sass.svg"
        case "sqlalchemy":
            return "/SQLAlchemy.svg"
        case "svelte":
            return "/svelte.svg"
        case "tailwind":
            return "/tailwind.svg"
        case "typescript":
            return "/typescript.svg"
        case "vite":
            return "/vite.svg"
        case "vue":
            return "/vue.svg"
        case "webpack":
            return "/webpack.svg"
        case "wordpress":
            return "/wordpress.svg"
        case "yaml":
            return "/yaml.svg"
        default:
            return "/charizard.png"
    }
}

export default techToLogo;