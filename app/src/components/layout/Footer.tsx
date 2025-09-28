import { Link } from 'react-router-dom';
import { useSettings } from '@/hooks/useSettings';

const Footer = () => {
  const { data: settings } = useSettings();

  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-lg font-semibold text-primary">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">??</span>
            <span>ONG Cães</span>
          </div>
          <p className="text-sm text-slate-600">
            Resgatamos, cuidamos e encontramos lares amorosos para cães em situação de risco.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Contato</h4>
          <p className="text-sm text-slate-600">{settings?.contact ?? 'Informe seus contatos nas configurações.'}</p>
          <Link to="/voluntario" className="text-sm font-semibold text-primary hover:text-primary-dark">
            Seja voluntário
          </Link>
        </div>
        <div id="doacoes" className="space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Doe via PIX</h4>
          <p className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-800">
            {settings?.pixKey ?? 'Configure a chave PIX'}
          </p>
          {settings?.donationNotes ? (
            <p className="text-xs text-slate-500">{settings.donationNotes}</p>
          ) : null}
        </div>
      </div>
      <div className="bg-slate-100 py-3 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} ONG Cães. Construído com amor em parceria com voluntários.
      </div>
    </footer>
  );
};

export default Footer;
