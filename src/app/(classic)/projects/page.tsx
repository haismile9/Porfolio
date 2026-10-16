import Image from 'next/image'
import { projects } from '@/data/projects'

const displayUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

export default function ProjectsPage() {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-bold leading-tight">Projects</h1>
        <p className="mt-2 font-bold">Things I have built</p>
        <p className="mt-3">
          A mix of client work, side projects and school projects, newest first. Source code for most of them is on{' '}
          <a
            href="https://github.com/haismile9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-classic-accent underline underline-offset-2 hover:no-underline"
          >
            GitHub
          </a>
          .
        </p>
      </header>

      <div className="divide-y divide-paper-border border-t border-paper-border">
        {projects.map((project) => (
          <article key={project.title} className="py-6 sm:flex sm:gap-6">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden border border-paper-border bg-paper-code sm:w-48"
            >
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                fill
                sizes="(min-width: 640px) 192px, 100vw"
                className="object-cover"
              />
            </a>
            <div className="mt-3 sm:mt-0">
              <h2 className="text-xl font-bold leading-snug">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-classic-accent hover:underline"
                >
                  {project.title}
                </a>
              </h2>
              <p className="mt-1">{project.description}</p>
              <p className="mt-1 font-fira text-[13px] text-ink-muted">{project.technologies.join(' · ')}</p>
              <p className="mt-1 font-fira text-[13px] text-ink-muted">{displayUrl(project.link)}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
