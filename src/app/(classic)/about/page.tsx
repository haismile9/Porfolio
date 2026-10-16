import Image from 'next/image'
import Link from 'next/link'

const experience = [
  {
    role: 'Full-stack Developer',
    company: 'Hoang Phuc Thanh Immigration & Trade Co., Ltd',
    period: 'Sep 2025 – Present',
    project: 'Real-time Medical Device Management System',
    points: [
      'Architected the core backend with Node.js (Express.js).',
      'Implemented real-time alerting via Socket.io.',
      'Built an interactive dashboard with React.js.',
      'Optimized PostgreSQL queries, cutting response time by about 40%.',
      'Managed Ubuntu servers, Nginx and Docker Compose.',
    ],
  },
  {
    role: 'Intern Front-end Developer',
    company: 'Hoang Phuc Thanh Immigration & Trade Co., Ltd',
    period: 'Jun 2025 – Sep 2025',
    project: 'CRM System',
    points: [
      'Built a responsive UI with React.js and Tailwind CSS.',
      'Integrated RESTful APIs, improving team efficiency by about 20%.',
    ],
  },
]

const skills = [
  { group: 'Frontend', items: 'JavaScript, TypeScript, HTML5, CSS3, React.js, Next.js, Vite, Tailwind CSS, Framer Motion' },
  { group: 'Backend', items: 'Node.js, Express.js, NestJS, Prisma' },
  { group: 'Databases', items: 'PostgreSQL, MySQL, MS SQL Server, Redis' },
  { group: 'APIs', items: 'RESTful API, Swagger, Postman, Socket.io' },
  { group: 'DevOps', items: 'Docker, Docker Compose, CI/CD, Nginx, Linux (Ubuntu), Windows Server, MinIO S3' },
  { group: 'Version control', items: 'Git, GitHub' },
]

export default function AboutPage() {
  return (
    <>
      <header className="mb-8">
        <Image
          src="/images/Smile_logo.png"
          alt="Smile logo"
          width={88}
          height={88}
          className="float-right ml-4 mb-2 h-[88px] w-[88px] object-contain xl:hidden"
          priority
        />
        <h1 className="text-4xl font-bold leading-tight">About</h1>
        <p className="mt-2 font-bold">Full-stack Developer based in Ho Chi Minh City, Vietnam</p>
      </header>

      <p className="my-4">
        Hi, I&apos;m Hong Hai, though most people online know me as Smile. I build things for the web, and
        sometimes just for the fun of it.
      </p>
      <p className="my-4">
        I started coding because I wanted to understand how things work under the hood. That curiosity turned
        into a career. These days I work across the stack: React and Next.js on the front, Node.js and NestJS on
        the back, PostgreSQL and Redis for data, and Docker and Nginx to ship it all. I write about what I learn
        on the <Link href="/blog" className="text-classic-accent underline underline-offset-2 hover:no-underline">blog</Link>.
      </p>

      <h2 className="text-2xl font-bold leading-snug mt-10 mb-3">Experience</h2>
      {experience.map((job) => (
        <section key={job.period} className="my-6">
          <h3 className="text-xl font-bold leading-snug">
            {job.role}, <span className="font-normal">{job.company}</span>
          </h3>
          <p className="font-fira text-[13px] text-ink-muted">{job.period}</p>
          <p className="mt-2 italic">{job.project}</p>
          <ul className="mt-2 list-disc pl-7 space-y-1">
            {job.points.map((point) => (
              <li key={point} className="pl-1">
                {point}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <h2 className="text-2xl font-bold leading-snug mt-10 mb-3">Education</h2>
      <h3 className="text-xl font-bold leading-snug">Van Lang Sai Gon College</h3>
      <p className="font-fira text-[13px] text-ink-muted">2023 – 2025</p>
      <p className="mt-2">Information Technology, GPA 3.17 / 4.0.</p>
      <ul className="mt-2 list-disc pl-7 space-y-1">
        <li className="pl-1">3rd Prize, Altair Engineering Challenge 2025</li>
        <li className="pl-1">Outstanding Student Award (2023 – 2024)</li>
      </ul>

      <h2 className="text-2xl font-bold leading-snug mt-10 mb-3">Skills</h2>
      <dl className="space-y-2">
        {skills.map((skill) => (
          <div key={skill.group} className="sm:flex sm:gap-4">
            <dt className="font-bold sm:w-36 shrink-0">{skill.group}</dt>
            <dd>{skill.items}</dd>
          </div>
        ))}
      </dl>

      <h2 className="text-2xl font-bold leading-snug mt-10 mb-3">Outside of work</h2>
      <p className="my-4">
        I go to the gym, play football, play the guitar and listen to a lot of rap. The philosophy I try to
        stick to: build things that matter, keep it simple, and smile while doing it.
      </p>

      <h2 className="text-2xl font-bold leading-snug mt-10 mb-3">Resume</h2>
      <p className="my-4">
        You can{' '}
        <a
          href="/CV/FullStack.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-classic-accent underline underline-offset-2 hover:no-underline"
        >
          download my CV as a PDF
        </a>
        , or reach me through the{' '}
        <Link href="/contact" className="text-classic-accent underline underline-offset-2 hover:no-underline">
          contact page
        </Link>
        .
      </p>
    </>
  )
}
