import { renderToString } from "react-dom/server"
import { Site } from "./site/Site"
export { pages } from "./site/content"
export const render = (path: string) => renderToString(<Site path={path} />)
