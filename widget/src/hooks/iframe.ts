import {
  setApiKey,
  setCurrentPage,
  setFingerprint
} from '../store'

interface IframeControl {
  updateCoreValuesOnStore(): void;
  notifyOpen(): void;
  notifyClose(): void;
}

export default function useIframeControl (): IframeControl {
  function updateCoreValuesOnStore (): void {
    if (process.env.NODE_ENV === 'production') {
      const query = new URLSearchParams(window.location.search)
      const apiKey = query.get('api_key') ?? ''
      const page = query.get('page') ?? ''
      const fingerprint = query.get('fingerprint') ?? ''

      setCurrentPage(page)
      setApiKey(apiKey)
      setFingerprint(fingerprint)
      return
    }

    setCurrentPage('https://playground-url.com')
    setApiKey('e6aa8ec1-778b-4efd-aadc-ac3ccbd669a3')
    setFingerprint('João')
  }

  function notifyOpen (): void {
    window.parent.postMessage({
      isWidget: true,
      isOpen: true
    }, '*')
  }

  function notifyClose (): void {
    window.parent.postMessage({
      isWidget: true,
      isOpen: false
    }, '*')
  }

  return {
    updateCoreValuesOnStore,
    notifyClose,
    notifyOpen
  }
}
