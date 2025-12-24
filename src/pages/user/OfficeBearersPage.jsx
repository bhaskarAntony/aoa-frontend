import Header from '../../components/common/Header';
import anjuGrewal from '../../images/AOAOfficeBearers/Anju-Grewal.jpg';
import arunaParameswari from '../../images/AOAOfficeBearers/Aruna-Parameswari.jpg';
import kajalJain from '../../images/AOAOfficeBearers/Kajal-Jain.jpg';
import shilpaKasodeka from '../../images/AOAOfficeBearers/shilpa-kasodeka.jpg';
import glRavindra from '../../images/AOAOfficeBearers/GL-Ravindra.jpg';
import sunandaGupta from '../../images/AOAOfficeBearers/sunanda-gupta.jpg';
import anjanTrikha from '../../images/AOAOfficeBearers/anjan-trikha.jpg';
import sunilPandaya from '../../images/AOAOfficeBearers/sunil-pandaya.jpg';
import anjelenaKumar from '../../images/AOAOfficeBearers/Anjelena-Kumar.jpg';
import gitaNath from '../../images/AOAOfficeBearers/Gita-Nath.jpg';
import akilandeswari from '../../images/AOAOfficeBearers/Akilandeswari-M.jpg';
import nidhiBhatia from '../../images/AOAOfficeBearers/nidhi-bhatia.jpg';
import manokanthMadapu from '../../images/AOAOfficeBearers/manokanth-madapu.jpg';
import manishaShembrkar from '../../images/AOAOfficeBearers/manisha-shembrkar.jpg';

const officeBearers = [
  { name: 'Dr. Anju Grewal', designation: 'President', image: anjuGrewal },
  { name: 'Dr. Aruna Parameswari', designation: 'Secretary', image: arunaParameswari },
  { name: 'Dr. Kajal Jain', designation: 'Immediate Past President', image: kajalJain },
  { name: 'Dr. Shilpa Kasokedar', designation: 'Vice President', image: shilpaKasodeka },
  { name: 'Dr. G. L. Ravindra', designation: 'Joint Secretary', image: glRavindra },
  { name: 'Dr. Sunanda Gupta', designation: 'Founder President', image: sunandaGupta },
  { name: 'Dr. Anjan Trikha', designation: 'Past President & Chief Editor', image: anjanTrikha },
  { name: 'Dr. Sunil T Pandya', designation: 'Past President', image: sunilPandaya },
  { name: 'Dr. Anjelena Kumar Gupta', designation: 'Treasurer', image: anjelenaKumar },
  { name: 'Dr. Gita Nath', designation: 'Executive Members', image: gitaNath },
  { name: 'Dr. Akilandeswari M', designation: 'Executive Members', image: akilandeswari },
  { name: 'Dr. Nidhi Bhatia', designation: 'Executive Members', image: nidhiBhatia },
  { name: 'Dr. Manokanth Madapu', designation: 'Executive Members', image: manokanthMadapu },
  { name: 'Dr. Manisha Shembekar', designation: 'Executive Members', image: manishaShembrkar },
];

const OfficeBearersPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <section className="relative overflow-hidden">
        <div
          className="h-36 sm:h-44 lg:h-52 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://thecollegesphere.com/wp-content/uploads/2025/09/Shimoga-Institute-of-Medical-Sciences.gif)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-wide">
            Office Bearers
          </h1>
          <p className="text-xs sm:text-sm mt-2 text-white/90">
            Home <span className="mx-2">|</span> AOA Office Bearers
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
          {officeBearers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-[22px] border border-[#d7dff0] shadow-[0_12px_24px_rgba(15,23,42,0.25)] px-5 py-6 text-center"
            >
              <div className="mx-auto w-28 h-28 rounded-full border-[3px] border-dotted border-[#b46a94] p-1">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="mt-5 text-sm sm:text-lg font-semibold text-[#d81b60]">
                {member.name}
              </p>
              <p className="text-xs sm:text-base font-semibold text-[#3f51b5]">
                {member.designation}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OfficeBearersPage;
