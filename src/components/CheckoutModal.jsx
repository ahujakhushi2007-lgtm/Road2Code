import { useEffect, useState } from 'react'
import { CheckCircle2, CreditCard, Lock, ShieldCheck, Smartphone, University, X } from 'lucide-react'
import { COURSE_PRICE_INR, purchaseCourse } from '../services/enrollmentService'
import { useToast } from '../context/ToastContext'

const popularBanks = [
  'HDFC Bank',
  'State Bank of India (SBI)',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
]

function CheckoutModal({ trackKey, trackTitle, trackColor, studentEmail, onClose, onSuccess }) {
  const showToast = useToast()
  const [method, setMethod] = useState('upi') // 'upi' | 'card' | 'netbanking'
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  // Form states
  const [upiId, setUpiId] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [selectedBank, setSelectedBank] = useState(popularBanks[0])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && !isProcessing) onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isProcessing, onClose])

  const validate = () => {
    if (method === 'upi') {
      const trimmed = upiId.trim()
      if (!trimmed) return 'Please enter your UPI ID.'
      if (!trimmed.includes('@')) return 'Enter a valid UPI ID (e.g. name@okaxis or mobile@upi).'
    } else if (method === 'card') {
      const cleanNum = cardNumber.replace(/\s+/g, '')
      if (cleanNum.length !== 16 || !/^\d+$/.test(cleanNum)) {
        return 'Enter a valid 16-digit card number.'
      }
      if (!cardName.trim()) {
        return 'Enter the cardholder name.'
      }
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        return 'Enter expiry in MM/YY format.'
      }
      const [mm, yy] = cardExpiry.split('/').map(Number)
      if (mm < 1 || mm > 12) return 'Invalid expiry month.'
      if (yy < 24) return 'Card has expired.'
      if (cardCvv.length < 3 || !/^\d+$/.test(cardCvv)) {
        return 'Enter a 3-digit CVV.'
      }
    } else if (method === 'netbanking') {
      if (!selectedBank) return 'Please select a bank to proceed.'
    }
    return ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const problem = validate()
    if (problem) {
      setError(problem)
      return
    }

    setError('')
    setIsProcessing(true)

    // 1.5s simulated secure gateway processing
    setTimeout(() => {
      const result = purchaseCourse(studentEmail, trackKey, {
        method,
        reference: method === 'upi' ? upiId : method === 'card' ? `Card ending ${cardNumber.slice(-4)}` : selectedBank,
      })

      setIsProcessing(false)

      if (result.ok) {
        showToast(`Payment successful! You have unlocked lifetime access to ${trackTitle}.`)
        if (onSuccess) onSuccess(result.enrollment)
        onClose()
      } else {
        setError(result.error || 'Payment failed. Please try again.')
      }
    }, 1500)
  }

  const formatCardInput = (val) => {
    const raw = val.replace(/\D/g, '').slice(0, 16)
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw
    setCardNumber(formatted)
  }

  const formatExpiryInput = (val) => {
    const raw = val.replace(/\D/g, '').slice(0, 4)
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`)
    } else {
      setCardExpiry(raw)
    }
  }

  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget && !isProcessing) onClose() }}>
      <div className="modal modal--checkout" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
        <button
          className="icon-btn modal__close"
          onClick={onClose}
          aria-label="Close checkout"
          disabled={isProcessing}
        >
          <X size={18} />
        </button>

        <div className="checkout-badge" style={{ '--track': trackColor }}>
          <ShieldCheck size={18} aria-hidden="true" />
          <span>Secure Demo Checkout</span>
        </div>

        <h2 id="checkout-title">Enroll in {trackTitle}</h2>
        <div className="checkout-summary">
          <div>
            <p className="checkout-summary__label">Lifetime Course Access</p>
            <p className="checkout-summary__perks">All stops • Study notes • Live doubt sessions • Certificate • Job offers</p>
          </div>
          <div className="checkout-summary__price">
            <span className="price-tag">₹{COURSE_PRICE_INR}</span>
            <span className="price-term">One-time payment</span>
          </div>
        </div>

        <div className="checkout-notice" role="note">
          <Lock size={15} aria-hidden="true" />
          <span><strong>Demo payment</strong>: No real money is charged. Test transactions use simulated verification.</span>
        </div>

        {/* Payment Method Tabs */}
        <div className="checkout-tabs" role="tablist" aria-label="Payment method">
          <button
            type="button"
            role="tab"
            aria-selected={method === 'upi'}
            className={`checkout-tab ${method === 'upi' ? 'is-active' : ''}`}
            onClick={() => { setMethod('upi'); setError('') }}
            disabled={isProcessing}
          >
            <Smartphone size={16} aria-hidden="true" />
            <span>UPI / QR</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={method === 'card'}
            className={`checkout-tab ${method === 'card' ? 'is-active' : ''}`}
            onClick={() => { setMethod('card'); setError('') }}
            disabled={isProcessing}
          >
            <CreditCard size={16} aria-hidden="true" />
            <span>Debit / Credit</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={method === 'netbanking'}
            className={`checkout-tab ${method === 'netbanking' ? 'is-active' : ''}`}
            onClick={() => { setMethod('netbanking'); setError('') }}
            disabled={isProcessing}
          >
            <University size={16} aria-hidden="true" />
            <span>Net Banking</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form checkout-form">
          {method === 'upi' && (
            <div className="checkout-tab-body">
              <label className="field">
                <span>UPI ID / VPA</span>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="name@okaxis, phone@upi or paytm"
                  autoComplete="off"
                  disabled={isProcessing}
                  required
                  autoFocus
                />
              </label>
              <div className="checkout-fast-fill">
                <span className="checkout-fast-fill__label">Sample:</span>
                <button
                  type="button"
                  className="chip chip--sm"
                  onClick={() => setUpiId('student@okhdfcbank')}
                  disabled={isProcessing}
                >
                  student@okhdfcbank
                </button>
              </div>
            </div>
          )}

          {method === 'card' && (
            <div className="checkout-tab-body">
              <label className="field">
                <span>Card Number</span>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => formatCardInput(e.target.value)}
                  placeholder="4532 •••• •••• 8899"
                  maxLength={19}
                  disabled={isProcessing}
                  required
                  autoFocus
                />
              </label>
              <label className="field">
                <span>Cardholder Name</span>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Aarav Sharma"
                  disabled={isProcessing}
                  required
                />
              </label>
              <div className="checkout-form-split">
                <label className="field">
                  <span>Expiry (MM/YY)</span>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => formatExpiryInput(e.target.value)}
                    placeholder="12/28"
                    maxLength={5}
                    disabled={isProcessing}
                    required
                  />
                </label>
                <label className="field">
                  <span>CVV</span>
                  <input
                    type="password"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="888"
                    maxLength={3}
                    disabled={isProcessing}
                    required
                  />
                </label>
              </div>
            </div>
          )}

          {method === 'netbanking' && (
            <div className="checkout-tab-body">
              <label className="select field">
                <span>Select Your Bank</span>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  disabled={isProcessing}
                >
                  {popularBanks.map(bank => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </label>
            </div>
          )}

          {error && <p className="field-error" role="alert">{error}</p>}

          <button
            type="submit"
            className="btn btn--primary btn--block btn--lg checkout-submit"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="checkout-spinner-wrap">
                <span className="checkout-spinner" aria-hidden="true" />
                <span>Simulating secure gateway...</span>
              </span>
            ) : (
              <>
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>Pay ₹{COURSE_PRICE_INR} & Unlock Course</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CheckoutModal

