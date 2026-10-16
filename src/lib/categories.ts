// Blog topics, shared by the blog page and the site sidebar
export const categories = [
  { id: 'nextjs', label: 'Next.js' },
  { id: 'backend', label: 'Backend & Microservices' },
  { id: 'database', label: 'Database & SQL' },
  { id: 'architecture', label: 'System Architecture' },
]

export const getCategoryLabel = (id: string) => categories.find((c) => c.id === id)?.label ?? 'Technical'
