import React from 'react'
import type { Media } from '@/payload-types'

interface HeroData {
  title?: string
  subtitle?: string
  backgroundImage?: Media | string | null
}

interface SejarahParokiHeroProps {
  data?: HeroData | null
}

const SejarahParokiHero = ({ data: _data }: SejarahParokiHeroProps) => {
  return <></>
}

export default SejarahParokiHero
