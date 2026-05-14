import ShowcaseImage from './ShowcaseImage'
import ShowcaseVideo from './ShowcaseVideo'



interface Props {
  mediaType: 'image' | 'video'
  src: string          // works for both images and videos
  title: string
}

export default function MediaThumbnail({ mediaType, src, title }: Props) {
  if (mediaType === 'video') {
    return <ShowcaseVideo src={src} />
  }

  return <ShowcaseImage src={src} alt={title} />
}