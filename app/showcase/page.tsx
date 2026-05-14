import { showcaseCompanies } from '@/data/showcase'
import MediaThumbnail from '@/components/media/MediaThumbnail'
import CompanyLogo from '@/components/media/CompanyLogo'

export default function ShowcasePage() {
  return (
    <main
      data-theme="lifted"
      className="min-h-screen bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))]"
    >

      {/* ─── Hero ─── */}
      <section className="section-padding relative overflow-hidden pb-16">

        {/* Ambient glow blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(109,40,255,0.5) 0%, transparent 70%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 right-10 w-[300px] h-[300px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(255,45,160,0.5) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04]">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gradient-primary)' }} />
            <span className="text-xs font-medium tracking-widest uppercase text-muted">Selected Works</span>
          </div>

          <h1 className="heading-xl font-semibold tracking-tight mb-5">
            Our{' '}
            <span className="text-gradient">Showcase</span>
          </h1>

          <div className="divider-gradient mb-6" />

          <p className="text-[clamp(1rem,1.4vw,1.15rem)] text-muted leading-relaxed max-w-xl">
            A curated collection of brands and projects we have had the privilege of shaping — from
            early concepts to polished, launch-ready deliverables.
          </p>
        </div>
      </section>

      {/* ─── Companies ─── */}
      <section className="px-6 md:px-12 lg:px-20 pb-32 flex flex-col gap-24">

        {showcaseCompanies.map((company, companyIndex) => (
          <div key={company.id}>

            {/* Subtle section divider (skip first) */}
            {companyIndex > 0 && (
              <div
                className="h-px w-full mb-24"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }}
              />
            )}

            {/* ── Company header ── */}
            <div className="card-glass flex flex-col sm:flex-row sm:items-center gap-5 p-6 mb-10">
              {/* Logo */}
              <CompanyLogo
                src={company.logo}
                name={company.name}
                initials={company.initials}
                accent={company.accent}
              />

              {/* Meta */}
              <div className="flex-1 min-w-0">
                <span
                  className="inline-block text-[10px] font-semibold tracking-[0.12em] uppercase mb-2 px-2.5 py-0.5 rounded-full border"
                  style={{
                    background: 'var(--gradient-subtle)',
                    borderColor: company.accent + '40',
                    color: company.accent,
                  }}
                >
                  {company.category}
                </span>

                <h2 className="heading-lg font-semibold tracking-tight leading-tight mb-1">
                  {company.name}
                </h2>

                <p className="text-muted text-sm leading-relaxed">{company.tagline}</p>
              </div>

              {/* Total media count */}
              <div className="shrink-0 self-start sm:self-center text-right">
                <span className="text-[11px] text-muted tracking-wider uppercase">
                  {company.projects.reduce((acc, p) => acc + p.media.length, 0)} assets
                </span>
              </div>
            </div>

            {/* ── Projects ── */}
            <div className="flex flex-col gap-16">
              {company.projects.map((project) => (
                <div key={project.id}>

                  {/* Project heading */}
                  <div className="flex items-start gap-3 mb-6">
                    <div
                      className="w-0.5 shrink-0 mt-1 rounded-full"
                      style={{ background: company.accent, minHeight: '2.5rem', alignSelf: 'stretch' }}
                    />
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight mb-1">{project.title}</h3>
                      {project.description && (
                        <p className="text-soft text-sm leading-relaxed max-w-2xl">{project.description}</p>
                      )}
                    </div>
                  </div>

                  {/*
                    ── Responsive A2 poster grid ──
                    • Each cell is portrait (2:3 ratio) — enforced by the child component
                    • Grid auto-fills with min 160px columns → naturally goes
                      1 col on mobile, 2 on sm, 3 on md, 4 on lg, 5 on xl
                    • Unlimited media items — just keep adding to the data array
                  */}
                  <div
                    className="grid gap-4"
                    style={{
                      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                    }}
                  >
                    {project.media.map((media) => (
                      <div
                        key={media.id}
                        className="rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-md)]"
                      >
                        <MediaThumbnail
                          mediaType={media.type}
                          src={media.url}
                          title={project.title}
                        />
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>

          </div>
        ))}

      </section>

    </main>
  )
}