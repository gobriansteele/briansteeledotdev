import { serialize } from 'next-mdx-remote/serialize'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export async function serializeMDX(content: string) {
  const mdxSource = await serialize(content, {
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
  })

  return mdxSource
}

export function getReadingTime(content: string) {
  return readingTime(content)
}

export function extractFrontmatter(content: string) {
  const { data, content: markdownContent } = matter(content)
  return { frontmatter: data, content: markdownContent }
}
