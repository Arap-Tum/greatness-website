import { showcaseCompanies } from '@/data/showcase'
import MediaThumbnail from '@/components/media/MediaThumbnail'

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
          {/* Gradient pill label */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04]">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-primary" style={{ background: 'var(--gradient-primary)' }} />
            <span className="text-xs font-medium tracking-widest uppercase text-muted">Selected Works</span>
          </div>

          <h1 className="heading-xl font-semibold tracking-tight mb-5">
            Our{' '}
            <span className="text-gradient">Showcase</span>
          </h1>

          {/* Divider bar */}
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
              <div className="h-px w-full mb-24" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
            )}

            {/* ── Company header ── */}
            <div className="card-glass flex flex-col sm:flex-row sm:items-center gap-5 p-6 mb-10">

              {/* Logo */}
              <div className="shrink-0">
                <img
                  src={company.logo}
                  alt={company.name}
                  width={64}
                  height={64}
                  className="rounded-2xl border border-white/10 bg-surface object-contain"
                  style={{ background: 'rgb(var(--color-surface-elevated))' }}
                />
              </div>

              {/* Meta */}
              <div className="flex-1 min-w-0">
                {/* Category badge */}
                <span
                  className="inline-block text-[10px] font-semibold tracking-[0.12em] uppercase mb-2 px-2.5 py-0.5 rounded-full border"
                  style={{
                    background: 'var(--gradient-subtle)',
                    borderColor: 'rgba(255,45,160,0.2)',
                    color: '#cc87b8',
                  }}
                >
                  {company.category}
                </span>

                <h2 className="heading-lg font-semibold tracking-tight leading-tight mb-1">
                  {company.name}
                </h2>

                <p className="text-muted text-sm leading-relaxed">{company.tagline}</p>
              </div>

              {/* Project count */}
              <div className="shrink-0 self-start sm:self-center text-right">
                <span className="text-[11px] text-muted tracking-wider uppercase">
                  {company.projects.length} project{company.projects.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* ── Projects ── */}
            <div className="flex flex-col gap-16">
              {company.projects.map((project) => (
                <div key={project.id}>

                  {/* Project heading */}
                  <div className="flex items-start gap-3 mb-5">
                    <div className="w-0.5 h-full self-stretch rounded-full bg-gradient-primary shrink-0 mt-1" style={{ background: 'var(--gradient-primary)', minHeight: '2.5rem' }} />
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight mb-1">{project.title}</h3>
                      {project.description && (
                        <p className="text-soft text-sm leading-relaxed max-w-2xl">{project.description}</p>
                      )}
                    </div>
                  </div>

                  {/* ── Media grid ── */}
                  {project.media.length === 1 && (
                    <div className="w-full rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lg)]">
                      <MediaThumbnail
                        mediaType={project.media[0].type}
                        thumbnail={project.media[0].type === 'video' ? project.media[0].thumbnail || '' : project.media[0].url}
                        videoUrl={project.media[0].type === 'video' ? project.media[0].url : undefined}
                        title={project.title}
                      />
                    </div>
                  )}

                  {project.media.length === 2 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.media.map((media) => (
                        <div
                          key={media.id}
                          className="card card-hover overflow-hidden p-0 rounded-[var(--radius-lg)]"
                        >
                          <MediaThumbnail
                            mediaType={media.type}
                            thumbnail={media.type === 'video' ? media.thumbnail || '' : media.url}
                            videoUrl={media.type === 'video' ? media.url : undefined}
                            title={project.title}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {project.media.length >= 3 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* First item spans 2 cols on lg if count is 3 */}
                      {project.media.map((media, i) => (
                        <div
                          key={media.id}
                          className={`
                            card card-hover overflow-hidden p-0 rounded-[var(--radius-lg)]
                            ${project.media.length === 3 && i === 0 ? 'lg:col-span-2' : ''}
                          `}
                        >
                          <MediaThumbnail
                            mediaType={media.type}
                            thumbnail={media.type === 'video' ? media.thumbnail || '' : media.url}
                            videoUrl={media.type === 'video' ? media.url : undefined}
                            title={project.title}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>
        ))}

      </section>

    </main>
  )
}