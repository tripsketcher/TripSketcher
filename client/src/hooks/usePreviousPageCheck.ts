import { useEffect, useState } from 'react'
import { SERVICE_DOMAIN } from 'utils/const/api'

const usePreviousPageCheck = (): boolean => {
  const [isFromService, setIsFromService] = useState(false)

  useEffect(() => {
    const referrer = document.referrer

    // 서비스 시스템에서 링크를 통해 유입된 경우
    if (referrer) {
      const referrerDomain = new URL(referrer).hostname
      setIsFromService(referrerDomain.includes(SERVICE_DOMAIN))
    }
  }, [])

  return isFromService
}

export default usePreviousPageCheck
