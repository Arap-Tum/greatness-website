import { ShowcaseCompany } from "@/types/shocase";

// import { ShowcaseCompany } from '@/types/showcase'

export const showcaseCompanies: ShowcaseCompany[] = [
  {
    id: 'brookhill',
    name: 'Brookhill Academy',
    category: 'Education',
    tagline: 'School in Tassia, Embakasi',
    logo: '/assets/showcase/logos/brookhil.jpeg',
    initials: 'BA',
    accent: '#ff7a18',
    projects: [
      {
        id: 'school-branding',
        title: 'School Branding Campaign',
        description: 'Marketing and awareness campaign',
        media: [
          { id: '1', type: 'video', url: '/assets/showcase/video/brookhilVideo.mp4' },
          { id: '2', type: 'image', url: '/assets/showcase/images/brookhillPoste.png' },
          { id: '3', type: 'video', url: '/assets/showcase/video/brookhillVideo2.mp4' },
        ],
      },
    ],
  },

  {
    id: 'monvid',
    name: 'Monvid Insurance Agency',
    category: 'Finance',
    tagline: 'Insurance solutions simplified',
    logo: '/assets/showcase/logos/monvid.jpeg',
    initials: 'MI',
    accent: '#6d28ff',
    projects: [
      {
        id: 'jamhuri-campaign',
        title: 'Jamhuri Day Campaign',
        media: [
          { id: '1', type: 'video', url: '/assets/showcase/monvid/videos/monvid.mp4' },
          { id: '2', type: 'image', url: '/assets/showcase/images/Monvid_Jamhuri_day.jpeg' },
        ],
      },
    ],
  },

  {
    id: 'golden-pasos',
    name: 'Golden Pasos',
    category: 'Psychology',
    tagline: 'Guidance and counselling',
    logo: '/assets/showcase/logos/golden_pasos.jpeg',
    initials: 'GP',
    accent: '#f5a623',
    projects: [
      {
        id: 'pasos-campaign',
        title: 'Brand Identity Campaign',
        media: [
          { id: '1', type: 'image', url: '/assets/showcase/logos/wra.jpeg' },
          { id: '2', type: 'image', url: '/assets/showcase/logos/golden_pasos.jpeg' },
        ],
      },
    ],
  },
]