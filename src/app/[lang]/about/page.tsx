import Image from 'next/image'
import Link from 'next/link'
import { localePath, type Locale } from '@/i18n/config'

const linkClass = 'text-classic-accent underline underline-offset-2 hover:no-underline'

const copy = {
  vi: {
    title: 'Giới thiệu',
    subtitle: 'Full-stack Developer ở TP. Hồ Chí Minh',
    experience: 'Kinh nghiệm',
    education: 'Học vấn',
    skills: 'Kỹ năng',
    outsideWork: 'Ngoài giờ làm',
    resume: 'CV',
    jobs: [
      {
        role: 'Full-stack Developer',
        company: 'Hoang Phuc Thanh Immigration & Trade Co., Ltd',
        period: '09/2025 – nay',
        project: 'Hệ thống quản lý thiết bị y tế thời gian thực',
        points: [
          'Thiết kế phần backend chính với Node.js (Express.js).',
          'Làm tính năng cảnh báo thời gian thực bằng Socket.io.',
          'Xây dựng dashboard tương tác bằng React.js.',
          'Tối ưu truy vấn PostgreSQL, giảm thời gian phản hồi khoảng 40%.',
          'Quản lý server Ubuntu, Nginx và Docker Compose.',
        ],
      },
      {
        role: 'Thực tập sinh Front-end',
        company: 'Hoang Phuc Thanh Immigration & Trade Co., Ltd',
        period: '06/2025 – 09/2025',
        project: 'Hệ thống CRM',
        points: [
          'Xây dựng giao diện responsive bằng React.js và Tailwind CSS.',
          'Tích hợp RESTful API, giúp nhóm làm việc hiệu quả hơn khoảng 20%.',
        ],
      },
    ],
    school: 'Cao đẳng Văn Lang Sài Gòn',
    major: 'Công nghệ thông tin, GPA 3.17 / 4.0.',
    awards: ['Giải Ba, Altair Engineering Challenge 2025', 'Sinh viên xuất sắc (2023 – 2024)'],
    skillGroups: ['Frontend', 'Backend', 'Cơ sở dữ liệu', 'API', 'DevOps', 'Quản lý mã nguồn'],
  },
  en: {
    title: 'About',
    subtitle: 'Full-stack Developer based in Ho Chi Minh City, Vietnam',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    outsideWork: 'Outside of work',
    resume: 'Resume',
    jobs: [
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
    ],
    school: 'Van Lang Sai Gon College',
    major: 'Information Technology, GPA 3.17 / 4.0.',
    awards: ['3rd Prize, Altair Engineering Challenge 2025', 'Outstanding Student Award (2023 – 2024)'],
    skillGroups: ['Frontend', 'Backend', 'Databases', 'APIs', 'DevOps', 'Version control'],
  },
} satisfies Record<Locale, unknown>

// Same order as copy[lang].skillGroups
const skillItems = [
  'JavaScript, TypeScript, HTML5, CSS3, React.js, Next.js, Vite, Tailwind CSS, Framer Motion',
  'Node.js, Express.js, NestJS, Prisma',
  'PostgreSQL, MySQL, MS SQL Server, Redis',
  'RESTful API, Swagger, Postman, Socket.io',
  'Docker, Docker Compose, CI/CD, Nginx, Linux (Ubuntu), Windows Server, MinIO S3',
  'Git, GitHub',
]

export default function AboutPage({ params }: { params: { lang: Locale } }) {
  const { lang } = params
  const t = copy[lang]
  const href = (path: string) => localePath(lang, path)

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
        <h1 className="text-4xl font-bold leading-tight">{t.title}</h1>
        <p className="mt-2 font-bold">{t.subtitle}</p>
      </header>

      {lang === 'vi' ? (
        <>
          <p className="my-4">
            Chào bạn, mình là Hồng Hải, trên mạng mọi người hay gọi mình là Smile. Mình làm web, và đôi khi làm chỉ vì
            thấy vui.
          </p>
          <p className="my-4">
            Mình bắt đầu học code vì muốn hiểu mọi thứ bên dưới hoạt động ra sao, và sự tò mò đó dần thành công việc.
            Hiện mình làm cả frontend lẫn backend: React và Next.js ở phía giao diện, Node.js và NestJS ở phía server,
            PostgreSQL và Redis cho dữ liệu, Docker và Nginx để triển khai. Những gì học được mình ghi lại trên{' '}
            <Link href={href('/blog')} className={linkClass}>blog</Link>.
          </p>
        </>
      ) : (
        <>
          <p className="my-4">
            Hi, I&apos;m Hong Hai, though most people online know me as Smile. I build things for the web, and
            sometimes just for the fun of it.
          </p>
          <p className="my-4">
            I started coding because I wanted to understand how things work under the hood. That curiosity turned
            into a career. These days I work across the stack: React and Next.js on the front, Node.js and NestJS on
            the back, PostgreSQL and Redis for data, and Docker and Nginx to ship it all. I write about what I learn
            on the <Link href={href('/blog')} className={linkClass}>blog</Link> (in Vietnamese).
          </p>
        </>
      )}

      <h2 className="text-2xl font-bold leading-snug mt-10 mb-3">{t.experience}</h2>
      {t.jobs.map((job) => (
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

      <h2 className="text-2xl font-bold leading-snug mt-10 mb-3">{t.education}</h2>
      <h3 className="text-xl font-bold leading-snug">{t.school}</h3>
      <p className="font-fira text-[13px] text-ink-muted">2023 – 2025</p>
      <p className="mt-2">{t.major}</p>
      <ul className="mt-2 list-disc pl-7 space-y-1">
        {t.awards.map((award) => (
          <li key={award} className="pl-1">
            {award}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold leading-snug mt-10 mb-3">{t.skills}</h2>
      <dl className="space-y-2">
        {t.skillGroups.map((group, i) => (
          <div key={group} className="sm:flex sm:gap-4">
            <dt className="font-bold sm:w-44 shrink-0">{group}</dt>
            <dd>{skillItems[i]}</dd>
          </div>
        ))}
      </dl>

      <h2 className="text-2xl font-bold leading-snug mt-10 mb-3">{t.outsideWork}</h2>
      {lang === 'vi' ? (
        <p className="my-4">
          Mình đi tập gym, đá bóng, chơi guitar và nghe rất nhiều rap. Triết lý mình cố giữ: làm những thứ có ý nghĩa,
          giữ mọi thứ đơn giản, và luôn mỉm cười khi làm.
        </p>
      ) : (
        <p className="my-4">
          I go to the gym, play football, play the guitar and listen to a lot of rap. The philosophy I try to stick
          to: build things that matter, keep it simple, and smile while doing it.
        </p>
      )}

      <h2 className="text-2xl font-bold leading-snug mt-10 mb-3">{t.resume}</h2>
      {lang === 'vi' ? (
        <p className="my-4">
          Bạn có thể{' '}
          <a href="/CV/FullStack.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>
            tải CV của mình (PDF)
          </a>
          , hoặc liên hệ qua <Link href={href('/contact')} className={linkClass}>trang liên hệ</Link>.
        </p>
      ) : (
        <p className="my-4">
          You can{' '}
          <a href="/CV/FullStack.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>
            download my CV as a PDF
          </a>
          , or reach me through the <Link href={href('/contact')} className={linkClass}>contact page</Link>.
        </p>
      )}
    </>
  )
}
