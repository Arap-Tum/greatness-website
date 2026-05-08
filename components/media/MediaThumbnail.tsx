import ShowcaseImage from './ShowcaseImage'
import ShowcaseVideo from './ShowcaseVideo'

interface Props {
  mediaType: 'image' | 'video'
  thumbnail: string
  videoUrl?: string
  title: string
}

export default function MediaThumbnail({
  mediaType,
  thumbnail,
  videoUrl,
  title,
}: Props) {
  if (mediaType === 'video' && videoUrl) {
    return (
      <ShowcaseVideo
        src={videoUrl}
        poster={thumbnail}
      />
    )
  }

  return (
    <ShowcaseImage
      src={thumbnail}
      alt={title}
    />
  )
}