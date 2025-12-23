import Header from '../../components/common/Header';
import MobileNav from '../../components/common/MobileNav';

const terms = [
  {
    title: 'Eligibility',
    body: [
      'The conference is open to registered delegates only.',
      'Delegates must complete the registration process and pay the applicable fees to confirm participation.',
    ],
  },
  {
    title: 'Payment Terms',
    body: [
      'All registration fees must be paid in full at the time of registration via the available payment methods.',
      'Registrations will only be confirmed upon receipt of full payment.',
    ],
  },
  {
    title: 'Delegate Information',
    body: [
      'The information provided during registration must be accurate. Any errors in the provided information should be reported immediately.',
      'Transfer of registration to another individual is subject to approval and must be requested in writing.',
    ],
  },
  {
    title: 'Liability Disclaimer',
    body: [
      'The organizers will not be responsible for any personal injury, loss, or damage to personal belongings during the conference.',
      'Travel and accommodation arrangements are the responsibility of the delegate.',
    ],
  },
  {
    title: 'Changes to the Program',
    body: [
      'The organizers reserve the right to modify the conference program, including changes to speakers, sessions, and schedules, without prior notice.',
    ],
  },
];

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="max-w-5xl mx-auto px-4 lg:px-6 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 sm:px-8 py-8 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
              Conference Policies
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold mt-2">Terms and Conditions</h1>
            <p className="text-sm text-slate-200 mt-2 max-w-2xl">
              Please read these terms carefully before completing your registration.
            </p>
          </div>

          <div className="px-6 sm:px-8 py-8 space-y-6">
            {terms.map((section, index) => (
              <div
                key={section.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-sm font-semibold">
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

export default TermsPage;
