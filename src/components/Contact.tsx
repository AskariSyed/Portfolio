import React, { useState } from 'react'
import { Mail, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { profile } from '../data'

type ContactProps = {
  isDark: boolean;
};

function Contact({ isDark }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    // Check if EmailJS is configured
    if (!import.meta.env.VITE_EMAILJS_SERVICE_ID || !import.meta.env.VITE_EMAILJS_TEMPLATE_ID || !import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // EmailJS configuration - you'll need to set these up in your EmailJS account
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: profile.email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      if (result.text === 'OK') {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-12 md:py-16" style={{ background: isDark ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '1rem md:2rem', marginTop: '2rem md:4rem' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-6 md:space-y-8">
          <div className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Let’s build</div>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Need backend, mobile, or web development?</h2>
          <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            I build robust backend systems with .NET and SQL, cross-platform mobile apps with Flutter and Firebase, and responsive web applications. Let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-12">
          {/* Contact Form */}
          <div className={`p-6 md:p-8 rounded-xl md:rounded-2xl ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200'} shadow-xl`}>
            <h3 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Send me a message</h3>

            {submitStatus === 'success' && (
              <div className={`flex items-center gap-3 p-4 rounded-lg mb-6 ${isDark ? 'bg-green-900/20 border border-green-700 text-green-400' : 'bg-green-50 border border-green-200 text-green-700'}`}>
                <CheckCircle size={20} />
                <span>Message sent successfully! I'll get back to you soon.</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className={`flex items-center gap-3 p-4 rounded-lg mb-6 ${isDark ? 'bg-red-900/20 border border-red-700 text-red-400' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                <AlertCircle size={20} />
                <span>
                  {!import.meta.env.VITE_EMAILJS_SERVICE_ID
                    ? "Contact form not configured. Please use the contact information below or email me directly."
                    : "Failed to send message. Please try again or contact me directly."
                  }
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.name
                        ? 'border-red-500 focus:border-red-500'
                        : isDark
                          ? 'border-slate-600 bg-slate-700 text-white focus:border-cyan-400'
                          : 'border-slate-300 bg-white text-slate-900 focus:border-cyan-500'
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                      errors.name ? 'focus:ring-red-500' : 'focus:ring-cyan-500'
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : isDark
                          ? 'border-slate-600 bg-slate-700 text-white focus:border-cyan-400'
                          : 'border-slate-300 bg-white text-slate-900 focus:border-cyan-500'
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                      errors.email ? 'focus:ring-red-500' : 'focus:ring-cyan-500'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    errors.subject
                      ? 'border-red-500 focus:border-red-500'
                      : isDark
                        ? 'border-slate-600 bg-slate-700 text-white focus:border-cyan-400'
                        : 'border-slate-300 bg-white text-slate-900 focus:border-cyan-500'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                    errors.subject ? 'focus:ring-red-500' : 'focus:ring-cyan-500'
                  }`}
                  placeholder="Project inquiry, collaboration, etc."
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors resize-vertical ${
                    errors.message
                      ? 'border-red-500 focus:border-red-500'
                      : isDark
                        ? 'border-slate-600 bg-slate-700 text-white focus:border-cyan-400'
                        : 'border-slate-300 bg-white text-slate-900 focus:border-cyan-500'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                    errors.message ? 'focus:ring-red-500' : 'focus:ring-cyan-500'
                  }`}
                  placeholder="Tell me about your project, ideas, or how we can work together..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                  isDark
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50'
                    : 'bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg hover:shadow-slate-800/50'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className={`p-6 md:p-8 rounded-xl md:rounded-2xl ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200'} shadow-xl`}>
              <h3 className={`text-xl md:text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Get in touch</h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all hover:scale-105 ${
                    isDark ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className={`p-3 rounded-full ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-100'}`}>
                    <Mail size={20} className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Email</div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{profile.email}</div>
                  </div>
                </a>

                <a
                  href="tel:+923355552845"
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all hover:scale-105 ${
                    isDark ? 'hover:bg-slate-700/50 text-slate-300' : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className={`p-3 rounded-full ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-100'}`}>
                    <Phone size={20} className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Phone</div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>+92 335 555 2845</div>
                  </div>
                </a>

                <div className={`flex items-center gap-4 p-4 rounded-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  <div className={`p-3 rounded-full ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-100'}`}>
                    <div className={`w-5 h-5 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}></div>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Location</div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{profile.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl md:rounded-2xl ${isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-slate-200'} shadow-xl`}>
              <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Response Time</h4>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                I typically respond to messages within 24 hours. For urgent inquiries, feel free to call directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact