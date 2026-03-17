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
    <footer className="bg-slate-950 border-t border-white/5 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          {/* Brand */}
          <div className="md:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <span
                className="text-lg font-bold tracking-tighter"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="text-white">LUXE</span>
                <span className="text-white/40 group-hover:text-white/60 transition-colors">SHOP.</span>
              </span>
            </Link>
            <p className="text-sm font-medium leading-relaxed text-slate-500 max-w-xs">
              Designing the future of digital commerce with uncompromising quality and minimal aesthetics.
            </p>
          </div>

          {/* Links */}
          {FOOTER_LINKS.map(group => (
            <div key={group.title} className="space-y-6">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                {group.title}
              </h3>
              <ul className="space-y-4">
                {group.links.map(link => (
                  <li key={link}>
                    <Link
                      to="/"
                      className="text-sm font-medium text-slate-500 hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
          <p>© 2026 LUXE SHOP. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
