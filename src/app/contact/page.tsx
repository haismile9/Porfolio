'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [isContactExpanded, setIsContactExpanded] = useState(true);
  const [isFindMeExpanded, setIsFindMeExpanded] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  
  const { register, handleSubmit, watch, reset, formState: { errors, isValid, touchedFields } } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const watchedValues = watch();
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'short', 
    day: '2-digit', 
    month: 'short' 
  });

  const generateCodeSnippet = () => {
    if (isSubmitted) {
      return `const button = document.querySelector('#sendBtn');

const message = {
\tname: "",
\temail: "",
\tmessage: "",
\tdate: "${currentDate}"
}

button.addEventListener('click', () => {
\tform.send(message);
})`;
    }

    return `const button = document.querySelector('#sendBtn');

const message = {
\tname: "${watchedValues.name || 'Jonathan Davis'}",
\temail: "${watchedValues.email || ''}",
\tmessage: "${watchedValues.message || ''}",
\tdate: "${currentDate}"
}

button.addEventListener('click', () => {
\tform.send(message);
})`;
  };

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    setIsSubmitted(true);
    setSubmitAttempted(false);
    // Handle form submission
  };

  const handleNewMessage = () => {
    setIsSubmitted(false);
    setSubmitAttempted(false);
    reset();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    setSubmitAttempted(true);
    handleSubmit(onSubmit)(e);
  };

  const getFieldError = (fieldName: keyof FormData) => {
    return (submitAttempted || touchedFields[fieldName]) && errors[fieldName];
  };

  const getErrorMessage = (fieldName: keyof FormData): string | undefined => {
    const error = getFieldError(fieldName);
    return error ? error.message : undefined;
  };

  return (
    <div className="min-h-screen bg-dark-primary flex flex-col">
      <Header activeTab="_contact-me" />
      
      <main className="flex-1 flex">
        {/* Sidebar */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-[311px] border-r border-border-primary"
        >
          {/* Contacts Section */}
          <div className="border-b border-border-primary">
            <button
              onClick={() => setIsContactExpanded(!isContactExpanded)}
              className="w-full flex items-center gap-3 px-6 py-3 text-white hover:bg-dark-secondary transition-colors"
            >
              <motion.svg
                animate={{ rotate: isContactExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-4"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M4 6l4 4 4-4H4z"/>
              </motion.svg>
              <span className="text-white">contacts</span>
            </button>
            <AnimatePresence>
              {isContactExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-2 space-y-2">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                      </svg>
                      <span>nguyenhonghaimwg2005@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122L9.98 10.97a6.056 6.056 0 0 1-3.95-3.95l.538-1.804a.678.678 0 0 0-.122-.58L3.654 1.328z"/>
                      </svg>
                      <span>+33420426</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Find Me Also In Section */}
          <div>
            <button
              onClick={() => setIsFindMeExpanded(!isFindMeExpanded)}
              className="w-full flex items-center gap-3 px-6 py-3 text-white hover:bg-dark-secondary transition-colors"
            >
              <motion.svg
                animate={{ rotate: isFindMeExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-4"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M4 6l4 4 4-4H4z"/>
              </motion.svg>
              <span className="text-white">find-me-also-in</span>
            </button>
            <AnimatePresence>
              {isFindMeExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-2 space-y-2">
                    {[
                      { name: 'YouTube', color: 'text-accent-primary' },
                      { name: 'dev.to', color: 'text-text-secondary' },
                      { name: 'Instagram', color: 'text-text-secondary' },
                      { name: 'Twitch', color: 'text-text-secondary' }
                    ].map((link) => (
                      <div key={link.name} className={`flex items-center gap-2 ${link.color}`}>
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M6.879 9.934a.5.5 0 0 1-.707 0L3 6.76a.5.5 0 1 1 .707-.708L6.879 9.226a.5.5 0 0 1 0 .708z"/>
                          <path d="M8.5 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zm0 1a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z"/>
                        </svg>
                        <span>{link.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Contact Form */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-[632px] border-r border-border-primary flex flex-col items-center justify-center p-10"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleFormSubmit} 
                  className="w-[372px] space-y-6"
                >
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-text-secondary text-sm">_name:</label>
                    <div className={`relative border rounded-lg ${
                      getFieldError('name') 
                        ? 'border-red-500 bg-red-900/20' 
                        : 'border-border-primary bg-dark-secondary'
                    }`}>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        className="w-full px-3 py-2 bg-transparent text-white placeholder-text-secondary outline-none pr-10"
                        placeholder="Jonathan Davis"
                      />
                      {getFieldError('name') && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    {getFieldError('name') && (
                      <motion.span 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm"
                      >
                        {getErrorMessage('name')}
                      </motion.span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-text-secondary text-sm">_email:</label>
                    <div className={`relative border rounded-lg ${
                      getFieldError('email') 
                        ? 'border-red-500 bg-red-900/20' 
                        : 'border-border-primary bg-dark-secondary'
                    }`}>
                      <input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Wrong email address'
                          }
                        })}
                        type="email"
                        className="w-full px-3 py-2 bg-transparent text-white placeholder-text-secondary outline-none pr-10"
                        placeholder="email@example.com"
                      />
                      {getFieldError('email') && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    {getFieldError('email') && (
                      <motion.span 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm"
                      >
                        {getErrorMessage('email')}
                      </motion.span>
                    )}
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-2">
                    <label className="text-text-secondary text-sm">_message:</label>
                    <div className={`relative border rounded-lg ${
                      getFieldError('message') 
                        ? 'border-red-500 bg-red-900/20' 
                        : 'border-border-primary bg-dark-secondary'
                    }`}>
                      <textarea
                        {...register('message', { required: 'Message is required' })}
                        rows={4}
                        className="w-full px-3 py-2 bg-transparent text-white placeholder-text-secondary outline-none resize-none pr-10"
                        placeholder="your message here..."
                      />
                      {getFieldError('message') && (
                        <div className="absolute right-3 top-3">
                          <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    {getFieldError('message') && (
                      <motion.span 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm"
                      >
                        {getErrorMessage('message')}
                      </motion.span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: isValid ? 1.02 : 1 }}
                    whileTap={{ scale: isValid ? 0.98 : 1 }}
                    type="submit"
                    disabled={!isValid}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isValid 
                        ? 'bg-accent-primary text-dark-primary hover:bg-accent-secondary' 
                        : 'bg-border-primary text-text-secondary cursor-not-allowed'
                    }`}
                  >
                    submit-message
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="thank-you"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-[372px] text-center space-y-8"
                >
                  <div className="space-y-2">
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="text-3xl font-bold text-white"
                    >
                      Thank you! 🤘
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="text-lg text-text-secondary leading-relaxed"
                    >
                      Your message has been accepted. You will receive answer soon!
                    </motion.p>
                  </div>
                  
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNewMessage}
                    className="bg-accent-primary text-dark-primary px-4 py-2 rounded-lg hover:bg-accent-secondary transition-colors"
                  >
                    send-new-message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Code Snippet */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 border-border-primary p-10"
          >
            <div className="bg-dark-secondary rounded-lg border border-border-primary h-full overflow-hidden">
              <div className="flex h-full">
                {/* Line Numbers */}
                <div className="bg-dark-primary px-4 py-6 text-text-secondary text-lg font-mono leading-7 text-right select-none">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i + 1}>{i + 1}</div>
                  ))}
                </div>
                
                {/* Code Content */}
                <div className="flex-1 px-6 py-6 overflow-auto">
                  <pre className="text-text-secondary text-lg font-mono leading-7">
                    <motion.code
                      key={JSON.stringify(watchedValues)}
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {generateCodeSnippet()}
                    </motion.code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-4 flex justify-center">
              <div className="w-10 bg-border-primary rounded-full p-2">
                <div className="h-1.5 bg-text-secondary rounded-full"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
