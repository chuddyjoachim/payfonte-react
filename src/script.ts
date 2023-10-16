import { useEffect, useState } from 'react'

type ScriptStatus = {
  loaded: boolean
  error: boolean
}

const payfonteJs = 'https://cdn.payfonte.com/payfonte.min.js'
const id = 'payfonte_script'

export default function useScript() {
  const [state, setState] = useState<ScriptStatus>({
    loaded: false,
    error: false
  })

  useEffect(() => {
    const scriptTag = document.getElementById(id)
    const scriptSrc = scriptTag && scriptTag.getAttribute('src')

    if (scriptSrc)
      return setState({
        loaded: true,
        error: false
      })

    const script = document.createElement('script')
    script.id = id
    script.src = payfonteJs
    script.async = true

    const onScriptLoad = () => {
      setState({
        loaded: true,
        error: false
      })
    }

    const onScriptError = () => {
      setState({
        loaded: true,
        error: true
      })
    }

    script.addEventListener('load', onScriptLoad)
    script.addEventListener('complete', onScriptLoad)
    script.addEventListener('error', onScriptError)

    document.body.appendChild(script)

    return () => {
      script.removeEventListener('load', onScriptLoad)
      script.removeEventListener('complete', onScriptLoad)
      script.removeEventListener('error', onScriptError)
    }
  }, [])

  return [state.loaded, state.error]
}
