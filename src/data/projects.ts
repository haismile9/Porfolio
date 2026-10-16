import type { Locale } from '@/i18n/config'

// Projects shown on the home and projects pages, newest first
export interface Project {
  title: string
  description: Record<Locale, string>
  image: string
  technologies: string[]
  link: string
}

export const projects: Project[] = [
  {
    title: 'Portfolio',
    description: {
      vi: 'Chính trang web bạn đang xem.',
      en: "This website you're looking at.",
    },
    image: '/images/Porfolio.png',
    technologies: ['Next.js', 'React', 'Firebase'],
    link: 'https://haismile.dev/',
  },
  {
    title: 'LUMIweb E-commerce',
    description: {
      vi: 'Web thương mại điện tử bán kính mắt, có trang quản trị.',
      en: 'E-commerce web app with an admin dashboard.',
    },
    image: '/images/Lumi.png',
    technologies: ['Next.js', 'React', 'NestJS', 'PostgreSQL', 'MinIO', 'Redis'],
    link: 'https://lumieyewear.vn/',
  },
  {
    title: 'Clicon - eCommerce Store',
    description: {
      vi: 'Cửa hàng online bán thiết bị điện tử và công nghệ.',
      en: 'Online e-commerce store for electronics and technology devices.',
    },
    image: '/images/ecommerce.png',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://ecommerce.haismile.dev/',
  },
  {
    title: 'H-Task',
    description: {
      vi: 'Ứng dụng quản lý công việc theo kiểu bảng Kanban.',
      en: 'Kanban task management web app to organize workflows.',
    },
    image: '/images/H-task.png',
    technologies: ['React', 'Laravel', 'MySQL'],
    link: 'https://github.com/haismile9/Web_H-task',
  },
  {
    title: 'Social Media App',
    description: {
      vi: 'Ứng dụng mạng xã hội thời gian thực, có chat và đăng bài.',
      en: 'Real-time social media app with chat and posts.',
    },
    image: '/images/Social_media_app.png',
    technologies: ['Flutter', 'Firebase'],
    link: 'https://github.com/haismile9/social_media_app',
  },
  {
    title: 'Cellphones App',
    description: {
      vi: 'Ứng dụng bán điện thoại trên Android, backend viết bằng PHP và MySQL.',
      en: 'Mobile e-commerce app for Android with a PHP & MySQL backend.',
    },
    image: '/images/Cellphone.png',
    technologies: ['Java', 'PHP', 'MySQL'],
    link: 'https://github.com/haismile9/Cellphones_app',
  },
]
