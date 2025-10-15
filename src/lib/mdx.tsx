import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'

type ImageProps = ComponentPropsWithoutRef<'img'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>
type CodeProps = ComponentPropsWithoutRef<'code'>
type PreProps = ComponentPropsWithoutRef<'pre'>

const components = {
  img: (props: ImageProps) => (
    <Image
      src={(props.src as string) || ''}
      alt={props.alt || ''}
      width={800}
      height={600}
      className="rounded-lg border border-border"
    />
  ),
  a: (props: AnchorProps) => (
    <Link
      href={props.href || '#'}
      className="text-accent-primary hover:text-accent-hover underline underline-offset-2"
    >
      {props.children}
    </Link>
  ),
  h1: (props: HeadingProps) => <h1 className="text-4xl font-bold mt-8 mb-4 text-foreground" {...props} />,
  h2: (props: HeadingProps) => <h2 className="text-3xl font-bold mt-6 mb-3 text-foreground" {...props} />,
  h3: (props: HeadingProps) => <h3 className="text-2xl font-semibold mt-4 mb-2 text-foreground" {...props} />,
  p: (props: ParagraphProps) => <p className="mb-4 leading-relaxed text-foreground-secondary" {...props} />,
  ul: (props: ListProps) => <ul className="list-disc list-outside ml-6 mb-4 space-y-2 text-foreground-secondary" {...props} />,
  ol: (props: ListProps) => <ol className="list-decimal list-outside ml-6 mb-4 space-y-2 text-foreground-secondary" {...props} />,
  blockquote: (props: BlockquoteProps) => (
    <blockquote className="border-l-4 border-accent-primary bg-background-secondary pl-4 py-2 italic my-4 text-foreground-secondary" {...props} />
  ),
  code: (props: CodeProps) => {
    // If code is inside a pre tag, don't add extra styling (handled by pre)
    const isInline = !props.className?.includes('language-')
    if (isInline) {
      return <code className="bg-background-secondary px-1.5 py-0.5 rounded text-sm font-mono text-foreground" {...props} />
    }
    return <code {...props} />
  },
  pre: (props: PreProps) => (
    <pre className="bg-[#2e3440] text-[#d8dee9] p-4 rounded-lg overflow-x-auto my-6 text-sm" {...props} />
  ),
}

export async function serializeMDX(content: string) {
  const { content: mdxContent } = await compileMDX({
    source: content,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: ['anchor'],
              },
            },
          ],
        ],
      },
    },
  })

  return mdxContent
}

export function getReadingTime(content: string) {
  return readingTime(content)
}

export function extractFrontmatter(content: string) {
  const { data, content: markdownContent } = matter(content)
  return { frontmatter: data, content: markdownContent }
}
