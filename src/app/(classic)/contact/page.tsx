'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  name: string
  email: string
  message: string
}

const contacts = [
  { label: 'Email', value: 'smilenotdev@gmail.com', href: 'mailto:smilenotdev@gmail.com' },
  { label: 'Phone', value: '0334204526', href: 'tel:0334204526' },
  { label: 'GitHub', value: 'github.com/haismile9', href: 'https://github.com/haismile9' },
  { label: 'LinkedIn', value: 'linkedin.com/in/smile9', href: 'https://linkedin.com/in/smile9/' },
  { label: 'dev.to', value: 'dev.to/nguyn_hi_e2ccd6e16c6b77', href: 'https://dev.to/nguyn_hi_e2ccd6e16c6b77' },
  { label: 'Instagram', value: '@smile.tsx', href: 'https://www.instagram.com/smile.tsx/' },
]

const inputClass =
  'mt-1 w-full border border-paper-border bg-white px-3 py-2 text-base focus:outline-none focus:border-classic-accent'

export default function ContactPage() {
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
        <h1 className="text-4xl font-bold leading-tight">Contact</h1>
        <p className="mt-2 font-bold">Say hello</p>
        <p className="mt-3">
          Whether it&apos;s a job opportunity, a project, or a question about one of my posts, I&apos;m happy to hear
          from you. Email is the fastest way to reach me.
        </p>
      </header>

      <dl className="space-y-1">
        {contacts.map((contact) => (
          <div key={contact.label} className="sm:flex sm:gap-4">
            <dt className="font-bold sm:w-28 shrink-0">{contact.label}</dt>
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

      <h2 className="text-2xl font-bold leading-snug mt-10 mb-3">Send a message</h2>

      {status === 'sent' ? (
        <div className="my-4 border-l-4 border-classic-accent bg-classic-accent/5 px-4 py-3">
          <p className="font-bold">Thanks, your message has been sent.</p>
          <p>
            I&apos;ll get back to you soon.{' '}
            <button onClick={() => setStatus('idle')} className="text-classic-accent underline hover:no-underline">
              Send another
            </button>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <label className="block">
            <span className="font-bold">Name</span>
            <input {...register('name', { required: 'Please enter your name.' })} className={inputClass} />
            {errors.name && <span className="text-sm text-red-700">{errors.name.message}</span>}
          </label>

          <label className="block">
            <span className="font-bold">Email</span>
            <input
              type="email"
              {...register('email', {
                required: 'Please enter your email.',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'That email address looks wrong.' },
              })}
              className={inputClass}
            />
            {errors.email && <span className="text-sm text-red-700">{errors.email.message}</span>}
          </label>

          <label className="block">
            <span className="font-bold">Message</span>
            <textarea
              rows={6}
              {...register('message', { required: 'Please write a message.' })}
              className={inputClass}
            />
            {errors.message && <span className="text-sm text-red-700">{errors.message.message}</span>}
          </label>

          {status === 'error' && (
            <p className="text-red-700">
              Sorry, the message could not be sent. Please try again or email me directly.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="bg-classic-accent px-4 py-2 font-fira text-sm text-white hover:opacity-90 disabled:opacity-60"
          >
            {status === 'sending' ? 'sending...' : 'send message'}
          </button>
        </form>
      )}
    </>
  )
}
