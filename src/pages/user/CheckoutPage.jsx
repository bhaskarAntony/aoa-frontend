import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  User,
  Mail,
  Award,
  Edit,
  CheckCircle,
  Clock,
  ArrowLeft,
  Hotel,
  Users,
  Calendar,
  FileText,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { registrationAPI, paymentAPI } from '../../utils/api';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const CheckoutPage = () => {
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();
  const { setRegistration: setAppRegistration } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRegistration();
  }, []);

  const fetchRegistration = async () => {
    try {
      const response = await registrationAPI.getMyRegistration();
      setRegistration(response.data);
      console.log(response.data);
      setAppRegistration(response.data);
    } catch (error) {
      setError('Registration not found. Please complete registration first.');
      setTimeout(() => navigate('/registration'), 2000);
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (registration?.paymentStatus === 'PAID') {
      navigate('/dashboard');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error('Failed to load payment gateway');

      const orderResponse = await paymentAPI.createOrderRegistration();
      const { orderId, amount, currency, keyId } = orderResponse.data;

      const options = {
        key: keyId,
        amount: amount * 100,
        currency,
        name: 'AOA Shivamogga 2026',
        description: 'Conference Registration',
        order_id: orderId,
        handler: async (response) => {
          try {
            await paymentAPI.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            navigate('/payment-status?status=success');
          } catch (error) {
            navigate('/payment-status?status=failed');
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || '',
        },
        theme: {
          color: '#005aa9',
        },
        modal: {
          ondismiss: () => setProcessing(false),
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  const getRoleText = (role) => {
    const texts = {
      AOA: 'AOA Member',
      NON_AOA: 'Non-AOA Member',
      PGS: 'PGS & Fellows',
    };
    return texts[role] || role;
  };

  const getRegistrationTypeText = (type) => {
    const texts = {
      CONFERENCE_ONLY: 'Conference Only',
      WORKSHOP_CONFERENCE: 'Workshop + Conference',
      COMBO: 'Combo Package',
    };
    return texts[type] || type;
  };

  const getBookingPhaseColor = (phase) => {
    const colors = {
      EARLY_BIRD: 'bg-[#005aa9] text-white',
      REGULAR: 'bg-[#009688] text-white',
      SPOT: 'bg-amber-500 text-white',
    };
    return colors[phase] || 'bg-slate-500 text-white';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="md" text="Loading checkout..." />
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-md mx-auto px-4 py-12 text-center">
          <h1 className="text-xl lg:text-2xl font-semibold text-slate-900 mb-3">
            No Registration Found
          </h1>
          <p className="text-base lg:text-lg text-slate-600 mb-8">
            Please complete registration first
          </p>
          <button
            onClick={() => navigate('/registration')}
            className="w-full px-8 py-4 border-2 border-[#005aa9] text-[#005aa9] hover:bg-[#005aa9]/5 rounded-xl text-base lg:text-lg font-semibold transition-colors"
          >
            Go to Registration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 lg:py-12 space-y-6 lg:space-y-8 pb-20">
        {}
        <div className="flex items-center mb-6 lg:mb-8 p-6 lg:p-8 border border-slate-200 rounded-2xl bg-slate-50">
          <button
            onClick={() => navigate('/registration')}
            className="p-3 text-slate-600 hover:text-[#005aa9] rounded-xl hover:bg-slate-100 transition-colors -m-3 flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          <div className="ml-4 lg:ml-6">
            <h1 className="text-xl lg:text-2xl font-semibold text-slate-900">
              Secure Checkout
            </h1>
            <p className="text-base lg:text-lg text-slate-600">
              Review your registration & pay securely
            </p>
          </div>
        </div>

        {}
        {error && (
          <div className="p-6 lg:p-8 border-2 border-red-200 text-red-700 text-base lg:text-lg rounded-2xl bg-red-50 flex items-center gap-3">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {}
          <section className="lg:col-span-2 space-y-6 lg:space-y-8">
            {}
            <div className="border border-slate-200 rounded-2xl p-6 lg:p-8 bg-slate-50">
              <h2 className="text-base lg:text-lg font-semibold text-slate-900 mb-6 flex items-center gap-3">
                <User className="w-5 h-5 lg:w-6 lg:h-6 text-slate-600" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 lg:p-6 border border-slate-200 rounded-xl bg-white">
                  <Mail className="w-5 h-5 lg:w-6 lg:h-6 text-slate-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs lg:text-sm text-slate-500 mb-1">Email</p>
                    <p className="text-sm lg:text-base font-semibold text-slate-900 truncate">
                      {user?.email || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 lg:p-6 border border-slate-200 rounded-xl bg-white">
                  <Award className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9] flex-shrink-0" />
                  <div>
                    <p className="text-xs lg:text-sm text-slate-500 mb-1">Category</p>
                    <p className="text-sm lg:text-base font-semibold text-slate-900">
                      {getRoleText(user?.role)}
                    </p>
                  </div>
                </div>
                {user?.membershipId && (
                  <div className="flex items-center gap-4 p-4 lg:p-6 border border-slate-200 rounded-xl bg-white">
                    <CreditCard className="w-5 h-5 lg:w-6 lg:h-6 text-[#009688] flex-shrink-0" />
                    <div>
                      <p className="text-xs lg:text-sm text-slate-500 mb-1">Membership ID</p>
                      <p className="text-sm lg:text-base font-semibold text-slate-900">
                        {user.membershipId}
                      </p>
                    </div>
                  </div>
                )}
                {registration?.collegeLetter && (
                  <div className="flex items-center gap-4 p-4 lg:p-6 border border-slate-200 rounded-xl bg-white">
                    <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9] flex-shrink-0" />
                    <div>
                      <p className="text-xs lg:text-sm text-slate-500 mb-1">College Letter</p>
                      <p className="text-sm lg:text-base font-semibold text-slate-900">
                        ✓ Uploaded
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {}
            <div className="border border-slate-200 rounded-2xl p-6 lg:p-8">
              <h2 className="text-base lg:text-lg font-semibold text-slate-900 mb-6 flex items-center gap-3">
                <CreditCard className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9]" />
                Registration #{registration.registrationNumber}
              </h2>
              <div className="space-y-4">
                <p className="text-base lg:text-lg font-semibold text-slate-900">
                  {getRegistrationTypeText(registration.registrationType)}
                </p>
                <div className={`inline-flex items-center px-4 py-2 rounded-xl text-sm lg:text-base font-medium ${getBookingPhaseColor(registration.bookingPhase)}`}>
                  <Clock className="w-4 h-4 lg:w-5 lg:h-5 mr-2 flex-shrink-0" />
                  {registration.bookingPhase}
                </div>
              </div>

              {registration.lifetimeMembershipId && (
                <div className="mt-6 p-5 lg:p-6 bg-[#005aa9]/10 border border-[#005aa9]/20 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9] flex-shrink-0" />
                    <span className="text-base lg:text-lg font-semibold">
                      Lifetime Membership: {registration.lifetimeMembershipId}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {}
            <div className="border border-slate-200 rounded-2xl p-6 lg:p-8 bg-slate-50">
              <h3 className="text-base lg:text-lg font-semibold text-slate-900 mb-6 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9]" />
                What's Included
              </h3>
              <ul className="space-y-3 text-sm lg:text-base text-slate-700">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9] flex-shrink-0" />
                  All conference sessions (3 days)
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9] flex-shrink-0" />
                  Conference kit & materials
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9] flex-shrink-0" />
                  Certificate of participation
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9] flex-shrink-0" />
                  Lunch & tea breaks (3 days)
                </li>
                {registration.registrationType === 'COMBO' && (
                  <>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9] flex-shrink-0" />
                      Lifetime AOA membership
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9] flex-shrink-0" />
                      All workshop sessions
                    </li>
                  </>
                )}
              </ul>
            </div>

            {}
            <div className="border border-slate-200 rounded-2xl p-6 lg:p-8 bg-slate-50">
              <h3 className="text-base lg:text-lg font-semibold text-slate-900 mb-6">
                Event Details
              </h3>
              <div className="space-y-4 text-sm lg:text-base text-slate-700">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9] flex-shrink-0" />
                  Oct 30 - Nov 1, 2026
                </div>
                <div className="flex items-center gap-3">
                  <Hotel className="w-5 h-5 lg:w-6 lg:h-6 text-[#009688] flex-shrink-0" />
                  Hotel Royal Orchid, Shivamogga
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9] flex-shrink-0" />
                  5000+ Delegates Expected
                </div>
              </div>
            </div>
          </section>

          {}
          <section className="lg:col-span-1 space-y-6 lg:space-y-8 lg:sticky lg:top-12">
            <div className="border border-slate-200 rounded-2xl p-6 lg:p-8 bg-slate-50">
              <h3 className="text-base lg:text-lg font-semibold text-slate-900 mb-6 flex items-center gap-3">
                <CreditCard className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9]" />
                Payment Summary
              </h3>

              {}
              <div className="text-center mb-8 lg:mb-10 p-6 lg:p-8 bg-gradient-to-r from-[#005aa9]/5 to-[#009688]/5 border border-[#005aa9]/20 rounded-xl">
                <p className="text-2xl lg:text-3xl font-bold text-[#005aa9]">
                  ₹{registration.totalAmount?.toLocaleString()}
                </p>
                <p className="text-sm lg:text-base text-slate-600 mt-2">
                  Total Amount (Incl. GST)
                </p>
              </div>

              {}
              <div className="space-y-3 mb-8 lg:mb-10 text-sm lg:text-base">
                <div className="flex justify-between font-semibold py-2">
                  <span className="text-slate-700">Package Price (excl. GST)</span>
                  <span>
                    ₹{(registration.totalAmount - registration.gst)?.toLocaleString() || 'N/A'}
                  </span>
                </div>

                {registration.basePrice > 0 && (
                  <div className="flex justify-between py-1 text-sm text-slate-600">
                    <span>Base Price</span>
                    <span>₹{registration.basePrice.toLocaleString()}</span>
                  </div>
                )}

                {registration.workshopPrice > 0 && (
                  <div className="flex justify-between py-1 text-sm text-slate-600">
                    <span>Workshop Fee</span>
                    <span>₹{registration.workshopPrice.toLocaleString()}</span>
                  </div>
                )}

                {registration.comboDiscount > 0 && (
                  <div className="flex justify-between text-[#005aa9] py-1 font-semibold">
                    <span>Combo Discount</span>
                    <span>-₹{registration.comboDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between font-semibold py-2">
                  <span className="text-slate-700">GST (18%)</span>
                  <span>₹{registration.gst?.toLocaleString()}</span>
                </div>
              </div>

              {}
              <div className="flex items-center justify-between mb-8 lg:mb-10  bg-slate-50 rounded-xl">
                <span className="text-base lg:text-lg font-semibold text-slate-700">
                  Payment Status
                </span>
                <span className={`inline-flex items-center px-3 py-2 rounded-xl text-sm lg:text-base font-medium ${
                  registration.paymentStatus === 'PAID'
                    ? 'bg-[#005aa9]/20 text-[#005aa9] border border-[#005aa9]/30' 
                    : 'bg-amber-100 text-amber-700 border border-amber-200'
                }`}>
                  {registration.paymentStatus === 'PAID' ? (
                    <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                  ) : (
                    <Clock className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                  )}
                  {registration.paymentStatus}
                </span>
              </div>

              {}
              <button
                onClick={handlePayment}
                disabled={processing || registration.paymentStatus === 'PAID'}
                className="w-full px-6 py-4 lg:py-5 rounded-2xl border-2 border-[#005aa9] bg-[#005aa9] text-white text-base lg:text-lg font-semibold hover:bg-[#004a8b] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 mb-6 lg:mb-8"
              >
                {processing ? (
                  <LoadingSpinner size="md" />
                ) : registration.paymentStatus === 'PAID' ? (
                  <>
                    <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6" />
                    Payment Complete
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 lg:w-6 lg:h-6" />
                    Pay ₹{registration.totalAmount?.toLocaleString()}
                  </>
                )}
              </button>

              {registration.paymentStatus === 'PAID' && (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full px-6 py-3 lg:py-4 border-2 border-[#005aa9] text-[#005aa9] hover:bg-[#005aa9]/5 rounded-xl text-base lg:text-lg font-semibold transition-colors"
                >
                  Go to Dashboard
                </button>
              )}

              {}
              <div className="space-y-4 pt-6 border-t border-slate-200 mt-8">
                <div className="flex items-center justify-center gap-2 text-sm lg:text-base text-[#005aa9]">
                  <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span>Secured by Razorpay</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs lg:text-sm text-slate-600 text-center font-medium">
                  <div>UPI</div>
                  <div>Cards</div>
                  <div>Netbanking</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;