'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { motion } from 'framer-motion'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  name: string
  email: string
  message: string
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('')

    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('Please fill in all fields.')
      setIsSubmitting(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setStatus('Please enter a valid email address.')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('Message sent successfully! Thank you for reaching out.')
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => {
          onClose()
          setStatus('')
        }, 2000)
      } else {
        setStatus(data.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      setStatus('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (status) setStatus('') // Clear status when user starts typing
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-floralWhite p-6 text-left align-middle shadow-xl transition-all">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold leading-6 text-graphite mb-6 text-center"
                  >
                    Get In Touch
                  </Dialog.Title>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-graphite mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={form.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-graphite/20 rounded-lg focus:ring-2 focus:ring-accentYellow focus:border-transparent outline-none transition-all duration-200"
                        placeholder="Your full name"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-graphite mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-graphite/20 rounded-lg focus:ring-2 focus:ring-accentYellow focus:border-transparent outline-none transition-all duration-200"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-graphite mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={form.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="w-full px-4 py-3 border border-graphite/20 rounded-lg focus:ring-2 focus:ring-accentYellow focus:border-transparent outline-none transition-all duration-200 resize-none"
                        placeholder="Tell me about your photography needs..."
                        required
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-3 text-graphite bg-graphite/10 rounded-lg hover:bg-graphite/20 transition-colors duration-200 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-3 bg-accentYellow text-graphite rounded-lg hover:bg-accentYellow/90 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </form>

                  {status && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-3 rounded-lg text-sm text-center ${
                        status.includes('successfully') 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {status}
                    </motion.div>
                  )}
                </motion.div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}