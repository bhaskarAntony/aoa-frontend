import Header from '../../components/common/Header';
import MobileNav from '../../components/common/MobileNav';

const sections = [
  {
    title: 'Cancellation by Delegate',
    body: [
      'All cancellation requests must be made in writing via email to the conference secretariat.',
      'Refunds will be processed according to the following schedule:',
      'Up to [120 Days before the Event]: 75% refund of the registration fee.',
      'Between [119 to 60 Days Before the Event]: 50% refund of the registration fee.',
      'Less than [60 Days Before the Event]: No refund will be issued.',
    ],
  },
  {
    title: 'Cancellation by the Organizer',
    body: [
      'If the conference is canceled due to unforeseen circumstances, all registered delegates will receive a full refund of the registration fee.',
      'The organizers are not responsible for any other costs incurred, such as travel or accommodation expenses.',
    ],
  },
  {
    title: 'Force Majeure',
    body: [
      'In the event of cancellation or rescheduling due to circumstances beyond the organizers’ control (e.g., natural disasters, pandemics, or government restrictions), the organizers will make every effort to reschedule the event.',
      'Refund policies will be revised and communicated accordingly.',
    ],
  },
  {
    title: 'Refund Processing Time',
    body: ['Approved refunds will be processed within [30 Days] of the cancellation request.'],
  },
  {
    title: 'No-Show Policy',
    body: [
      'No refunds will be provided for delegates who do not attend the conference without prior cancellation.',
    ],
  },
];

const CancellationPolicyPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="max-w-5xl mx-auto px-4 lg:px-6 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#005aa9] via-sky-700 to-emerald-700 px-6 sm:px-8 py-8 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-sky-100">
              Conference Policies
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold mt-2">
              Cancellation and Refund Policy
            </h1>
            <p className="text-sm text-sky-100/90 mt-2 max-w-2xl">
              Please review the cancellation timelines and refund eligibility before confirming
              your registration.
            </p>
          </div>

          <div className="px-6 sm:px-8 py-8 space-y-6">
            {sections.map((section, index) => (
              <div
                key={section.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#005aa9] text-white text-sm font-semibold">
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

export default CancellationPolicyPage;
