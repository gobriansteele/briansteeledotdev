'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Image from 'next/image'
import Link from 'next/link'

const components = {
  img: (props: any) => (
    <Image
      {...props}
      width={800}
      height={600}
      className="rounded-lg"
      alt={props.alt || ''}
    />
  ),
  a: (props: any) => (
    <Link
      {...props}
      className="text-accent-primary hover:text-accent-hover underline"
    />
  ),
  h1: (props: any) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold mt-4 mb-2" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-accent-primary pl-4 italic my-4" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-slate-800 px-1 py-0.5 rounded text-sm" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto my-4" {...props} />
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
