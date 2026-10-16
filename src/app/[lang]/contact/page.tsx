'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { Locale } from '@/i18n/config'

interface FormData {
  name: string
  email: string
  message: string
}

const copy = {
  vi: {
    title: 'Liên hệ',
    subtitle: 'Gửi lời chào',
    intro:
      'Dù là cơ hội việc làm, một dự án, hay câu hỏi về bài viết nào đó, mình đều vui khi nhận được tin nhắn. Email là cách nhanh nhất để liên lạc với mình.',
    phone: 'Điện thoại',
    sendTitle: 'Gửi tin nhắn',
    sentTitle: 'Cảm ơn bạn, tin nhắn đã được gửi.',
    sentBody: 'Mình sẽ trả lời sớm.',
    sendAnother: 'Gửi tin khác',
    name: 'Tên',
    email: 'Email',
    message: 'Nội dung',
    nameRequired: 'Bạn chưa nhập tên.',
    emailRequired: 'Bạn chưa nhập email.',
    emailInvalid: 'Email có vẻ chưa đúng.',
    messageRequired: 'Bạn chưa nhập nội dung.',
    error: 'Xin lỗi, chưa gửi được tin nhắn. Bạn thử lại hoặc gửi email trực tiếp cho mình nhé.',
    sending: 'đang gửi...',
    send: 'gửi tin nhắn',
  },
  en: {
    title: 'Contact',
    subtitle: 'Say hello',
    intro:
      "Whether it's a job opportunity, a project, or a question about one of my posts, I'm happy to hear from you. Email is the fastest way to reach me.",
    phone: 'Phone',
    sendTitle: 'Send a message',
    sentTitle: 'Thanks, your message has been sent.',
    sentBody: "I'll get back to you soon.",
    sendAnother: 'Send another',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    nameRequired: 'Please enter your name.',
    emailRequired: 'Please enter your email.',
    emailInvalid: 'That email address looks wrong.',
    messageRequired: 'Please write a message.',
    error: 'Sorry, the message could not be sent. Please try again or email me directly.',
    sending: 'sending...',
    send: 'send message',
  },
} satisfies Record<Locale, unknown>

const contacts = [
  { label: 'Email', value: 'smilenotdev@gmail.com', href: 'mailto:smilenotdev@gmail.com' },
  { label: 'phone', value: '0334204526', href: 'tel:0334204526' },
  { label: 'GitHub', value: 'github.com/haismile9', href: 'https://github.com/haismile9' },
  { label: 'LinkedIn', value: 'linkedin.com/in/smile9', href: 'https://linkedin.com/in/smile9/' },
  { label: 'dev.to', value: 'dev.to/nguyn_hi_e2ccd6e16c6b77', href: 'https://dev.to/nguyn_hi_e2ccd6e16c6b77' },
  { label: 'Instagram', value: '@smile.tsx', href: 'https://www.instagram.com/smile.tsx/' },
]

const inputClass =
  'mt-1 w-full border border-paper-border bg-white px-3 py-2 text-base focus:outline-none focus:border-classic-accent'

export default function ContactPage({ params }: { params: { lang: Locale } }) {
  const t = copy[params.lang]
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(response.ok ? 'sent' : 'error')
      if (response.ok) reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
    }
  }

  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-bold leading-tight">{t.title}</h1>
        <p className="mt-2 font-bold">{t.subtitle}</p>
        <p className="mt-3">{t.intro}</p>
      </header>

      <dl className="space-y-1">
        {contacts.map((contact) => (
          <div key={contact.label} className="sm:flex sm:gap-4">
            <dt className="font-bold sm:w-28 shrink-0">{contact.label === 'phone' ? t.phone : contact.label}</dt>
            <dd>
              <a
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="text-classic-accent hover:underline break-all"
              >
                {contact.value}
              </a>
            </dd>
          </div>
        ))}
      </dl>

      <h2 className="text-2xl font-bold leading-snug mt-10 mb-3">{t.sendTitle}</h2>

      {status === 'sent' ? (
        <div className="my-4 border-l-4 border-classic-accent bg-classic-accent/5 px-4 py-3">
          <p className="font-bold">{t.sentTitle}</p>
          <p>
            {t.sentBody}{' '}
            <button onClick={() => setStatus('idle')} className="text-classic-accent underline hover:no-underline">
              {t.sendAnother}
            </button>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <label className="block">
            <span className="font-bold">{t.name}</span>
            <input {...register('name', { required: t.nameRequired })} className={inputClass} />
            {errors.name && <span className="text-sm text-red-700">{errors.name.message}</span>}
          </label>

          <label className="block">
            <span className="font-bold">{t.email}</span>
            <input
              type="email"
              {...register('email', {
                required: t.emailRequired,
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t.emailInvalid },
              })}
              className={inputClass}
            />
            {errors.email && <span className="text-sm text-red-700">{errors.email.message}</span>}
          </label>

          <label className="block">
            <span className="font-bold">{t.message}</span>
            <textarea
              rows={6}
              {...register('message', { required: t.messageRequired })}
              className={inputClass}
            />
            {errors.message && <span className="text-sm text-red-700">{errors.message.message}</span>}
          </label>

          {status === 'error' && (
            <p className="text-red-700">{t.error}</p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="bg-classic-accent px-4 py-2 font-fira text-sm text-white hover:opacity-90 disabled:opacity-60"
          >
            {status === 'sending' ? t.sending : t.send}
          </button>
        </form>
      )}
    </>
  )
}
