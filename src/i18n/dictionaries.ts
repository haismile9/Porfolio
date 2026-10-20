import type { Locale } from './config'

// Interface strings shared across pages. Page-specific copy lives with each page.
export const dictionaries = {
  vi: {
    htmlLang: 'vi',
    ogLocale: 'vi_VN',
    languageName: 'Tiếng Việt',
    footer: { cv: 'CV (PDF)', rss: 'RSS' },
    sidebar: {
      name: 'haismile',
      bio: 'Trên con đường trở thành một lập trình viên giỏi.',
      downloadCv: 'Tải CV',
      elsewhere: 'Liên kết',
      topics: 'Chủ đề',
      archive: 'Lưu trữ',
      month: (month: number, year: string) => `Tháng ${month}, ${year}`,
    },
    blog: {
      searchPlaceholder: 'Tìm theo tiêu đề, nội dung tóm tắt hoặc tag...',
      searchLabel: 'Tìm bài viết',
      topicLabel: 'Chủ đề:',
      allTopics: 'Tất cả',
      archiveLabel: 'Lưu trữ:',
      archiveMonth: (month: string, year: string) => `tháng ${month}/${year}`,
      showAll: '(xem tất cả)',
      noResults: 'Không tìm thấy bài viết nào.',
    },
  },
  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    languageName: 'English',
    footer: { cv: 'CV (PDF)', rss: 'RSS' },
    sidebar: {
      name: 'haismile',
      bio: 'On the way to becoming a good developer.',
      downloadCv: 'Download CV',
      elsewhere: 'Elsewhere',
      topics: 'Topics',
      archive: 'Archive',
      month: (month: number, year: string) =>
        `${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month - 1]} ${year}`,
    },
    blog: {
      searchPlaceholder: 'Search titles, summaries or tags...',
      searchLabel: 'Search posts',
      topicLabel: 'Topics:',
      allTopics: 'All',
      archiveLabel: 'Archive:',
      archiveMonth: (month: string, year: string) => `${month}/${year}`,
      showAll: '(show all)',
      noResults: 'No posts found.',
    },
  },
} satisfies Record<Locale, unknown>

export type Dictionary = (typeof dictionaries)[Locale]

export const getDictionary = (lang: Locale): Dictionary => dictionaries[lang]
