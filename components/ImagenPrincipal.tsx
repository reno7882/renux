import siteMetadata from '@/data/siteMetadata'
import Image from 'next/image'

function ImagenPrincipal({ src, alt, width, height}) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        // loading={loading}
        // placeholder={placeholder}	
        // blurDataURL={blurDataURL}
        className="@screen sm w-full md:max-w-sm lg:max-w-sm py-4 "
      />
    </>
  )
}

export default ImagenPrincipal
