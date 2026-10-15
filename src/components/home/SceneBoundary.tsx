import { Component, type ReactNode } from 'react'

/** If the 3D layer throws (context lost, shader error…) we silently keep the photographic hero. */
export class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: unknown) {
    console.warn('[HeroScene3D] disabled, showing static hero instead:', error)
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}
