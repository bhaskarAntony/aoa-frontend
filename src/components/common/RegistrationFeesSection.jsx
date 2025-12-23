import { Link } from 'react-router-dom';

const feeRows = [
  {
    label: 'AOA Member',
    early: { conf: '8000', ws: '10000', combo: null },
    regular: { conf: '10000', ws: '12000', combo: null },
    spot: { conf: '13000' },
  },
  {
    label: 'Non-Member',
    early: { conf: '11000', ws: '13000', combo: '16000' },
    regular: { conf: '13000', ws: '15000', combo: '18000' },
    spot: { conf: '16000' },
  },
  {
    label: 'PGs & Fellows',
    early: { conf: '7000', ws: '9000', combo: '12000' },
    regular: { conf: '9000', ws: '11000', combo: '14000' },
    spot: { conf: '12000' },
  },
];

const renderCell = (value) => value ?? '—';

const RegistrationFeesSection = () => {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 lg:py-10 space-y-4">
        <div className="rounded-xl overflow-hidden border border-slate-200">
          <div className="bg-[#4b78b7] px-4 py-3 text-white font-semibold tracking-wide">
            REGISTRATION FEES * : AOA Shivamogga - 2026
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[820px]">
              <thead>
                <tr className="bg-slate-200 text-red-600 text-center">
                  <th
                    rowSpan="2"
                    className="border border-slate-300 px-3 py-3 text-slate-800 font-semibold"
                  >
                    Category
                  </th>
                  <th colSpan="3" className="border border-slate-300 px-3 py-3 font-semibold">
                    EARLY BIRD (Upto August 15th)
                  </th>
                  <th colSpan="3" className="border border-slate-300 px-3 py-3 font-semibold">
                    REGULAR (Aug 15th to Oct 15th)
                  </th>
                  <th colSpan="1" className="border border-slate-300 px-3 py-3 font-semibold">
                    SPOT (Oct 16th onwards)
                  </th>
                </tr>
                <tr className="bg-slate-100 text-purple-700 text-center">
                  <th className="border border-slate-300 px-3 py-2 font-semibold">Conference</th>
                  <th className="border border-slate-300 px-3 py-2 font-semibold">WS + Conf</th>
                  <th className="border border-slate-300 px-3 py-2 font-semibold">
                    Combo Offers AOA Life Membership + Conf
                  </th>
                  <th className="border border-slate-300 px-3 py-2 font-semibold">Conference</th>
                  <th className="border border-slate-300 px-3 py-2 font-semibold">WS + Conf</th>
                  <th className="border border-slate-300 px-3 py-2 font-semibold">
                    Combo Offers AOA Life Membership + Conf
                  </th>
                  <th className="border border-slate-300 px-3 py-2 font-semibold">
                    Conference only
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {feeRows.map((row, index) => (
                  <tr key={row.label} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}>
                    <td className="border border-slate-300 px-3 py-3 font-semibold text-red-600">
                      {row.label}
                    </td>
                    <td className="border border-slate-300 px-3 py-3">{renderCell(row.early.conf)}</td>
                    <td className="border border-slate-300 px-3 py-3">{renderCell(row.early.ws)}</td>
                    <td className="border border-slate-300 px-3 py-3 font-semibold">
                      {renderCell(row.early.combo)}
                    </td>
                    <td className="border border-slate-300 px-3 py-3">{renderCell(row.regular.conf)}</td>
                    <td className="border border-slate-300 px-3 py-3">{renderCell(row.regular.ws)}</td>
                    <td className="border border-slate-300 px-3 py-3 font-semibold">
                      {renderCell(row.regular.combo)}
                    </td>
                    <td className="border border-slate-300 px-3 py-3 font-semibold">
                      {renderCell(row.spot.conf)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-sm text-slate-700">
            <p className="font-semibold text-[#005aa9]">Accompanying person - Rs 7000/-</p>
            <p className="text-red-600 font-semibold">* GST Extra</p>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-xl bg-[#005aa9] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#004b8f] transition-colors"
          >
            Register Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegistrationFeesSection;
