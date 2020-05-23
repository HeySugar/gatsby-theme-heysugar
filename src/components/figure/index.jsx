import React from "react"
import Image from "gatsby-image"
import { getFluidGatsbyImage } from "gatsby-source-sanity"

import { sanityConfig } from "../../utils/sanity"

function Figure({ alt, caption, src }) {
  const image = src
    ? getFluidGatsbyImage(src, { maxWidth: 1024 }, sanityConfig)
    : null

  return (
    <figure className="my-4 lg:my-8">
      <Image className="rounded" fluid={image} alt={alt} />
      {caption && (
        <figcaption className="text-sm text-gray-600 mx-1 my-2">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default Figure
