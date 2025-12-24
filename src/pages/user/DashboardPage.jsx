import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  CreditCard, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Download,
  Award,
  ArrowRight,
  MapPin,
  Users,
  ChevronRight,
  Hotel
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { registrationAPI, accommodationAPI, abstractAPI, feedbackAPI } from '../../utils/api';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    registration: null,
    accommodations: [],
    abstract: null,
    feedback: null
  });
  
  const { user } = useAuth();
  const { stepperProgress, setRegistration, setAccommodationBookings, setAbstract, setFeedback } = useApp();
  const navigate = useNavigate();

  const steps = [
    { key: 'registration', label: 'Register', short: 'Reg' },
    { key: 'accommodation', label: 'Stay', short: 'Stay' },
    { key: 'conferenceDays', label: 'Days', short: 'Days' },
    { key: 'abstractUpload', label: 'Abstract', short: 'Abs' },
    { key: 'feedback', label: 'Feedback', short: 'Fdbk' }
  ];

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

  const getStatusBadge = (status) => {
    const badges = {
      PAID: { color: 'bg-[#005aa9]/20 text-[#005aa9] border border-[#005aa9]/30', icon: CheckCircle },
      PENDING: { color: 'bg-amber-100 text-amber-700 border border-amber-200', icon: Clock },
      FAILED: { color: 'bg-red-100 text-red-700 border border-red-200', icon: Clock },
      CONFIRMED: { color: 'bg-[#005aa9]/20 text-[#005aa9] border border-[#005aa9]/30', icon: CheckCircle },
      APPROVED: { color: 'bg-[#005aa9]/20 text-[#005aa9] border border-[#005aa9]/30', icon: CheckCircle },
      REJECTED: { color: 'bg-red-100 text-red-700 border border-red-200', icon: Clock }
    };
    
    const badge = badges[status] || { color: 'bg-slate-100 text-slate-700 border border-slate-200', icon: Clock };
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center px-3 py-2 rounded-xl text-sm lg:text-base font-medium ${badge.color}`}>
        <Icon className="w-4 h-4 lg:w-5 lg:h-5 mr-2 flex-shrink-0" />
        {status}
      </span>
    );
  };

  const getCurrentStep = () => {
    if (!stepperProgress.registration) return 0;
    if (!stepperProgress.accommodation) return 1;
    if (!stepperProgress.conferenceDays) return 2;
    if (!stepperProgress.abstractUpload) return 3;
    return 4;
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      try {
        const regResponse = await registrationAPI.getMyRegistration();
        setStats(prev => ({ ...prev, registration: regResponse.data }));
        setRegistration(regResponse.data);
      } catch (error) {}

      try {
        const accResponse = await accommodationAPI.getMyBookings();
        setStats(prev => ({ ...prev, accommodations: accResponse.data }));
        setAccommodationBookings(accResponse.data);
      } catch (error) {}

      try {
        const abstractResponse = await abstractAPI.getMyAbstract();
        setStats(prev => ({ ...prev, abstract: abstractResponse.data }));
        setAbstract(abstractResponse.data);
      } catch (error) {}

      try {
        const feedbackResponse = await feedbackAPI.getMyFeedback();
        setStats(prev => ({ ...prev, feedback: feedbackResponse.data }));
        setFeedback(feedbackResponse.data);
      } catch (error) {}
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="md" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 lg:py-12 space-y-6 lg:space-y-8 pb-20">
        {}
        <div className="flex items-center gap-4 lg:gap-6 mb-8 lg:mb-12 p-6 lg:p-8 border border-slate-200 rounded-2xl bg-slate-50">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#005aa9] to-[#009688] rounded-2xl flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg lg:text-xl font-semibold text-slate-900 leading-tight truncate">
              {user?.name}
            </p>
            <p className="text-base lg:text-lg text-slate-600">
              {getRoleText(user?.role)}
            </p>
          </div>
          <div className="text-right hidden lg:block">
            <p className="text-base lg:text-lg text-slate-700 font-medium">AOACON 2026</p>
            <p className="text-sm lg:text-base text-slate-500">Shivamogga</p>
          </div>
        </div>

        {}
        <div className="border border-slate-200 rounded-2xl p-6 lg:p-8 bg-slate-50 mb-8 lg:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-slate-600" />
              <h2 className="text-base lg:text-lg font-semibold text-slate-900">
                Progress
              </h2>
            </div>
            <span className="text-base lg:text-lg text-slate-500 font-medium">
              {getCurrentStep() + 1}/5
            </span>
          </div>
          <div className="flex items-center -space-x-px lg:-space-x-2 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="flex-1 h-1 bg-slate-200 rounded-full mx-5 lg:mx-6" />
            </div>
            {steps.map((step, index) => (
              <div key={step.key} className="flex flex-col items-center flex-1 min-w-0 z-10">
                <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm border-2 ${
                  index <= getCurrentStep() 
                    ? 'bg-[#005aa9] text-white border-[#005aa9]' 
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-500'
                }`}>
                  <span className="font-bold text-sm lg:text-base">{index + 1}</span>
                </div>
                <span className={`text-xs lg:text-sm text-center mt-3 px-2 truncate font-medium ${
                  index <= getCurrentStep() ? 'text-[#005aa9]' : 'text-slate-500'
                }`}>
                  {window.innerWidth < 640 ? step.short : step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {!stats.registration && (
            <button
              onClick={() => navigate('/registration')}
              className="p-4 lg:p-6 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-all text-center group"
            >
              <CreditCard className="w-6 h-6 lg:w-7 lg:h-7 mx-auto mb-3 text-slate-600 group-hover:text-[#005aa9] transition-colors" />
              <p className="font-semibold text-sm lg:text-base text-slate-900 mb-1">Register</p>
              <p className="text-xs lg:text-sm text-slate-500">Start now</p>
            </button>
          )}
          <button
            onClick={() => navigate('/accommodation')}
            className="p-4 lg:p-6 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-all text-center group"
          >
            <Hotel className="w-6 h-6 lg:w-7 lg:h-7 mx-auto mb-3 text-slate-600 group-hover:text-[#009688] transition-colors" />
            <p className="font-semibold text-sm lg:text-base text-slate-900 mb-1">Stay</p>
            <p className="text-xs lg:text-sm text-slate-500">Book hotel</p>
          </button>
          <button
            onClick={() => navigate('/abstract/rules')}
            className="p-4 lg:p-6 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-all text-center group"
          >
            <FileText className="w-6 h-6 lg:w-7 lg:h-7 mx-auto mb-3 text-slate-600 group-hover:text-[#005aa9] transition-colors" />
            <p className="font-semibold text-sm lg:text-base text-slate-900 mb-1">Abstract</p>
            <p className="text-xs lg:text-sm text-slate-500">Submit paper</p>
          </button>
          <button
            onClick={() => navigate('/feedback')}
            className="p-4 lg:p-6 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-all text-center group"
          >
            <MessageSquare className="w-6 h-6 lg:w-7 lg:h-7 mx-auto mb-3 text-slate-600 group-hover:text-orange-500 transition-colors" />
            <p className="font-semibold text-sm lg:text-base text-slate-900 mb-1">Feedback</p>
            <p className="text-xs lg:text-sm text-slate-500">Share experience</p>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {}
          <section className="lg:col-span-2 space-y-6 lg:space-y-8">
            {}
            <div className="border border-slate-200 rounded-2xl p-6 lg:p-8 bg-slate-50">
              <div className="flex items-center justify-between mb-6 lg:mb-8">
                <h2 className="text-base lg:text-lg font-semibold text-slate-900 flex items-center gap-3">
                  <CreditCard className="w-5 h-5 lg:w-6 lg:h-6 text-slate-600" />
                  Registration #{stats.registration?.registrationNumber || 'Pending'}
                </h2>
                {stats.registration && (
                  <button className="text-sm lg:text-base text-[#005aa9] hover:text-[#009688] flex items-center gap-2 font-medium transition-colors">
                    <Download className="w-4 h-4 lg:w-5 lg:h-5" />
                    Invoice
                  </button>
                )}
              </div>

              {stats.registration ? (
                <div className="space-y-6">
                  <div className="p-6 lg:p-8 border border-slate-200 rounded-xl bg-white">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex-1">
                        <p className="text-base lg:text-lg font-semibold text-slate-900 mb-2">
                          {getRegistrationTypeText(stats.registration.registrationType)}
                        </p>
                        <p className="text-sm lg:text-base text-slate-600">
                          #{stats.registration.registrationNumber}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        {getStatusBadge(stats.registration.paymentStatus)}
                        <p className="text-lg lg:text-xl font-bold text-slate-900">
                          ₹{stats.registration.totalAmount?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {stats.registration.lifetimeMembershipId && (
                    <div className="p-5 lg:p-6 bg-[#005aa9]/10 border border-[#005aa9]/20 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9] flex-shrink-0" />
                        <span className="text-base lg:text-lg font-semibold">
                          Lifetime ID: {stats.registration.lifetimeMembershipId}
                        </span>
                      </div>
                    </div>
                  )}

                  {stats.registration.paymentStatus === 'PENDING' && (
                    <button
                      onClick={() => navigate('/checkout')}
                      className="w-full px-8 py-4 lg:py-5 border-2 border-[#005aa9] bg-[#005aa9] text-white text-base lg:text-lg font-semibold rounded-xl hover:bg-[#004a8b] transition-all flex items-center justify-center gap-3"
                    >
                      Pay Now
                      <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 lg:py-16 border-2 border-dashed border-slate-200 rounded-2xl">
                  <CreditCard className="w-16 h-16 lg:w-20 lg:h-20 text-slate-300 mx-auto mb-6 lg:mb-8" />
                  <p className="text-base lg:text-lg text-slate-600 mb-4">
                    No registration found
                  </p>
                  <p className="text-sm lg:text-base text-slate-500 mb-8 lg:mb-10">
                    Join 5000+ delegates at AOACON 2026
                  </p>
                  <button
                    onClick={() => navigate('/registration')}
                    className="w-full px-8 py-4 lg:py-5 border-2 border-[#005aa9] text-[#005aa9] hover:bg-[#005aa9]/5 rounded-xl text-base lg:text-lg font-semibold transition-all"
                  >
                    Register Now
                  </button>
                </div>
              )}
            </div>

            {}
            <div className="border border-slate-200 rounded-2xl p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6 lg:mb-8">
                <h2 className="text-base lg:text-lg font-semibold text-slate-900 flex items-center gap-3">
                  <Hotel className="w-5 h-5 lg:w-6 lg:h-6 text-slate-600" />
                  Accommodation ({stats.accommodations.length})
                </h2>
                <button
                  onClick={() => navigate('/accommodation')}
                  className="text-sm lg:text-base text-[#009688] hover:text-[#005aa9] font-medium transition-colors"
                >
                  All
                </button>
              </div>

              {stats.accommodations.length > 0 ? (
                <div className="space-y-4">
                  {stats.accommodations.slice(0, 3).map((booking) => (
                    <div key={booking._id} className="p-6 lg:p-8 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-50 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-base lg:text-lg font-semibold text-slate-900 truncate">
                          {booking.accommodationId?.name}
                        </p>
                        {getStatusBadge(booking.paymentStatus)}
                      </div>
                      <p className="text-sm lg:text-base text-slate-600 mb-3">
                        {new Date(booking.checkInDate).toLocaleDateString('short')} - {new Date(booking.checkOutDate).toLocaleDateString('short')}
                      </p>
                      <div className="flex items-center justify-between text-sm lg:text-base">
                        <span>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                        <span className="font-semibold text-slate-900">₹{booking.totalAmount?.toLocaleString()}</span>
                      </div>
                      <p className="text-xs lg:text-sm text-slate-500 mt-2">#{booking.bookingNumber}</p>
                    </div>
                  ))}
                  {stats.accommodations.length > 3 && (
                    <button className="w-full text-sm lg:text-base text-[#009688] py-4 font-semibold border-t border-slate-200 hover:text-[#005aa9] transition-colors">
                      +{stats.accommodations.length - 3} more
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 lg:py-16 border-2 border-dashed border-slate-200 rounded-2xl">
                  <Hotel className="w-16 h-16 lg:w-20 lg:h-20 text-slate-300 mx-auto mb-6 lg:mb-8" />
                  <p className="text-base lg:text-lg text-slate-600 mb-4">
                    No accommodation booked
                  </p>
                  <p className="text-sm lg:text-base text-slate-500 mb-8 lg:mb-10">
                    Multiple hotels available near venue
                  </p>
                  <button
                    onClick={() => navigate('/accommodation')}
                    className="w-full px-8 py-4 lg:py-5 border-2 border-[#009688] text-[#009688] hover:bg-[#009688]/5 rounded-xl text-base lg:text-lg font-semibold transition-all"
                  >
                    Book Stay
                  </button>
                </div>
              )}
            </div>

            {}
            <div className="border border-slate-200 rounded-2xl p-6 lg:p-8 bg-slate-50">
              <h3 className="text-base lg:text-lg font-semibold text-slate-900 mb-6 flex items-center gap-3">
                <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-slate-600" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {stats.registration && (
                  <div className="flex items-center p-5 lg:p-6 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-all">
                    <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9] mr-4 lg:mr-6 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-base lg:text-lg font-semibold text-slate-900 mb-1">
                        Registration #{stats.registration.registrationNumber}
                      </p>
                      <p className="text-sm lg:text-base text-slate-600">
                        {stats.registration.paymentStatus} • {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
                {stats.accommodations[0] && (
                  <div className="flex items-center p-5 lg:p-6 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-all">
                    <Hotel className="w-5 h-5 lg:w-6 lg:h-6 text-[#009688] mr-4 lg:mr-6 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-base lg:text-lg font-semibold text-slate-900 truncate">
                        {stats.accommodations[0].accommodationId?.name}
                      </p>
                      <p className="text-sm lg:text-base text-slate-600">
                        Booked • {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
                {stats.abstract && (
                  <div className="flex items-center p-5 lg:p-6 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-all">
                    <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9] mr-4 lg:mr-6 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-base lg:text-lg font-semibold text-slate-900 truncate">
                        {stats.abstract.title}
                      </p>
                      <p className="text-sm lg:text-base text-slate-600">
                        {stats.abstract.status} • {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {}
          <section className="lg:col-span-1 space-y-6 lg:space-y-8 lg:sticky lg:top-12">
            {}
            <div className="border border-slate-200 rounded-2xl p-6 lg:p-8">
              <h3 className="text-base lg:text-lg font-semibold text-slate-900 mb-6 flex items-center gap-3">
                <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-slate-600" />
                Abstract
              </h3>
              
              {stats.abstract ? (
                <div className="space-y-4 text-sm lg:text-base">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-600">Status</span>
                    {getStatusBadge(stats.abstract.status)}
                  </div>
                  <p className="font-semibold text-slate-900 truncate">{stats.abstract.title}</p>
                  <p className="text-sm text-slate-600">#{stats.abstract.submissionNumber}</p>
                  <button
                    onClick={() => navigate('/abstract')}
                    className="w-full px-4 py-3 text-sm lg:text-base text-[#005aa9] font-semibold border border-[#005aa9]/20 hover:bg-[#005aa9]/5 rounded-xl transition-all"
                  >
                    View Details
                  </button>
                </div>
              ) : (
                <div className="text-center py-10 lg:py-12">
                  <FileText className="w-12 h-12 lg:w-16 lg:h-16 text-slate-300 mx-auto mb-4 lg:mb-6" />
                  <button
                    onClick={() => navigate('/abstract/rules')}
                    className="w-full px-6 py-3 lg:py-4 text-base lg:text-lg text-[#005aa9] font-semibold border border-[#005aa9]/20 hover:bg-[#005aa9]/5 rounded-xl transition-all"
                  >
                    Submit Abstract
                  </button>
                  <p className="text-sm lg:text-base text-slate-500 mt-3">Deadline: Aug 15</p>
                </div>
              )}
            </div>

            {}
            <div className="border border-slate-200 rounded-2xl p-6 lg:p-8">
              <h3 className="text-base lg:text-lg font-semibold text-slate-900 mb-6 flex items-center gap-3">
                <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6 text-slate-600" />
                Feedback
              </h3>
              
              {stats.feedback ? (
                <div className="text-center py-10 lg:py-12">
                  <CheckCircle className="w-12 h-12 lg:w-16 lg:h-16 text-[#005aa9] mx-auto mb-4 lg:mb-6" />
                  <p className="text-base lg:text-lg text-[#005aa9] font-semibold mb-2">
                    Submitted
                  </p>
                  <p className="text-sm lg:text-base text-slate-500">
                    {new Date(stats.feedback.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <div className="text-center py-10 lg:py-12">
                  <MessageSquare className="w-12 h-12 lg:w-16 lg:h-16 text-slate-300 mx-auto mb-4 lg:mb-6" />
                  <button
                    onClick={() => navigate('/feedback')}
                    className="w-full px-6 py-3 lg:py-4 text-base lg:text-lg text-[#005aa9] font-semibold border border-[#005aa9]/20 hover:bg-[#005aa9]/5 rounded-xl transition-all"
                  >
                    Submit Feedback
                  </button>
                  <p className="text-sm lg:text-base text-slate-500 mt-3">After Nov 1</p>
                </div>
              )}
            </div>

            {}
            <div className="border border-slate-200 rounded-2xl p-6 lg:p-8 bg-slate-50">
              <h3 className="text-base lg:text-lg font-semibold text-slate-900 mb-6">
                Conference Details
              </h3>
              <div className="space-y-4 text-sm lg:text-base text-slate-700">
                <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl bg-white">
                  <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9] flex-shrink-0" />
                  Oct 30 - Nov 1, 2026
                </div>
                <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl bg-white">
                  <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-[#009688] flex-shrink-0" />
                  Hotel Royal Orchid, Shivamogga
                </div>
                <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl bg-white">
                  <Users className="w-5 h-5 lg:w-6 lg:h-6 text-[#005aa9] flex-shrink-0" />
                  5000+ Delegates Expected
                </div>
                <button
                  onClick={() => navigate('/program')}
                  className="w-full px-6 py-3 text-sm lg:text-base text-[#005aa9] font-semibold border border-[#005aa9]/20 hover:bg-[#005aa9]/5 rounded-xl transition-all"
                >
                  Full Program →
                </button>
              </div>
            </div>

            {}
            <div className="border border-slate-200 rounded-2xl p-6 lg:p-8 grid grid-cols-2 gap-6 bg-slate-50">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                  {stats.registration ? 1 : 0}
                </div>
                <div className="text-sm lg:text-base text-slate-600 font-medium">Registration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                  {stats.accommodations.length}
                </div>
                <div className="text-sm lg:text-base text-slate-600 font-medium">Bookings</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;