import { windowSizeType } from '../types/header'

// desktop : 1000 ~
// tablet : 768 ~ 1000
// mobile : 375 ~ 768
export const getCurrentWindowSizeType = (): windowSizeType => {
  const currentWidth = window.innerWidth

  if (currentWidth >= 1000) {
    return 'desktop'
  } else if (currentWidth >= 768 && currentWidth < 1000) {
    return 'tablet'
  } else {
    return 'mobile'
  }
}
