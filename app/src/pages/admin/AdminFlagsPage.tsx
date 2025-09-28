import { useMemo, useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import Button from '@/components/ui/Button';
import { useFeatureFlags } from '@/providers/FeatureFlagProvider';
import { useFeatureFlagsMutation } from '@/features/admin/hooks/useFeatureFlagsMutation';

const flagDescriptions: Record<string, string> = {
  adoption: 'Exibe lista pública de cães disponíveis para adoção.',
  donations: 'Exibe página e sessão de doações (PIX / itens).',
  stories: 'Exibe histórias e resultados publicados.',
  partners: 'Exibe logotipos de parceiros.',
  volunteers: 'Exibe formulário público de voluntariado.',
  lostPets: 'Reserva para módulo futuro de animais perdidos.'
};

const AdminFlagsPage = () => {
  const { flags } = useFeatureFlags();
  const mutation = useFeatureFlagsMutation();
  const [localFlags, setLocalFlags] = useState(flags);

  const isDirty = useMemo(
    () => Object.entries(localFlags).some(([key, value]) => value !== flags[key as keyof typeof flags]),
    [flags, localFlags]
  );

  const handleToggle = (flag: keyof typeof flags) => {
    setLocalFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await mutation.mutateAsync(localFlags);
    window.alert('Flags atualizadas com sucesso.');
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Feature Flags"
        description="Controle quais seções ficam visíveis para o público."
      />
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(localFlags).map(([flag, value]) => (
            <label
              key={flag}
              className="flex cursor-pointer flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold capitalize text-slate-900">{flag}</span>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleToggle(flag as keyof typeof flags)}
                />
              </div>
              <p className="text-xs text-slate-500">{flagDescriptions[flag] ?? ''}</p>
            </label>
          ))}
        </div>
        <Button type="submit" disabled={!isDirty || mutation.isPending}>
          {mutation.isPending ? 'Salvando...' : 'Salvar alterações'}
        </Button>
      </form>
    </div>
  );
};

export default AdminFlagsPage;
