declare const Payfusion: any

export const payfonteIframeHandler = async (args: Record<string, any>) => {
  const handler = await new Payfusion(args)

  handler.setup()
  handler.openIframe()
}
