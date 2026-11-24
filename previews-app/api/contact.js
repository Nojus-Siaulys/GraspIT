// Vercel compiles .ts functions to .js but keeps the "../server/contact.ts" import, which then
// fails at runtime. A plain .js entry lets Node run the shared .ts sources directly (type
// stripping); vercel.json ships those sources with the function.
import { contactConfig, createContactHandler } from "../server/contact.ts"

export default createContactHandler(contactConfig())
