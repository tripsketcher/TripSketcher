declare module '*.scss'

declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

// interface ImportMeta {
//   env: {
//     VITE_REST_API_KEY: string
//   }
// }