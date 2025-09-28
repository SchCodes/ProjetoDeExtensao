import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/common/PageHeader';
import { useAdoptionLeads, useVolunteerLeads } from '@/features/admin/hooks/useLeads';

const exportCsv = (filename: string, rows: Record<string, unknown>[]) => {
  if (!rows.length) {
    return;
  }

  const headers = Object.keys(rows[0]);
  const csvContent = [headers.join(','), ...rows.map((row) => headers.map((header) => JSON.stringify(row[header] ?? '')).join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const AdminLeadsPage = () => {
  const { data: adoptionLeads } = useAdoptionLeads();
  const { data: volunteerLeads } = useVolunteerLeads();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Leads"
        description="Acompanhe contatos de adoção e voluntariado. Exporta para CSV e acompanhe o retorno."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Adoção</h3>
              <p className="text-xs text-slate-500">{adoptionLeads?.length ?? 0} leads</p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => exportCsv('leads-adocao.csv', adoptionLeads ?? [])}
              disabled={!adoptionLeads?.length}
            >
              Exportar CSV
            </Button>
          </div>
          <div className="space-y-3 text-sm text-slate-600">
            {adoptionLeads?.map((lead) => (
              <div key={lead.id} className="rounded-lg border border-slate-200 p-3">
                <p className="font-semibold text-slate-900">{lead.name}</p>
                <p>{lead.email} · {lead.phone}</p>
                <p className="text-xs text-slate-500">Cão: {lead.dogId}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Voluntariado</h3>
              <p className="text-xs text-slate-500">{volunteerLeads?.length ?? 0} leads</p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => exportCsv('leads-voluntariado.csv', volunteerLeads ?? [])}
              disabled={!volunteerLeads?.length}
            >
              Exportar CSV
            </Button>
          </div>
          <div className="space-y-3 text-sm text-slate-600">
            {volunteerLeads?.map((lead) => (
              <div key={lead.id} className="rounded-lg border border-slate-200 p-3">
                <p className="font-semibold text-slate-900">{lead.name}</p>
                <p>{lead.email} · {lead.phone}</p>
                <p className="text-xs text-slate-500">Área: {lead.area}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminLeadsPage;
