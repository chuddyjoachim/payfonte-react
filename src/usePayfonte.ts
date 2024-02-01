import { useEffect, useState } from 'react'
import useScript from './script'
import { PayfonteInitProps, PayfontePaymentProps } from './types'
import { payfonteIframeHandler } from './action'

export const usePayfonte = ({
  clientId,
  onClose,
  onSuccess,
  isProduction
}: PayfonteInitProps) => {
  const [isPaymentLoading, setPaymentIsLoading] = useState(false)
  const [scriptLoaded, scriptError] = useScript()
  const errorMsg = 'Err, Unable to load payfonte inline script'

  useEffect(() => {
    if (scriptError) {
      throw new Error(errorMsg)
    }
  }, [scriptError])

  const initializePayment = async ({
    reference,
    clientId,
    amount,
    customer,
    currency,
    metadata
  }: any) => {
    setPaymentIsLoading(true)
    try {
      if (scriptLoaded) {
        const payfonteArgs = {
          isProduction, // can be true of false
          reference, // if you have your own transactionId you want to track this payment with
          clientId, // required, Your client-id
          amount, // required Amount in kobo
          metadata: metadata || {}, // your data that will come back with the event
          customer,
          currency,
          callback: (data: any) => {
            setPaymentIsLoading(false)
            if (data?.status === 'success') {
              onSuccess(data)
            }
          },
          onClose: () => {
            setPaymentIsLoading(false)
            onClose()
          }
        }

        await payfonteIframeHandler(payfonteArgs)
      }
    } catch (e) {
      throw new Error(errorMsg)
    }
  }

  const handlePayfontePayment = ({
    amount,
    reference,
    user,
    currency,
    country,
    metadata = {}
  }: PayfontePaymentProps) => {
    try {
      const { name, email, phoneNumber } = user
      const customer = {
        name,
        email,
        phoneNumber
      }
      const config = {
        amount,
        customer,
        reference,
        country,
        currency,
        metadata
      }
      initializePayment({ clientId, ...config })
    } catch (e) {
      throw new Error(errorMsg)
    } finally {
      setPaymentIsLoading(true)
    }
  }

  return {
    isPaymentLoading,
    handlePayfontePayment
  }
}
