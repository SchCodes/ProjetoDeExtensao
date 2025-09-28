import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/common/PageHeader';
import { useResults } from '@/features/results/hooks';

const AdminResultsPage = () => {
  const { data: results } = useResults();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Resultados mensais"
        description="Atualize quantos animais foram impactados e registre campanhas especiais."
        actions={<Button type="button">Novo registro</Button>}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {results?.map((result) => (
          <Card key={result.id} className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-slate-500">{result.id}</span>
            <strong className="text-3xl text-slate-900">{result.helpedCount}</strong>
            {result.notes ? <p className="text-sm text-slate-600">{result.notes}</p> : null}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminResultsPage;
