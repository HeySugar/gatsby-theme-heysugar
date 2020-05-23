/**
 * Portable Text Helper Component
 * This component is responsible for parsing the portable text data from Sanity.
 * It is often used in content managed pages.
 */

import React from "react"
import BlockContent from "@sanity/block-content-to-react"

import Figure from "../figure"

/**
 * Serializers
 * The serializers are responsible for handling the look and feel of the
 * appropriate type that we receive from sanity.
 */

const serializers = {
  types: {
    block(props) {
      const HeadingTag = props.node.style

      switch (props.node.style) {
        case "h1":
        case "h2":
        case "h3":
          return (
            <HeadingTag className="text-2xl lg:text-4xl font-bold">
              {props.children}
            </HeadingTag>
          )

        case "h4":
        case "h5":
        case "h6":
          return (
            <HeadingTag className="text-2xl font-bold">
              {props.children}
            </HeadingTag>
          )

        // By default the assumption is to render a <p> element
        default:
          return (
            <p className="text-lg mb-4 leading-relaxed">{props.children}</p>
          )
      }
    },
    figureImage(props) {
      return props.node.asset ? (
        <Figure caption={props.node.caption} src={props.node.asset._ref} />
      ) : null
    },
    quickLink(props) {
      return <div id={props.node.ref} />
    },
  },
}

export default function ({ blocks }) {
  return <BlockContent blocks={blocks} serializers={serializers} />
}
