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
        role: 'Thực tập sinh Front-end Developer',
        company: 'Hoang Phuc Thanh Immigration & Trade Co., Ltd',
        period: '06/2025 – 09/2025',
        project: 'Hệ thống CRM',
        points: [
          'Xây dựng giao diện responsive bằng React.js và Tailwind CSS.',
          'Tích hợp RESTful API, giúp nhóm làm việc hiệu quả hơn khoảng 20%.',
        ],
      },
    ],
    schools: [
      {
        name: 'Đại học Công nghệ Kỹ thuật TP.HCM (HCMUTE)',
        period: 'Đang học',
        major: 'Công nghệ thông tin (liên thông).',
        awards: [],
      },
      {
        name: 'Cao đẳng Văn Lang Sài Gòn',
        period: '2023 – 2025',
        major: 'Công nghệ thông tin, GPA 3.17 / 4.0.',
        awards: ['Giải Ba, Altair Engineering Challenge 2025', 'Sinh viên xuất sắc (2023 – 2024)'],
      },
    ],
    skillGroups: ['Frontend', 'Backend', 'Cơ sở dữ liệu', 'API', 'DevOps', 'Quản lý mã nguồn'],
  },
  en: {
    title: 'About',
    subtitle: 'Full-stack Developer based in Ho Chi Minh City, Vietnam',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
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
        role: 'Front-end Developer Intern',
        company: 'Hoang Phuc Thanh Immigration & Trade Co., Ltd',
        period: 'Jun 2025 – Sep 2025',
        project: 'CRM System',
        points: [
          'Built a responsive UI with React.js and Tailwind CSS.',
          'Integrated RESTful APIs, improving team efficiency by about 20%.',
        ],
      },
    ],
    schools: [
      {
        name: 'HCMUTE, Ho Chi Minh City',
        period: 'In progress',
        major: "Information Technology (college-to-bachelor's program).",
        awards: [],
      },
      {
        name: 'Van Lang Sai Gon College',
        period: '2023 – 2025',
        major: 'Information Technology, GPA 3.17 / 4.0.',
        awards: ['3rd Prize, Altair Engineering Challenge 2025', 'Outstanding Student Award (2023 – 2024)'],
      },
    ],
    skillGroups: ['Frontend', 'Backend', 'Databases', 'APIs', 'DevOps', 'Version control'],
  },
} satisfies Record<Locale, unknown>

// Same order as copy[lang].skillGroups
const skillItems = [
  'JavaScript, TypeScript, HTML5, CSS3, React.js, Next.js, Vite, Tailwind CSS',
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
          <p className="my-4">Chào bạn, mình là Nguyễn Hồng Hải, tác giả của blog này.</p>
          <p className="my-4">
            Mình lớn lên ở quê, và may mắn được ba mẹ cho tiếp xúc với máy tính sớm hơn bạn bè cùng trang lứa. Như hầu
            hết thằng con nít có máy tính hồi đó, mình dùng nó để… chơi game. Warcraft, Half-Life 2, Đột Kích,
            FIFA Online 3, 3Q, chơi đủ hết.
          </p>
          <p className="my-4">
            Cái làm mình mê code là những lúc học được một thứ mới và hiểu ra nó vận hành thế nào: logic chạy ra sao, vì
            sao viết vầy mà không viết kia. Mấy khoảnh khắc &ldquo;à, ra là vậy&rdquo; đó là thứ giữ mình lại với nghề.{' '}
            <Link href={href('/blog')} className={linkClass}>Blog</Link> này cũng để ghi lại chúng, viết lại cho dễ
            hiểu nhất có thể.
          </p>
          <p className="my-4">
            Mình tốt nghiệp cao đẳng, đi làm full-stack được hơn một năm, học được rất nhiều thứ mà ngồi trên ghế nhà
            trường không có. Nhưng càng làm càng thấy kiến thức nền của mình còn mỏng, nên mình quyết định học liên
            thông lên Đại học Công nghệ Kỹ thuật TP.HCM (HCMUTE). Không phải để lấy cái bằng cho đẹp, mà để đứng vững
            hơn trên con đường này.
          </p>
          <p className="my-4">
            Ngoài giờ làm, mình đá bóng, tập gym, đánh guitar, và nghe podcast.
          </p>
        </>
      ) : (
        <>
          <p className="my-4">Hi, I&apos;m Nguyen Hong Hai, the author of this blog.</p>
          <p className="my-4">
            I grew up in the countryside, and I was lucky that my parents let me use a computer earlier than most kids
            my age. Like pretty much every kid with a computer back then, I used it to… play games. Warcraft, Half-Life
            2, CrossFire, FIFA Online 3, 3Q, I played them all.
          </p>
          <p className="my-4">
            What made me fall for coding is the moment I learn something new and understand how it works: how the
            logic flows, why you write it this way and not that way. Those &ldquo;oh, so that&apos;s how it
            works&rdquo; moments are what keep me in this field. The{' '}
            <Link href={href('/blog')} className={linkClass}>blog</Link> is where I write them down, as simply as I
            can (in Vietnamese).
          </p>
          <p className="my-4">
            I graduated from college and have been working as a full-stack developer for a little over a year,
            learning a lot that school never taught me. But the more I worked, the more I saw how thin my fundamentals
            were, so I decided to continue to a bachelor&apos;s degree at HCMUTE. Not for a nicer diploma, but to stand
            on firmer ground on this path.
          </p>
          <p className="my-4">
            Outside of work, I play football, go to the gym, play the guitar, and listen to podcasts.
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
      {t.schools.map((school) => (
        <section key={school.name} className="my-6">
          <h3 className="text-xl font-bold leading-snug">{school.name}</h3>
          <p className="font-fira text-[13px] text-ink-muted">{school.period}</p>
          <p className="mt-2">{school.major}</p>
          {school.awards.length > 0 && (
            <ul className="mt-2 list-disc pl-7 space-y-1">
              {school.awards.map((award) => (
                <li key={award} className="pl-1">
                  {award}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <h2 className="text-2xl font-bold leading-snug mt-10 mb-3">{t.skills}</h2>
      <dl className="space-y-2">
        {t.skillGroups.map((group, i) => (
          <div key={group} className="sm:flex sm:gap-4">
            <dt className="font-bold sm:w-44 shrink-0">{group}</dt>
            <dd>{skillItems[i]}</dd>
          </div>
        ))}
      </dl>

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
