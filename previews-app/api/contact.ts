import { contactConfig, createContactHandler } from "../server/contact.ts"

export default createContactHandler(contactConfig())
