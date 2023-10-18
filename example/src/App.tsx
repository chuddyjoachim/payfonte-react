import './App.css'
import { usePayfonte, PayfontePaymentProps } from 'payfonte-react'

function App() {
  const onClose = () => {
    console.log('Clossed')
  }
  const onSuccess = (data: unknown) => {
    console.log('callbackData', data)
  }

  const config: PayfontePaymentProps = {
    amount: 1000, // amount * 100 - amount in lowest currency denomination e.g  kobo for naira, cents for dollars - 1000/100 = 10
    currency: 'NGN', //NGN, XOF, XAF, USD e.t.c depends on the currency the client provided
    reference: `${Date.now()}`, //if you have your own transactionId you want to track this payment with
    user: {
      email: 'example@example.com',
      name: 'John doe',
      phoneNumber: '09128499833'
    },// required - user object
    metadata: {} // optional - your data that will come back with the event
  }

  const { handlePayfontePayment, isPaymentLoading } = usePayfonte({
    clientId: 'payfusion', // required, Your client-id - clientid from payfusion merchant/user
    isProduction: false, // can be true of false
    onClose,
    onSuccess
  })

  const makePayment = () => {
    handlePayfontePayment(config)
  }

  return (
    <>
      <p className=''>
        {isPaymentLoading ? 'Payment initiated' : 'Payment not initiated'}
      </p>
      <button onClick={makePayment}>Pay 10 NGN</button>
    </>
  )
}

export default App
