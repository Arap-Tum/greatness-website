import { ShowcaseCompany } from "@/types/shocase";

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
          {
            id: '1',
            type: 'image',
            url: '/assets/showcase/images/brookhillPoste.png',
          },

          {
            id: '2',
            type: 'image',
            url: '/assets/showcase/images/brookhillPoste.png',
          },

       
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
          // {
          //   id: '1',
          //   type: 'video',
          //   url: '/assets/showcase/monvid/videos/monvid.mp4',
          //   thumbnail:
          //     '/assets/showcase/images/movidPoster.png',
          // },

          {
            id: '2',
            type: 'image',
            url: '/assets/showcase/images/movidPoster.png',
          },
        ],
      },
    ],
  },
]