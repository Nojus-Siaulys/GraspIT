import { allFaq, pages, services } from "./content"
import { blogAuthor, postBySlug, posts } from "./posts"
import { prices } from "./pricing"
import { contact } from "./settings"

// Schema.org JSON-LD for one page, written into <head> by scripts/prerender.mjs.
// With no SITE_URL the ids stay relative; once the domain is set they become absolute.
const euros = (value: string) => Number(value.replace(/[^\d]/g, ""))
const servicePrice: Record<string, number | undefined> = {
  "/paslaugos/svetaines": euros(prices.website),
  "/paslaugos/el-parduotuves": euros(prices.shop),
  "/paslaugos/ai-agentai": euros(prices.email),
}

export function structuredData(path: string, origin = "") {
  const url = (p: string) => `${origin}${p === "/" ? "/" : `${p.replace(/\/$/, "")}/`}`
  const org = `${origin}/#organizacija`
  const site = `${origin}/#svetaine`
  const page = pages[path]
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": org,
      name: "GraspIT",
      url: url("/"),
      logo: `${origin}/img/logo.png`,
      description:
        "Dviejų žmonių svetainių studija Lietuvoje: kuriame ir atnaujiname svetaines, el. parduotuves ir AI automatizacijas vietiniam verslui.",
      areaServed: { "@type": "Country", name: "Lietuva" },
      knowsLanguage: ["lt"],
      knowsAbout: ["Svetainių kūrimas", "El. parduotuvių kūrimas", "Techninis SEO", "GEO / AI paieškos optimizavimas", "WordPress svetainių atnaujinimas", "AI automatizacija"],
      ...(contact.email || contact.phone
        ? { contactPoint: { "@type": "ContactPoint", contactType: "customer service", areaServed: "LT", availableLanguage: "lt", ...(contact.email && { email: contact.email }), ...(contact.phone && { telephone: contact.phone }) } }
        : {}),
    },
    { "@type": "WebSite", "@id": site, url: url("/"), name: "GraspIT", inLanguage: "lt", publisher: { "@id": org } },
  ]
  if (!page) return { "@context": "https://schema.org", "@graph": graph }

  graph.push({
    "@type": path === "/blogas" ? "CollectionPage" : path === "/duk" ? "FAQPage" : "WebPage",
    "@id": `${url(path)}#puslapis`,
    url: url(path),
    name: page.title,
    description: page.intro,
    inLanguage: "lt",
    isPartOf: { "@id": site },
    about: { "@id": org },
    ...(path === "/duk"
      ? { mainEntity: allFaq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }
      : {}),
  })

  if (path !== "/") {
    const trail: [string, string][] = [["/", "Pradžia"]]
    if (path.startsWith("/paslaugos/")) trail.push(["/paslaugos", "Paslaugos"])
    if (path.startsWith("/darbai/")) trail.push(["/darbai", "Darbai"])
    if (path.startsWith("/blogas/")) trail.push(["/blogas", "Blogas"])
    trail.push([path, page.label])
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: trail.map(([p, name], i) => ({ "@type": "ListItem", position: i + 1, name, item: url(p) })),
    })
  }

  const service = services.find((s) => s.href === path)
  if (service) {
    const price = servicePrice[path]
    graph.push({
      "@type": "Service",
      "@id": `${url(path)}#paslauga`,
      name: service.title,
      serviceType: page.label,
      description: page.intro,
      url: url(path),
      provider: { "@id": org },
      areaServed: { "@type": "Country", name: "Lietuva" },
      ...(price
        ? { offers: { "@type": "Offer", url: url("/kainos"), priceCurrency: "EUR", priceSpecification: { "@type": "PriceSpecification", minPrice: price, priceCurrency: "EUR" } } }
        : {}),
    })
  }

  if (path === "/blogas") {
    graph.push({
      "@type": "Blog",
      "@id": `${url(path)}#blogas`,
      name: "GraspIT blogas",
      url: url(path),
      inLanguage: "lt",
      publisher: { "@id": org },
      blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: url(`/blogas/${p.slug}`), datePublished: p.date })),
    })
  }

  const post = path.startsWith("/blogas/") ? postBySlug[path.split("/")[2]] : undefined
  if (post) {
    graph.push({
      "@type": "BlogPosting",
      "@id": `${url(path)}#straipsnis`,
      headline: post.title,
      description: post.description,
      abstract: post.summary.join(" "),
      inLanguage: "lt",
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      mainEntityOfPage: { "@id": `${url(path)}#puslapis` },
      image: `${origin}/og/blogas-${post.slug}.png`,
      author: { "@type": "Organization", name: blogAuthor, "@id": org },
      publisher: { "@id": org },
      articleSection: post.label,
      wordCount: [post.summary.join(" "), ...post.sections.flatMap((s) => [s.h, ...s.body.map((b) => (typeof b === "string" ? b : "list" in b ? b.list.join(" ") : b.steps.join(" ")))])].join(" ").split(/\s+/).length,
    })
    if (post.faq)
      graph.push({
        "@type": "FAQPage",
        "@id": `${url(path)}#klausimai`,
        mainEntity: post.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      })
  }

  return { "@context": "https://schema.org", "@graph": graph }
}
