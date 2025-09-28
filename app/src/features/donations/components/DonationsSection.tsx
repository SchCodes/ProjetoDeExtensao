import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useSettings } from '@/hooks/useSettings';

const DonationsSection = () => {
  const { data: settings } = useSettings();

  const handleCopyPix = async () => {
    if (!settings?.pixKey) {
      return;
    }

    if (!navigator.clipboard) {
      window.prompt('Copie a chave PIX:', settings.pixKey);
      return;
    }

    await navigator.clipboard.writeText(settings.pixKey);
    window.alert('Chave PIX copiada!');
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-900">Doe via PIX</h3>
        <p className="text-sm text-slate-600">Sua doa��o mant�m resgates, consultas, vacinas e alimenta��o.</p>
        <div className="rounded-lg bg-slate-100 px-4 py-3 text-sm font-mono text-slate-800">
          {settings?.pixKey ?? 'Configure a chave PIX nas configura��es.'}
        </div>
        <Button type="button" variant="outline" onClick={handleCopyPix} disabled={!settings?.pixKey}>
          Copiar chave PIX
        </Button>
        {settings?.donationNotes ? <p className="text-xs text-slate-500">{settings.donationNotes}</p> : null}
      </Card>
      <Card className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-900">Itens priorit�rios</h3>
        <ul className="grid gap-2 text-sm text-slate-600">
          <li>� Ra��o seca e �mida (adulto e filhote)</li>
          <li>� Tapetes higi�nicos e jornal</li>
          <li>� Medicamentos antipulgas e verm�fugos</li>
          <li>� Produtos de limpeza para o abrigo</li>
        </ul>
      </Card>
    </div>
  );
};

export default DonationsSection;
