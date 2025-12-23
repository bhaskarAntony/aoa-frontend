import Header from '../../components/common/Header';
import MobileNav from '../../components/common/MobileNav';

const sections = [
  {
    title: 'Information We Collect',
    body: [
      'Registration details such as name, email address, phone number, and professional affiliation.',
      'Payment-related information processed through authorized payment gateways (we do not store full card details).',
      'Abstract submissions, feedback forms, and accommodation preferences when provided.',
    ],
  },
  {
    title: 'How We Use Your Information',
    body: [
      'To process registrations, confirm participation, and provide conference updates.',
      'To manage accommodation, workshops, and abstract review workflows.',
      'To improve the conference experience through aggregated analytics and feedback.',
    ],
  },
  {
    title: 'Sharing of Information',
    body: [
      'Information may be shared with authorized committee members and service providers solely for conference operations.',
      'We do not sell or rent personal data to third parties.',
    ],
  },
  {
    title: 'Data Security',
    body: [
      'We implement reasonable administrative and technical safeguards to protect your data.',
      'Access to personal information is limited to authorized personnel.',
    ],
  },
  {
    title: 'Your Choices',
    body: [
      'You may request corrections to your registration details by contacting the secretariat.',
      'You may opt out of non-essential communications at any time.',
    ],
  },
  {
    title: 'Retention',
    body: [
      'We retain personal information only as long as necessary for conference operations and legal compliance.',
    ],
  },
  {
    title: 'Updates to This Policy',
    body: [
      'We may update this policy periodically and will post changes on this page.',
    ],
  },
];

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="max-w-5xl mx-auto px-4 lg:px-6 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-sky-700 px-6 sm:px-8 py-8 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-100">
              Conference Policies
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold mt-2">Privacy Policy</h1>
            <p className="text-sm text-emerald-100/90 mt-2 max-w-2xl">
              This policy explains how AOACON 2026 collects, uses, and protects your personal
              information.
            </p>
          </div>

          <div className="px-6 sm:px-8 py-8 space-y-6">
            {sections.map((section, index) => (
              <div
                key={section.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-700 text-white text-sm font-semibold">
                    {index + 1}
                  </span>
                  <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
                </div>
                <ul className="text-sm text-slate-700 leading-relaxed space-y-2 list-disc pl-5">
                  {section.body.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default PrivacyPolicyPage;
