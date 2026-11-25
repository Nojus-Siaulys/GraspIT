// Deployments from GitHub build from the repository root, where Vercel only looks for functions in /api.
// A deployment started inside previews-app uses previews-app/vercel.json and never sees this file.
export { default } from "../previews-app/api/contact.js"
