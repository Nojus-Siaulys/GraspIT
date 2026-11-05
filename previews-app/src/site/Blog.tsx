import { Fragment, type ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { blogAuthor, postBySlug, posts, relatedPosts, type Block, type Post } from "./posts"

const wrap = "mx-auto max-w-[1280px] px-5 md:px-8"
const band = "py-16 md:py-24"
const eyebrow = "text-xs font-bold uppercase tracking-[.16em]"
const inlineLink = "font-semibold underline decoration-[var(--signal)] decoration-2 underline-offset-4 hover:decoration-current"

const months = ["sausio", "vasario", "kovo", "balandžio", "gegužės", "birželio", "liepos", "rugpjūčio", "rugsėjo", "spalio", "lapkričio", "gruodžio"]
export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number)
  return `${y} m. ${months[m - 1]} ${d} d.`
}

// Turns "[text](/path/)" into links; everything else stays plain text.
function Rich({ text }: { text: string }) {
  const parts: ReactNode[] = []
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0
    if (index > last) parts.push(text.slice(last, index))
    parts.push(<a key={index} href={match[2]} className={inlineLink}>{match[1]}</a>)
    last = index + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts.map((part, i) => <Fragment key={i}>{part}</Fragment>)}</>
}

function BlockView({ block }: { block: Block }) {
  if (typeof block === "string") return <p className="text-lg leading-relaxed"><Rich text={block} /></p>
  if ("list" in block)
    return <ul className="space-y-3">{block.list.map((item) => <li key={item} className="flex gap-3 text-lg leading-relaxed"><span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-[var(--signal)]" /><span><Rich text={item} /></span></li>)}</ul>
  return <ol className="space-y-4">{block.steps.map((item, i) => <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-2 border-t border-foreground/20 pt-4 text-lg leading-relaxed"><span className="font-bold text-[var(--signal)]">{String(i + 1).padStart(2, "0")}</span><span><Rich text={item} /></span></li>)}</ol>
}

function PostCard({ post }: { post: Post }) {
  return (
    <a href={`/blogas/${post.slug}/`} className="group flex h-full flex-col rounded-lg border border-foreground bg-background p-6 md:p-8">
      <span className={`${eyebrow} text-[var(--signal)]`}>{post.label} · {post.minutes} min.</span>
      <h3 className="mt-5 text-2xl font-bold leading-tight tracking-tight">{post.title}</h3>
      <p className="mt-4 mb-6 leading-relaxed text-muted-foreground">{post.description}</p>
      <span className="mt-auto inline-flex items-center gap-3 font-semibold motion-safe:transition-all group-hover:gap-5">Skaityti <ArrowRight className="size-4" aria-hidden="true" /></span>
    </a>
  )
}

export function BlogIndex() {
  return (
    <section className={`${band} bg-secondary`}>
      <div className={wrap}>
        <h2 className="sr-only">Visi straipsniai</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      </div>
    </section>
  )
}

// A short "read more" band for service and info pages.
export function RelatedArticles({ path, title = "Naudinga perskaityti" }: { path: string; title?: string }) {
  const list = (relatedPosts[path] ?? posts.slice(0, 3).map((p) => p.slug)).map((slug) => postBySlug[slug]).filter(Boolean)
  if (!list.length) return null
  return (
    <section className={`${band} bg-background`} aria-labelledby="susije-straipsniai">
      <div className={wrap}>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className={eyebrow}><span className="mr-3 text-[var(--signal)]">Blogas</span>Patarimai</p>
            <h2 id="susije-straipsniai" className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.05] tracking-[-.04em]">{title}</h2>
          </div>
          <a href="/blogas/" className="inline-flex min-h-12 items-center gap-3 border-b border-current py-2 font-semibold">Visi straipsniai <ArrowRight className="size-4" aria-hidden="true" /></a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {list.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      </div>
    </section>
  )
}

export function BlogPost({ slug }: { slug: string }) {
  const post = postBySlug[slug]
  if (!post) return null
  const others = posts.filter((p) => p.slug !== slug).slice(0, 3)
  return (
    <>
      <article className={`${band} bg-background`}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
          <aside className="lg:col-span-3">
            <div className="space-y-2 text-sm text-muted-foreground lg:sticky lg:top-28">
              <p>Autorius: <span className="font-semibold text-foreground">{blogAuthor}</span></p>
              <p>Paskelbta: <time dateTime={post.date}>{formatDate(post.date)}</time></p>
              {post.updated && <p>Atnaujinta: <time dateTime={post.updated}>{formatDate(post.updated)}</time></p>}
              <p>Skaitymo laikas: {post.minutes} min.</p>
              <nav aria-label="Straipsnio turinys" className="hidden pt-6 lg:block">
                <p className={`${eyebrow} mb-3 text-foreground`}>Turinys</p>
                <ol className="space-y-2">
                  {post.sections.map((s, i) => <li key={s.h}><a href={`#s${i + 1}`} className="hover:underline">{s.h}</a></li>)}
                  {post.faq && <li><a href="#klausimai" className="hover:underline">Dažni klausimai</a></li>}
                </ol>
              </nav>
            </div>
          </aside>
          <div className="min-w-0 max-w-[72ch] lg:col-span-8">
            <div className="mb-12 rounded-lg border border-foreground bg-secondary p-6 md:p-8">
              <h2 className={`${eyebrow} mb-4 text-[var(--signal)]`}>Trumpai</h2>
              <ul className="space-y-3">
                {post.summary.map((item) => <li key={item} className="flex gap-3 text-lg leading-relaxed"><span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-foreground" />{item}</li>)}
              </ul>
            </div>
            {post.sections.map((section, i) => (
              <section key={section.h} id={`s${i + 1}`} className="mb-12 scroll-mt-28">
                <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight">{section.h}</h2>
                <div className="space-y-5">{section.body.map((block, j) => <BlockView key={j} block={block} />)}</div>
              </section>
            ))}
            {post.faq && (
              <section id="klausimai" className="mb-12 scroll-mt-28">
                <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight">Dažni klausimai</h2>
                <div className="border-b border-foreground">
                  {post.faq.map((f) => (
                    <details key={f.q} className="group border-t border-foreground">
                      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                        {f.q}<span aria-hidden="true" className="text-2xl font-normal group-open:rotate-45">+</span>
                      </summary>
                      <p className="pb-5 text-lg leading-relaxed text-muted-foreground">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
            <aside className="rounded-lg bg-foreground p-6 text-background md:p-8" aria-label="Susijusios paslaugos">
              <p className={`${eyebrow} mb-4`}>Susiję puslapiai</p>
              <ul className="space-y-1">
                {post.related.map((r) => <li key={r.href}><a href={r.href} className="inline-flex min-h-11 items-center gap-3 font-semibold hover:underline">{r.text} <ArrowRight className="size-4" aria-hidden="true" /></a></li>)}
              </ul>
            </aside>
          </div>
        </div>
      </article>
      <section className={`${band} bg-secondary`} aria-labelledby="kiti-straipsniai">
        <div className={wrap}>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 id="kiti-straipsniai" className="text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.05] tracking-[-.04em]">Kiti straipsniai</h2>
            <a href="/blogas/" className="inline-flex min-h-12 items-center gap-3 border-b border-current py-2 font-semibold">Visi straipsniai <ArrowRight className="size-4" aria-hidden="true" /></a>
          </div>
          <div className="grid gap-6 md:grid-cols-3">{others.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        </div>
      </section>
    </>
  )
}
