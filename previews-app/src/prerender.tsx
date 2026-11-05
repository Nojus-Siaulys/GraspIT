import { renderToString } from "react-dom/server"
import { Site } from "./site/Site"
export { pages, navigation, services } from "./site/content"
export { posts } from "./site/posts"
export { structuredData } from "./site/schema"
export const render = (path: string) => renderToString(<Site path={path} />)
