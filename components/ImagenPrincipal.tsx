import Image from 'next/image'

function ImagenPrincipal({ src, alt, width, height, placeholder, blurDataURL, sizes}) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={true}
        // placeholder="blur"
        // loading={loading}
        placeholder={placeholder}	
        blurDataURL={blurDataURL}
        sizes={sizes}
        className="@screen sm w-full md:max-w-sm lg:max-w-sm py-4 "
      />
    </>
  )
}

export default ImagenPrincipal
