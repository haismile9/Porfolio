// Projects shown on the home and projects pages, newest first
export interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  link: string
}

export const projects: Project[] = [
  {
    title: 'Portfolio',
    description: "This website you're looking at.",
    image: '/images/Porfolio.png',
    technologies: ['Next.js', 'React', 'Firebase'],
    link: 'https://haismile.dev/',
  },
  {
    title: 'LUMIweb E-commerce',
    description: 'E-commerce web app with an admin dashboard.',
    image: '/images/Lumi.png',
    technologies: ['Next.js', 'React', 'NestJS', 'PostgreSQL', 'MinIO', 'Redis'],
    link: 'https://lumieyewear.vn/',
  },
  {
    title: 'Clicon - eCommerce Store',
    description: 'Online e-commerce store for electronics and technology devices.',
    image: '/images/ecommerce.png',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://ecommerce.haismile.dev/',
  },
  {
    title: 'H-Task',
    description: 'Kanban task management web app to organize workflows.',
    image: '/images/H-task.png',
    technologies: ['React', 'Laravel', 'MySQL'],
    link: 'https://github.com/haismile9/Web_H-task',
  },
  {
    title: 'Social Media App',
    description: 'Real-time social media app with chat and posts.',
    image: '/images/Social_media_app.png',
    technologies: ['Flutter', 'Firebase'],
    link: 'https://github.com/haismile9/social_media_app',
  },
  {
    title: 'Cellphones App',
    description: 'Mobile e-commerce app for Android with a PHP & MySQL backend.',
    image: '/images/Cellphone.png',
    technologies: ['Java', 'PHP', 'MySQL'],
    link: 'https://github.com/haismile9/Cellphones_app',
  },
]
