import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Upload,
  ArrowRight,
  Users
} from 'lucide-react';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AbstractRulesPage = () => {
  const [acceptedRules, setAcceptedRules] = useState(false);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (acceptedRules) {
      navigate('/abstract/upload');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 lg:py-12 space-y-8 lg:space-y-12 pb-20">
        {}
        <div className="flex items-center mb-8 lg:mb-12 p-6 lg:p-8 border border-slate-200 rounded-2xl bg-slate-50">
          <div className="ml-4 lg:ml-6">
            <h1 className="text-2xl lg:text-3xl font-semibold text-slate-900 mb-2">
              Submission Guidelines
            </h1>
            <p className="text-lg lg:text-xl text-slate-600">
              AOA Shivamogga 2026 Abstract Rules
            </p>
          </div>
        </div>

        {}
        <div className="space-y-6 lg:space-y-8">
          {}
          <div className="border border-slate-200 rounded-2xl p-6 lg:p-8">
            <h2 className="text-lg lg:text-xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 lg:w-7 lg:h-7 text-[#005aa9]" />
              1. Abstract Format
            </h2>
            <div className="space-y-4 text-base lg:text-lg text-slate-700 leading-relaxed">
              <div>• Maximum 300 words for abstract body (excluding title/authors)</div>
              <div>• Title should not exceed 20 words</div>
              <div>• Include all author names and affiliations</div>
              <div>• Structure: Background, Methods, Results, Conclusion</div>
              <div>• Times New Roman, 12pt font, 1.5 line spacing</div>
              <div>• No images, tables, graphs, or references in abstract</div>
            </div>
          </div>

          {}
          <div className="border border-slate-200 rounded-2xl p-6 lg:p-8">
            <h2 className="text-lg lg:text-xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 lg:w-7 lg:h-7 text-[#005aa9]" />
              2. File Requirements
            </h2>
            <div className="space-y-4 text-base lg:text-lg text-slate-700 leading-relaxed">
              <div>• PDF format only</div>
              <div>• Maximum file size: 5MB</div>
              <div>• File name: LastName_FirstName_Abstract.pdf</div>
              <div>• Single column layout, A4 page size</div>
            </div>
          </div>

          {}
          <div className="border border-slate-200 rounded-2xl p-6 lg:p-8 bg-slate-50">
            <h2 className="text-lg lg:text-xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 lg:w-7 lg:h-7 text-[#005aa9]" />
              5. Important Dates
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 px-6 bg-white border border-slate-200 rounded-xl">
                <span className="text-base lg:text-lg font-medium text-slate-700">Regular Submission Deadline</span>
                <span className="text-xl lg:text-2xl font-bold text-[#005aa9]">October 15, 2025</span>
              </div>
              <div className="flex items-center justify-between py-3 px-6 bg-white border border-slate-200 rounded-xl">
                <span className="text-base lg:text-lg font-medium text-slate-700">Final Submission Deadline</span>
                <span className="text-xl lg:text-2xl font-bold text-slate-900">October 25, 2025</span>
              </div>
              <div className="flex items-center justify-between py-3 px-6 bg-white border border-slate-200 rounded-xl">
                <span className="text-base lg:text-lg font-medium text-slate-700">Review Results</span>
                <span className="text-xl lg:text-2xl font-bold text-slate-900">October 28, 2025</span>
              </div>
            </div>
          </div>

          {}
          <div className="border border-slate-200 rounded-2xl p-6 lg:p-8">
            <h2 className="text-lg lg:text-xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 lg:w-7 lg:h-7 text-amber-500" />
              6. Rules & Regulations
            </h2>
            <div className="space-y-6">
              <div className="p-6 lg:p-8 bg-amber-50/50 border-2 border-amber-200/50 rounded-2xl">
                <div className="text-lg lg:text-xl font-semibold text-amber-800 mb-4">Eligibility:</div>
                <ul className="space-y-3 text-base lg:text-lg text-amber-900 leading-relaxed list-disc list-inside ml-4">
                  <li>Only registered conference participants</li>
                  <li>First author must be medical professional</li>
                  <li>Maximum 2 abstracts per first author</li>
                </ul>
              </div>
              <div className="p-6 lg:p-8 bg-red-50/50 border-2 border-red-200/50 rounded-2xl">
                <div className="text-lg lg:text-xl font-semibold text-red-800 mb-4">Restrictions:</div>
                <ul className="space-y-3 text-base lg:text-lg text-red-900 leading-relaxed list-disc list-inside ml-4">
                  <li>No previously published work</li>
                  <li>No simultaneous submissions elsewhere</li>
                  <li>Plagiarism = immediate rejection</li>
                  <li>No commercial content allowed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="border-2 border-slate-200 rounded-2xl p-8 lg:p-10 bg-gradient-to-b from-slate-50 to-white">
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <FileText className="w-7 h-7 lg:w-8 lg:h-8 text-[#005aa9]" />
            Terms & Conditions
          </h2>
          
          <div className="prose prose-lg lg:prose-xl mb-8 max-w-none text-slate-700 leading-relaxed">
            <ol className="space-y-4 list-decimal list-inside">
              <li><span className="font-semibold text-slate-900">Originality:</span> Work must be original and unpublished. Plagiarism detection mandatory.</li>
              <li><span className="font-semibold text-slate-900">Copyright:</span> Authors retain copyright but grant AOA Shivamogga rights to publish accepted abstracts.</li>
              <li><span className="font-semibold text-slate-900">Review:</span> Double-blind peer review. Organizing committee decision final and binding.</li>
              <li><span className="font-semibold text-slate-900">Presentation:</span> At least one author must register and present. No-shows result in rejection.</li>
              <li><span className="font-semibold text-slate-900">Publication:</span> Accepted abstracts published in proceedings. May be invited for full papers.</li>
              <li><span className="font-semibold text-slate-900">Withdrawal:</span> Allowed before review begins. No registration fee refunds.</li>
            </ol>
          </div>

          {}
          <label className="flex items-start gap-4 p-6 lg:p-8 border-2 border-[#005aa9]/20 rounded-2xl bg-[#005aa9]/5 hover:border-[#005aa9]/40 transition-all cursor-pointer mb-8 lg:mb-10">
            <input
              type="checkbox"
              checked={acceptedRules}
              onChange={(e) => setAcceptedRules(e.target.checked)}
              className="mt-1 h-6 w-6 lg:h-7 lg:w-7 text-[#005aa9] border-2 border-[#005aa9]/50 focus:ring-[#005aa9]/50 rounded-xl flex-shrink-0"
            />
            <span className="text-base lg:text-lg text-slate-800 leading-relaxed flex-1">
              I have read, understood, and agree to all Submission Guidelines, Rules & Regulations, and Terms & Conditions above.
            </span>
          </label>

          {}
          <button
            onClick={handleProceed}
            disabled={!acceptedRules}
            className="w-full lg:w-auto px-8 lg:px-10 py-5 lg:py-6 rounded-2xl border-2 border-[#005aa9] bg-[#005aa9] text-white text-lg lg:text-xl font-bold hover:bg-[#004a8b] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-none"
          >
            <Upload className="w-6 h-6 lg:w-7 lg:h-7" />
            Proceed to Upload Abstract
            <ArrowRight className="w-6 h-6 lg:w-7 lg:h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AbstractRulesPage;