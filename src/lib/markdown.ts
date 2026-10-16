import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeShiki from '@shikijs/rehype'
import rehypeStringify from 'rehype-stringify'
import { toString } from 'hast-util-to-string'
import type { Root as MdastRoot, Blockquote, Paragraph, Text } from 'mdast'
import type { Root as HastRoot, Element, ElementContent, RootContent } from 'hast'
import { slugify } from './slugify'

// Server-side Markdown → HTML for blog posts: GFM (tables, lists, links), GitHub-style
// callouts, heading ids for the table of contents and Shiki syntax highlighting.

export interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

const CALLOUT_LABELS: Record<string, { label: string; tone: string }> = {
  TIP: { label: 'Tóm tắt', tone: 'tip' },
  NOTE: { label: 'Ghi chú', tone: 'note' },
  IMPORTANT: { label: 'Ghi chú', tone: 'note' },
  WARNING: { label: 'Lưu ý', tone: 'warning' },
  CAUTION: { label: 'Lưu ý', tone: 'warning' },
}

// "> [!TIP]" blockquotes become <aside class="callout callout-tip"> with a label
function remarkCallouts() {
  return (tree: MdastRoot) => {
    const walk = (node: { children?: unknown[] }) => {
      node.children?.forEach((child) => {
        const quote = child as Blockquote
        if (quote.type === 'blockquote') {
          const first = quote.children[0] as Paragraph | undefined
          const text = first?.type === 'paragraph' ? (first.children[0] as Text | undefined) : undefined
          const match = text?.type === 'text' ? text.value.match(/^\[!(TIP|NOTE|IMPORTANT|WARNING|CAUTION)\]\s*/i) : null
          if (match && text) {
            const { label, tone } = CALLOUT_LABELS[match[1].toUpperCase()]
            text.value = text.value.slice(match[0].length)
            quote.data = { hName: 'aside', hProperties: { className: ['callout', `callout-${tone}`], 'data-label': label } }
          }
        }
        walk(child as { children?: unknown[] })
      })
    }
    walk(tree)
  }
}

const isElement = (node: RootContent | ElementContent): node is Element => node.type === 'element'

// Demotes h1 to h2 (the post title is the page's only h1), adds ids to headings,
// collects the table of contents and frames code blocks with a language label + copy button
function rehypeBlogStructure(toc: TocItem[]) {
  return (tree: HastRoot) => {
    const used = new Map<string, number>()
    const walk = (parent: HastRoot | Element) => {
      parent.children.forEach((node, index) => {
        if (!isElement(node)) return

        if (node.tagName === 'h1') node.tagName = 'h2'
        if (node.tagName === 'h2' || node.tagName === 'h3') {
          const text = toString(node)
          const base = slugify(text) || 'section'
          const count = used.get(base) ?? 0
          used.set(base, count + 1)
          const id = count === 0 ? base : `${base}-${count}`
          node.properties = { ...node.properties, id }
          toc.push({ id, text, level: node.tagName === 'h2' ? 2 : 3 })
          return
        }

        const code = node.tagName === 'pre' ? node.children.find(isElement) : undefined
        if (code?.tagName === 'code') {
          const langClass = ((code.properties?.className as string[] | undefined) ?? []).find((c) => c.startsWith('language-'))
          const lang = langClass?.replace('language-', '') ?? 'text'
          parent.children[index] = {
            type: 'element',
            tagName: 'div',
            properties: { className: ['code-block'] },
            children: [
              {
                type: 'element',
                tagName: 'div',
                properties: { className: ['code-block-header'] },
                children: [
                  { type: 'element', tagName: 'span', properties: {}, children: [{ type: 'text', value: lang }] },
                  {
                    type: 'element',
                    tagName: 'button',
                    properties: { type: 'button', className: ['copy-code'] },
                    children: [{ type: 'text', value: 'copy' }],
                  },
                ],
              },
              node,
            ],
          }
          return
        }

        walk(node)
      })
    }
    walk(tree)
  }
}

export async function renderMarkdown(markdown: string): Promise<{ html: string; toc: TocItem[] }> {
  const toc: TocItem[] = []
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkCallouts)
    .use(remarkRehype)
    .use(rehypeBlogStructure, toc)
    .use(rehypeShiki, {
      theme: 'github-light',
      langs: ['tsx', 'jsx', 'typescript', 'javascript', 'json', 'sql', 'bash'],
      defaultLanguage: 'text',
      fallbackLanguage: 'text',
    })
    .use(rehypeStringify)
    .process(markdown)

  return { html: String(file), toc }
}
