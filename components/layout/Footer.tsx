import Link from 'next/link'

const columns = {
  Studio: [
    { label: 'About',        href: '/about'         },
    { label: 'Services',     href: '/services'      },
    { label: 'Work',         href: '/#work'         },
    { label: 'Testimonials', href: '/#testimonials' },
  ],
  Services: [
    { label: 'Brand Strategy',  href: '/services#brand'  },
    { label: 'Visual Identity', href: '/services#visual' },
    { label: 'Web Experience',  href: '/services#web'    },
    { label: 'Art Direction',   href: '/services#art'    },
  ],
  Connect: [
    { label: 'Contact',   href: '/#contact',             external: false },
    { label: 'LinkedIn',  href: 'https://linkedin.com',  external: true  },
    { label: 'Instagram', href: 'https://instagram.com', external: true  },
    { label: 'Dribbble',  href: 'https://dribbble.com',  external: true  },
  ],
}

const socials = [
  { label: 'in', href: 'https://linkedin.com'  },
  { label: 'ig', href: 'https://instagram.com' },
  { label: 'dr', href: 'https://dribbble.com'  },
]

export default function Footer() {
  return (
    <footer className="bg-void border-t border-subtle pt-section pb-12">
      <div className="container max-w-site mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-12 xl:gap-20 pb-12 border-b border-subtle mb-8">

          {/* Brand column */}
          <div className="max-w-xs">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 flex items-center justify-center rounded-sm border border-gold/40 text-gold text-[0.6rem] font-semibold tracking-wide">
                MG
              </span>
              <span className="font-display text-base font-medium tracking-wider text-cream">
                Meets Greatness
              </span>
            </div>

            <p className="text-sm text-stone font-light leading-relaxed mb-8 max-w-[260px]">
              A luxury creative studio crafting extraordinary brand experiences for visionary clients worldwide.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-icon w-9 h-9 text-[0.6rem] tracking-wide"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(columns).map(([cat, links]) => (
              <div key={cat}>
                <p className="overline mb-5">{cat}</p>
                <ul className="flex flex-col gap-3">
                  {links.map(({ label, href, external }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className="text-sm text-stone font-light transition-colors duration-250 hover:text-gold"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-charcoal tracking-wider">
            © {new Date().getFullYear()} Meets Greatness Studio. All rights reserved.
          </p>
          <p className="text-xs text-charcoal tracking-wide font-display italic">
            Crafted with intention.
          </p>
        </div>

      </div>
    </footer>
  )
}