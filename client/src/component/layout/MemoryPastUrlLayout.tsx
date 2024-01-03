import { ReactNode, useEffect } from 'react'
import { useRouter } from 'hooks/useRouter'

import { onlyWithoutAuthPathList } from 'router'
import { clearUrlBeforeAuthPage, setUrlBeforeAuthPage } from 'service/storage/urlBeforeAuth'

interface MemoryPastUrlLayoutProps {
  children: ReactNode
}

// 이전에 방문했던 url이 어떤 것인지 sessionStorage에 저장하는 로직을 담당해서 처리
const MemoryPastUrlLayout = ({ children }: MemoryPastUrlLayoutProps) => {
  const noneMemoryPathList = onlyWithoutAuthPathList
  const { currentPath } = useRouter()

  useEffect(() => {
    if (!noneMemoryPathList.includes(currentPath)) {
      setUrlBeforeAuthPage(location.href)
    }
  }, [children])

  useEffect(() => {
    return () => {
      console.log('clear is done')
      clearUrlBeforeAuthPage()
    }
  }, [])

  return <div>{children}</div>
}

export default MemoryPastUrlLayout
