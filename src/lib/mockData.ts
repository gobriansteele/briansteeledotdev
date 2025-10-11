import { Post, Tag, PostWithTags } from '@/types/blog'

// Mock tags
export const mockTags: Tag[] = [
  {
    id: '1',
    name: 'AI',
    slug: 'ai',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Leadership',
    slug: 'leadership',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Engineering',
    slug: 'engineering',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Machine Learning',
    slug: 'machine-learning',
    created_at: '2024-01-01T00:00:00Z',
  },
]

// Mock posts with MDX content
export const mockPosts: PostWithTags[] = [
  {
    id: '1',
    slug: 'building-ai-powered-education',
    title: 'Building AI-Powered Education: Lessons from the Front Lines',
    excerpt: 'Reflections on leading AI initiatives in the education technology space and what we\'ve learned about bringing cutting-edge AI to production.',
    content: `# Building AI-Powered Education

As Head of AI at Honor Education, I've had the privilege of leading our team through the exciting and challenging journey of integrating artificial intelligence into our educational platform.

## The Challenge

The education space presents unique challenges for AI implementation:

- **High stakes**: Student outcomes matter
- **Diverse users**: From students to teachers to administrators
- **Scale**: Millions of interactions daily
- **Accuracy**: Wrong answers have real consequences

## Our Approach

We've focused on three key areas:

1. **Responsible AI**: Ensuring our models are fair, transparent, and accountable
2. **Human-in-the-loop**: AI augments, not replaces, human decision-making
3. **Continuous learning**: Our systems improve based on real-world feedback

\`\`\`python
# Example: Simple AI feedback loop
def process_student_response(response: str) -> Feedback:
    ai_suggestion = model.predict(response)
    teacher_review = get_teacher_input(ai_suggestion)

    # Learn from teacher corrections
    if teacher_review != ai_suggestion:
        update_model(response, teacher_review)

    return teacher_review
\`\`\`

## Key Takeaways

The most important lesson? **Start small and iterate**. Don't try to AI all the things at once. Find a specific problem, solve it well, then expand.

---

*This is part of a series on AI leadership in education. Stay tuned for more.*`,
    cover_image: null,
    published: true,
    published_at: '2024-03-15T10:00:00Z',
    created_at: '2024-03-10T10:00:00Z',
    updated_at: '2024-03-15T10:00:00Z',
    author: 'Brian Steele',
    post_tags: [
      { tags: mockTags[0] }, // AI
      { tags: mockTags[1] }, // Leadership
    ],
  },
  {
    id: '2',
    slug: 'engineering-manager-to-ai-leader',
    title: 'From Engineering Manager to AI Leader: A Career Pivot',
    excerpt: 'How I transitioned from managing engineering teams to leading AI research and development, and what surprised me along the way.',
    content: `# From Engineering Manager to AI Leader

Making the leap from engineering management to AI leadership wasn't something I planned—it evolved naturally as our organization's needs grew.

## The Transition

My background in full-stack development gave me a solid foundation, but leading AI initiatives required learning entirely new skillsets:

- Understanding ML model architectures
- Evaluating research papers
- Building AI-specific infrastructure
- Managing data pipelines at scale

## What Stayed the Same

Interestingly, many principles from engineering management transferred directly:

- **Clear communication** is still critical
- **Team building** matters more than ever
- **Product thinking** guides technical decisions
- **Iterative development** applies to ML too

## What Changed

The biggest difference? **Uncertainty**. Traditional software engineering has relatively predictable outcomes. With AI/ML:

- Models don't always work as expected
- Research directions can hit dead ends
- "Good enough" is harder to define
- Explainability is a constant challenge

## Advice for Others

If you're considering a similar transition:

1. Stay hands-on with code
2. Read research papers regularly
3. Build small projects to understand the tech
4. Find mentors already in AI leadership
5. Remember: leadership skills transfer

The intersection of engineering leadership and AI is one of the most exciting places to be in tech right now.`,
    cover_image: null,
    published: true,
    published_at: '2024-03-10T10:00:00Z',
    created_at: '2024-03-05T10:00:00Z',
    updated_at: '2024-03-10T10:00:00Z',
    author: 'Brian Steele',
    post_tags: [
      { tags: mockTags[0] }, // AI
      { tags: mockTags[1] }, // Leadership
      { tags: mockTags[2] }, // Engineering
    ],
  },
  {
    id: '3',
    slug: 'full-stack-to-ml-ops',
    title: 'Full-Stack Development Meets MLOps',
    excerpt: 'What full-stack engineers need to know about deploying and maintaining machine learning models in production.',
    content: `# Full-Stack Development Meets MLOps

As someone who came from a traditional full-stack background, I've learned that deploying ML models is both similar to and radically different from deploying web apps.

## Similarities

If you're a full-stack developer, you already know:

- API design and versioning
- Database optimization
- Monitoring and logging
- CI/CD pipelines
- Infrastructure as code

All of these apply to ML systems!

## Key Differences

But here's what's different:

### 1. Model Drift

Unlike traditional software, ML models degrade over time as data distributions change. You need:

\`\`\`typescript
// Monitor model performance continuously
async function checkModelHealth() {
  const recentPredictions = await getPredictions(last7Days)
  const accuracy = calculateAccuracy(recentPredictions)

  if (accuracy < THRESHOLD) {
    alertTeam("Model performance degraded")
    triggerRetraining()
  }
}
\`\`\`

### 2. Data Pipelines

Your data infrastructure becomes critical. Bad data = bad models, every time.

### 3. Reproducibility

You need to version everything: code, data, model weights, even hyperparameters.

## The Good News

Modern MLOps tools make this easier than ever. If you understand Docker, Kubernetes, and monitoring, you're 80% there.

The remaining 20%? That's the fun part—learning the ML-specific concerns that make this field unique.`,
    cover_image: null,
    published: true,
    published_at: '2024-03-05T10:00:00Z',
    created_at: '2024-03-01T10:00:00Z',
    updated_at: '2024-03-05T10:00:00Z',
    author: 'Brian Steele',
    post_tags: [
      { tags: mockTags[0] }, // AI
      { tags: mockTags[2] }, // Engineering
      { tags: mockTags[3] }, // Machine Learning
    ],
  },
]

// Helper function to get posts (mimics Supabase query)
export function getMockPosts(options?: {
  limit?: number
  tag?: string
}): PostWithTags[] {
  let posts = [...mockPosts]

  // Filter by tag if specified
  if (options?.tag) {
    posts = posts.filter((post) =>
      post.post_tags.some((pt) => pt.tags.slug === options.tag)
    )
  }

  // Limit results
  if (options?.limit) {
    posts = posts.slice(0, options.limit)
  }

  return posts
}

// Get single post by slug
export function getMockPost(slug: string): PostWithTags | undefined {
  return mockPosts.find((post) => post.slug === slug)
}
