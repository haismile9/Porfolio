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
    chat: {
      open: 'Mở chat',
      openUnread: 'Mở chat (có tin nhắn mới)',
      close: 'đóng ×',
      closeTitle: 'Đóng chat',
      send: 'gửi',
      placeholder: 'Nhập tin nhắn hoặc /help',
      messageAs: (name: string) => `Nhắn tin với tên ${name}`,
      welcome:
        'Chào mừng bạn đến với phòng chat của haismile.dev! Tin nhắn ở đây là công khai. Gõ "/help" để xem các lệnh, "/cv" để tải CV của mình, hoặc cứ chào một câu nhé.',
      help: `Các lệnh có sẵn:\n  /help       - Hiện danh sách lệnh này\n  /cv         - Tải CV (PDF)\n  /blog       - Mở blog\n  /whoami     - Xem thông tin người dùng hiện tại\n  /contact    - Xem thông tin liên hệ\n  /clear      - Xoá khung chat\n  /name <tên> - Đổi tên hiển thị`,
      openingBlog: 'Đang mở blog...',
      downloadingCv: `Đang tải CV của haismile (.pdf)...\nĐường dẫn: /CV/FullStack.pdf`,
      whoami: (name: string) => `Bạn đang dùng tên: ${name}\nBạn là vị khách đặc biệt đang ghé thăm portfolio của mình!`,
      contact: `Thông tin liên hệ:\n  Email    : smilenotdev@gmail.com\n  GitHub   : @haismile9\n  LinkedIn : /in/smile9`,
      sudo: 'Hay đấy! Nhưng mình không cấp quyền sudo cho người lạ đâu. 😉',
      nameChanged: (name: string) => `Đã đổi tên thành: ${name}`,
      cooldown: (seconds: number) => `Vui lòng đợi ${seconds}s trước khi gửi tin nhắn tiếp theo.`,
      error: 'Không kết nối được tới máy chủ chat.',
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
    chat: {
      open: 'Open chat',
      openUnread: 'Open chat (new messages)',
      close: 'close ×',
      closeTitle: 'Close chat',
      send: 'send',
      placeholder: 'Write a message or /help',
      messageAs: (name: string) => `Message as ${name}`,
      welcome:
        'Welcome to the haismile.dev chat! Messages are public. Type "/help" for commands, "/cv" to download my CV, or just say hi.',
      help: `Available commands:\n  /help       - Show this help message\n  /cv         - Download Resume/CV (PDF)\n  /blog       - Open the blog\n  /whoami     - Print current user information\n  /contact    - Show contact information\n  /clear      - Clear the chat window\n  /name <username> - Change your username`,
      openingBlog: 'Opening the blog...',
      downloadingCv: `Downloading haismile's CV (.pdf)...\nFile path: /CV/FullStack.pdf`,
      whoami: (name: string) => `You are logged in as: ${name}\nYou are a special guest exploring my portfolio!`,
      contact: `Contact Information:\n  Email    : smilenotdev@gmail.com\n  GitHub   : @haismile9\n  LinkedIn : /in/smile9`,
      sudo: "Nice try! But I don't give sudo privileges to strangers. 😉",
      nameChanged: (name: string) => `Username changed to: ${name}`,
      cooldown: (seconds: number) => `Please wait ${seconds}s before sending another message.`,
      error: 'Error connecting to chat server.',
    },
  },
} satisfies Record<Locale, unknown>

export type Dictionary = (typeof dictionaries)[Locale]

export const getDictionary = (lang: Locale): Dictionary => dictionaries[lang]
