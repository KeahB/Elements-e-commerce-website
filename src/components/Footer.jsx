import { Link } from 'react-router-dom'
import { Github, Twitter, Instagram, Linkedin } from 'lucide-react'

const FOOTER_LINKS = [
  {
    title: 'Shop',
    links: ['All Products', 'Electronics', 'Fashion', 'Jewelry']
  },
  {
    title: 'Support',
    links: ['Help Center', 'Shipping Info', 'Returns', 'Contact Us']
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Blog', 'Press']
  }
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-32 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          {/* Brand Block */}
          <div className="md:col-span-5 space-y-8">
            <Link to="/" className="inline-block tap-scale">
              <span className="text-xl font-black tracking-tighter text-white">
                ELEMENTS<span className="text-white/20">.</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm">
              Defining the interface of modern essentialism. Curated products for the digital native, delivered with precision and elegance.
            </p>
            <div className="flex gap-6">
              {[Twitter, Instagram, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-white/20 hover:text-white transition-all tap-scale"
                  aria-label="Social link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Block */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
            {FOOTER_LINKS.map(section => (
              <div key={section.title} className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map(link => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm font-bold text-slate-500 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Block */}
        <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/10">
            &copy; 2026 ELEMENTS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/10">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
