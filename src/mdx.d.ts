declare module '*.mdx' {
  import type { ComponentType } from 'react'
  const Component: ComponentType
  export default Component
}

declare module '*.jsx' {
  import type { ComponentType } from 'react'
  const Component: ComponentType<any>
  export default Component
}
