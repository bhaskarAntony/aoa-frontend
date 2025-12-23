import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-100 border-t border-slate-800 pb-16 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">AOACON 2026</p>
          <h3 className="text-lg font-semibold text-white">
            Association of Obstetric Anaesthesiologists Conference
          </h3>
          <p className="text-sm text-slate-300">
            Hosted by the Department of Anaesthesiology, SIMS and ISA City Chapter, Shivamogga.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-white">Quick links</p>
          <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
            <Link className="hover:text-white transition-colors" to="/">
              Home
            </Link>
            <Link className="hover:text-white transition-colors" to="/register-details">
              Registration
            </Link>
            <Link className="hover:text-white transition-colors" to="/venue">
              Venue
            </Link>
            <Link className="hover:text-white transition-colors" to="/contact">
              Contact
            </Link>
            <Link className="hover:text-white transition-colors" to="/terms">
              Terms & Conditions
            </Link>
            <Link className="hover:text-white transition-colors" to="/cancellation-policy">
              Cancellation Policy
            </Link>
            <Link className="hover:text-white transition-colors" to="/privacy-policy">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="space-y-3 text-sm text-slate-300">
          <p className="text-sm font-semibold text-white">Contact</p>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-0.5 text-emerald-200" />
            <span>Shimoga Institute of Medical Sciences, Shivamogga, Karnataka</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-200" />
            <span>6361912008</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-200" />
            <span>regaoacon2026@gmail.com</span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-4 text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span>© 2026 AOACON Shivamogga. All rights reserved.</span>
          <span>Conference terms apply to all registered delegates.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
