type PayfonteUser = {
  email: string
  name: string
  phoneNumber: string
}

export type PayfontePaymentProps = {
  amount: number
  reference: string
  currency: string
  user: PayfonteUser
  metadata?: Record<string, any>
}

export type PayfonteInitProps = {
  onClose: () => void
  onSuccess: (data: Record<string, any>) => void
  clientId: string
  isProduction: boolean
}
