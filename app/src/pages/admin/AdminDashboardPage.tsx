import Card from '@/components/ui/Card';
import PageHeader from '@/components/common/PageHeader';
import { useDogs } from '@/features/adoption/hooks/useDogs';
import { usePosts } from '@/features/stories/hooks/usePosts';
import { usePartners } from '@/features/partners/hooks/usePartners';
import { useResults } from '@/features/results/hooks';
import { useFeatureFlags } from '@/providers/FeatureFlagProvider';

const AdminDashboardPage = () => {
  const { data: dogs } = useDogs();
  const { data: posts } = usePosts();
  const { data: partners } = usePartners();
  const { data: results } = useResults();
  const { flags } = useFeatureFlags();

  const metrics = [
    { label: 'Cães disponíveis', value: dogs?.length ?? 0 },
    { label: 'Histórias publicadas', value: posts?.length ?? 0 },
    { label: 'Parceiros ativos', value: partners?.length ?? 0 },
    { label: 'Resultados registrados', value: results?.length ?? 0 }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Painel administrativo"
        description="Gerencie conteúdo, acompanhe leads e mantenha o site atualizado."
      >
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          {Object.entries(flags).map(([key, value]) => (
            <span key={key} className="rounded-full bg-slate-100 px-3 py-1">
              {key}: {value ? 'on' : 'off'}
            </span>
          ))}
        </div>
      </PageHeader>
      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-slate-500">{metric.label}</span>
            <strong className="text-3xl text-slate-900">{metric.value}</strong>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
