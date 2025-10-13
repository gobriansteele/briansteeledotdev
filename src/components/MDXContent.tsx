'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
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
      src={props.src || ''}
      alt={props.alt || ''}
      width={800}
      height={600}
      className="rounded-lg"
    />
  ),
  a: (props: AnchorProps) => (
    <Link
      href={props.href || '#'}
      className="text-accent-primary hover:text-accent-hover underline"
    >
      {props.children}
    </Link>
  ),
  h1: (props: HeadingProps) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: HeadingProps) => <h2 className="text-3xl font-bold mt-6 mb-3" {...props} />,
  h3: (props: HeadingProps) => <h3 className="text-2xl font-bold mt-4 mb-2" {...props} />,
  p: (props: ParagraphProps) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props: ListProps) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
  ol: (props: ListProps) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
  blockquote: (props: BlockquoteProps) => (
    <blockquote className="border-l-4 border-accent-primary pl-4 italic my-4" {...props} />
  ),
  code: (props: CodeProps) => {
    // If code is inside a pre tag, don't add extra styling (handled by pre)
    const isInline = !props.className?.includes('language-')
    if (isInline) {
      return <code className="bg-background-tertiary text-accent-primary px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
    }
    return <code {...props} />
  },
  pre: (props: PreProps) => (
    <pre className="bg-background-tertiary p-4 rounded-lg overflow-x-auto my-4 border border-slate-700" {...props} />
  ),
}

interface MDXContentProps {
  source: MDXRemoteSerializeResult
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <MDXRemote {...source} components={components} />
    </div>
  )
}
