import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/common/PageHeader';
import { useDogs } from '@/features/adoption/hooks/useDogs';

const AdminDogsPage = () => {
  const { data: dogs } = useDogs();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Gestão de cães"
        description="Cadastre novos resgates, atualize status e mantenha fotos em até 5MB."
        actions={<Button type="button">Novo cão</Button>}
      />
      <Card className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase tracking-widest text-slate-500">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Porte</th>
              <th className="px-4 py-3">Tags</th>
              <th className="px-4 py-3">Atualizado em</th>
            </tr>
          </thead>
          <tbody>
            {dogs?.map((dog) => (
              <tr key={dog.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{dog.name}</td>
                <td className="px-4 py-3 capitalize text-slate-600">{dog.status}</td>
                <td className="px-4 py-3">{dog.size}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{dog.tags.join(', ')}</td>
                <td className="px-4 py-3 text-xs text-slate-500">
                  {new Date(dog.updatedAt).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default AdminDogsPage;
