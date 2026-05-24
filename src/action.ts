declare global {
  interface Window {
    Payfonte: any
    Payfusion: any
  }
}

export const payfonteIframeHandler = (args: Record<string, any>) => {
  const PayfonteClass = window.Payfonte

  // if (!PayfonteClass) {
  //   throw new Error('Payfonte/Payfusion SDK is not loaded')
  // }

  const handler = new PayfonteClass(args)

  handler.setup()
  handler.openIframe()
}
