import './App.css'
import { usePayfonte } from 'payfonte-react'

function App() {
  const onClose = () => {
    console.log('Clossed')
  }
  const onSuccess = (data: unknown) => {
    console.log('dts>>>', data)
  }

  const { handlePayfontePayment, isPaymentLoading } = usePayfonte({
    clientId: 'payfusion',
    isProduction: false,
    onClose,
    onSuccess
  })

  const makePay = () => {
    handlePayfontePayment({
      amount: 1000,//
      currency: 'USD', //NGN, XOF, XAF, e.t.c depends on the currency the client provided
      reference: `${Date.now()}`,
      user: {
        email: 'chuddyjoachim@gmail.com',
        name: 'Joachim chikezie',
        phoneNumber: '08186988808'
      }
    })
  }

  return (
    <>
      <p className=''>
        {isPaymentLoading ? 'Payment initiated' : 'Payment not initiated'}
      </p>
      <button onClick={makePay}>Pay 100 NGN</button>
    </>
  )
}

export default App
