import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  CreditCard,
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  FileText,
  Hotel,
  Users,
  Calendar,
  XCircle,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { registrationAPI } from '../../utils/api';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    registrationType: '',
  });
  const [pricing, setPricing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [collegeLetter, setCollegeLetter] = useState(null);

  const { user, loading: authLoading } = useAuth();
  const { setRegistration } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchPricing();
    }
  }, [authLoading, user]);

  const fetchPricing = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await registrationAPI.getPricing();
      setPricing(response.data);
    } catch (err) {
      console.error('Pricing fetch error:', err);
      setError(
        err.response?.data?.message ||
          'Failed to load pricing. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file only');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      setCollegeLetter(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.registrationType) {
      setError('Please select a registration type');
      return;
    }

    if (user.role === 'PGS' && !collegeLetter) {
      setError('College letter is required for PGS & Fellows');
      return;
    }

    if (pricing?.pricing?.[formData.registrationType]?.totalAmount <= 0) {
      setError('This package is not available in the current booking phase');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const submitData = new FormData();
      submitData.append('registrationType', formData.registrationType);

      if (user.role === 'PGS' && collegeLetter) {
        submitData.append('collegeLetter', collegeLetter);
      }

      const response = await registrationAPI.create(submitData);
      setRegistration(response.data.registration);
      navigate('/checkout');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getBookingPhaseColor = (phase) => {
    const colors = {
      EARLY_BIRD: 'bg-[#005aa9] text-white',
      REGULAR: 'bg-[#009688] text-white',
      SPOT: 'bg-amber-500 text-white',
    };
    return colors[phase] || 'bg-slate-500 text-white';
  };

  const getBookingPhaseText = (phase) => {
    const texts = {
      EARLY_BIRD: 'Early Bird',
      REGULAR: 'Regular',
      SPOT: 'Spot Booking',
    };
    return texts[phase] || phase;
  };

  const getRoleText = (role) => {
    const texts = {
      AOA: 'AOA Member',
      NON_AOA: 'Non-AOA Member',
      PGS: 'PGS & Fellows',
    };
    return texts[role] || role;
  };

  const getRegistrationTypeDisplay = (type) => {
    const display = {
      CONFERENCE_ONLY: 'Conference Only',
      WORKSHOP_CONFERENCE: 'Workshop + Conference',
      COMBO: 'Combo Package',
    };
    return display[type] || type;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="md" text="Loading registration..." />
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 lg:py-12 space-y-6 lg:space-y-8 pb-20">
        {}
        <div className="text-center mb-6 lg:mb-8 p-6 lg:p-8 border border-slate-200 rounded-2xl bg-slate-50">
          <h1 className="text-xl lg:text-2xl font-semibold text-slate-900 mb-2">
            Conference Registration
          </h1>
          <p className="text-base lg:text-lg text-slate-700 mb-4">AOACON 2026 Shivamogga</p>
          <div className="flex items-center justify-center gap-2 text-sm lg:text-base text-slate-600">
            <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
            <span>Oct 30 - Nov 1, 2026</span>
          </div>
        </div>

        {}
        {pricing && (
          <div className={`inline-flex px-5 py-3 rounded-xl mx-auto block max-w-max ${getBookingPhaseColor(pricing.bookingPhase)}`}>
            <Clock className="w-4 h-4 lg:w-5 lg:h-5 mr-2 flex-shrink-0" />
            <span className="text-sm lg:text-base font-medium">{getBookingPhaseText(pricing.bookingPhase)}</span>
          </div>
        )}

        {}
        {error && (
          <div className="p-5 lg:p-6 border-2 border-red-200 text-red-700 text-sm lg:text-base rounded-2xl bg-red-50 flex items-center gap-3">
            <XCircle className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {}
          <section className="lg:col-span-2 space-y-6 lg:space-y-8">
            {}
            <div className="border border-slate-200 rounded-2xl p-6 lg:p-8 bg-slate-50">
              <h3 className="text-base lg:text-lg font-semibold text-slate-900 mb-6 flex items-center gap-3">
                <User className="w-5 h-5 lg:w-6 lg:h-6 text-slate-600" />
                Your Details
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 lg:p-6 border border-slate-200 rounded-xl bg-white">
                  <User className="w-5 h-5 lg:w-6 lg:h-6 text-slate-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs lg:text-sm text-slate-500 mb-1">Name</p>
                    <p className="text-sm lg:text-base font-semibold text-slate-900">
                      {user?.name || 'N/A'}
                    </p>
                  </div>
                </div>
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
              </div>
            </div>

            {}
            {user?.role === 'PGS' && (
              <div className="border border-slate-200 rounded-2xl p-6 lg:p-8 bg-slate-50">
                <h4 className="text-base lg:text-lg font-semibold text-slate-900 mb-6 flex items-center gap-3">
                  <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-slate-600" />
                  College Recommendation Letter
                </h4>
                <div className="text-center py-10 lg:py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                  <FileText className="w-10 h-10 lg:w-12 lg:h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-sm lg:text-base text-slate-900 mb-4">
                    Upload College Letter
                  </p>
                  <label
                    htmlFor="college-letter"
                    className="inline-flex items-center px-6 py-3 lg:px-8 lg:py-4 border-2 border-[#005aa9] text-[#005aa9] rounded-xl text-sm lg:text-base font-semibold hover:bg-[#005aa9]/5 transition-all cursor-pointer"
                  >
                    Choose PDF File
                    <input
                      id="college-letter"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="text-xs lg:text-sm text-slate-500 mt-4">
                    Max 5MB, PDF only (Required for PGS)
                  </p>
                </div>
                {collegeLetter && (
                  <div className="mt-6 p-4 lg:p-6 bg-[#005aa9]/10 border-2 border-[#005aa9]/20 rounded-xl">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9] flex-shrink-0" />
                      <span className="text-sm lg:text-base font-medium truncate">
                        {collegeLetter.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {}
            <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                {pricing ? (
                  Object.entries(pricing.pricing).map(([type, priceData]) => {
                    const isAvailable = priceData.totalAmount > 0;
                    const isSelected = formData.registrationType === type;

                    return (
                      <label
                        key={type}
                        className={`block p-6 lg:p-8 border-2 rounded-2xl transition-all cursor-pointer group ${
                          isAvailable
                            ? isSelected
                              ? 'border-[#005aa9] bg-[#005aa9]/5 ring-2 ring-[#005aa9]/20'
                              : 'border-slate-200 hover:border-[#005aa9]/40 hover:bg-slate-50'
                            : 'border-slate-300 bg-slate-100 opacity-60 cursor-not-allowed'
                        }`}
                        onClick={() => {
                          if (isAvailable) {
                            setFormData({ ...formData, registrationType: type });
                            setError('');
                          }
                        }}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
                          <div className="flex items-start lg:items-center flex-1">
                            <input
                              type="radio"
                              name="registrationType"
                              value={type}
                              checked={isSelected}
                              disabled={!isAvailable}
                              onChange={(e) => {
                                if (isAvailable) {
                                  setFormData({ ...formData, registrationType: e.target.value });
                                  setError('');
                                }
                              }}
                              className="h-5 w-5 lg:h-6 lg:w-6 text-[#005aa9] focus:ring-[#005aa9]/50 border-slate-300 mt-1 lg:mt-0 flex-shrink-0 disabled:opacity-50"
                            />
                            <div className="ml-4 lg:ml-6">
                              <h4 className="text-base lg:text-lg font-semibold text-slate-900 mb-2">
                                {getRegistrationTypeDisplay(type)}
                              </h4>
                              <p className="text-sm lg:text-base text-slate-700 leading-relaxed">
                                {type === 'CONFERENCE_ONLY' &&
                                  'All conference sessions + materials + certificate'}
                                {type === 'WORKSHOP_CONFERENCE' &&
                                  'Workshops + all conference sessions + lunch'}
                                {type === 'COMBO' &&
                                  'Conference + workshops + lifetime AOA membership'}
                              </p>
                              {!isAvailable && (
                                <p className="text-sm lg:text-base text-red-600 mt-3 font-medium flex items-center gap-2">
                                  <XCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                                  Not Available in {getBookingPhaseText(pricing.bookingPhase)}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            {isAvailable ? (
                              <>
                                <p className="text-xl lg:text-2xl font-bold text-slate-900">
                                  ₹{priceData.totalAmount.toLocaleString()}
                                </p>
                                <p className="text-xs lg:text-sm text-slate-500 mt-2">
                                  +18% GST included
                                </p>
                                {priceData.comboDiscount > 0 && (
                                  <p className="text-sm lg:text-base text-[#005aa9] mt-2 font-semibold">
                                    Save ₹{priceData.comboDiscount.toLocaleString()}
                                  </p>
                                )}
                              </>
                            ) : (
                              <p className="text-base lg:text-lg text-slate-500">N/A</p>
                            )}
                          </div>
                        </div>
                      </label>
                    );
                  })
                ) : (
                  <div className="text-center py-12 lg:py-16 border-2 border-dashed border-slate-200 rounded-2xl">
                    <p className="text-base lg:text-lg text-slate-600 mb-6">
                      No pricing information available right now
                    </p>
                    <button
                      onClick={fetchPricing}
                      className="px-6 py-3 lg:px-8 lg:py-4 bg-[#005aa9] text-white rounded-xl text-base lg:text-lg font-semibold hover:bg-[#004a8b] transition-colors"
                    >
                      Retry Loading Pricing
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting || !formData.registrationType}
                className="w-full px-6 py-4 lg:py-5 rounded-2xl border-2 border-[#005aa9] bg-[#005aa9] text-white text-base lg:text-lg font-semibold hover:bg-[#004a8b] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <LoadingSpinner size="md" />
                ) : (
                  <>
                    Proceed to Payment
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                  </>
                )}
              </button>
            </form>
          </section>

          {}
          <div className="border border-slate-200 rounded-2xl p-6 lg:p-8 bg-slate-50 sticky top-8 lg:top-12">
            <h3 className="text-base lg:text-lg font-semibold text-slate-900 mb-6 flex items-center gap-3">
              <CreditCard className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9]" />
              Order Summary
            </h3>

            {formData.registrationType && pricing?.pricing?.[formData.registrationType] ? (
              <div className="space-y-4 lg:space-y-6 text-sm lg:text-base">
                <div className="p-4 lg:p-6 bg-white border border-slate-200 rounded-xl mb-6 lg:mb-8">
                  <p className="text-xs lg:text-sm text-slate-500 mb-2">
                    {getRegistrationTypeDisplay(formData.registrationType)}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700">Package Price (excl. GST)</span>
                    <span>
                      ₹{pricing.pricing[formData.registrationType].totalWithoutGST.toLocaleString()}
                    </span>
                  </div>

                  {pricing.pricing[formData.registrationType].basePrice > 0 && (
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Base Price</span>
                      <span>
                        ₹{pricing.pricing[formData.registrationType].basePrice.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {pricing.pricing[formData.registrationType].workshopPrice > 0 && (
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Workshop Fee</span>
                      <span>
                        ₹{pricing.pricing[formData.registrationType].workshopPrice.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {pricing.pricing[formData.registrationType].comboDiscount > 0 && (
                    <div className="flex justify-between text-[#005aa9] font-semibold">
                      <span>Combo Discount</span>
                      <span>-₹{pricing.pricing[formData.registrationType].comboDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700">GST (18%)</span>
                    <span>₹{pricing.pricing[formData.registrationType].gst.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 mt-6 lg:mt-8">
                  <div className="flex justify-between text-lg lg:text-xl font-bold">
                    <span className="text-slate-900">Total Amount (incl. GST)</span>
                    <span className="text-xl lg:text-2xl font-black text-[#005aa9]">
                      ₹{pricing.pricing[formData.registrationType].totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 lg:py-12">
                <CreditCard className="w-12 h-12 lg:w-16 lg:h-16 text-slate-300 mx-auto mb-4 lg:mb-6" />
                <p className="text-base lg:text-lg text-slate-600 mb-3">
                  Select a registration package
                </p>
                <p className="text-sm lg:text-base text-slate-500">
                  Choose from available options above
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;