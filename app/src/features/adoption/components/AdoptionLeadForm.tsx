import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { useCreateAdoptionLead } from '../hooks/useAdoptionLead';

const adoptionSchema = z.object({
  name: z.string().min(2, 'Informe seu nome'),
  email: z.string().email('Informe um e-mail válido'),
  phone: z.string().min(8, 'Informe um telefone'),
  message: z.string().min(10, 'Conte um pouco sobre você e o lar'),
  dogId: z.string().min(1, 'Selecione um cão')
});

type AdoptionFormData = z.infer<typeof adoptionSchema>;

interface AdoptionLeadFormProps {
  dogId: string;
  dogName?: string;
}

const AdoptionLeadForm = ({ dogId, dogName }: AdoptionLeadFormProps) => {
  const mutation = useCreateAdoptionLead();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<AdoptionFormData>({
    resolver: zodResolver(adoptionSchema),
    defaultValues: {
      dogId
    }
  });

  const onSubmit = async (data: AdoptionFormData) => {
    await mutation.mutateAsync(data);
    reset({ dogId, message: '', name: '', email: '', phone: '' });
    window.alert('Recebemos sua mensagem. Em breve entraremos em contato.');
  };

  return (
    <form className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Quero adotar {dogName ?? 'este cão'}</h3>
        <p className="text-sm text-slate-500">Preencha seus dados e retornaremos com os próximos passos.</p>
      </div>
      <input type="hidden" value={dogId} {...register('dogId')} />
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="name">
            Nome
          </label>
          <Input id="name" {...register('name')} placeholder="Seu nome" />
          {errors.name ? <p className="text-xs text-error">{errors.name.message}</p> : null}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="phone">
            Telefone / WhatsApp
          </label>
          <Input id="phone" {...register('phone')} placeholder="(11) 99999-0000" />
          {errors.phone ? <p className="text-xs text-error">{errors.phone.message}</p> : null}
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="email">
          E-mail
        </label>
        <Input id="email" type="email" {...register('email')} placeholder="voce@exemplo.com" />
        {errors.email ? <p className="text-xs text-error">{errors.email.message}</p> : null}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="message">
          Fale sobre você e seu lar
        </label>
        <Textarea
          id="message"
          rows={4}
          {...register('message')}
          placeholder="Conte sobre rotina da casa, outros animais, quintal..."
        />
        {errors.message ? <p className="text-xs text-error">{errors.message?.message}</p> : null}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar interesse'}
      </Button>
    </form>
  );
};

export default AdoptionLeadForm;

