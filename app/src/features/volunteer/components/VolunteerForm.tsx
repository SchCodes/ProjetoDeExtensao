import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { useCreateVolunteerLead } from '../hooks/useVolunteerLead';

const volunteerSchema = z.object({
  name: z.string().min(2, 'Informe seu nome completo'),
  email: z.string().email('Informe um e-mail válido'),
  phone: z.string().min(8, 'Informe um telefone para contato'),
  area: z.string().min(2, 'Conte como você pode ajudar'),
  message: z.string().optional()
});

type VolunteerFormData = z.infer<typeof volunteerSchema>;

const VolunteerForm = () => {
  const mutation = useCreateVolunteerLead();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema)
  });

  const onSubmit = async (data: VolunteerFormData) => {
    await mutation.mutateAsync(data);
    reset();
    window.alert('Recebemos sua mensagem. Em breve entraremos em contato.');
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="name">
          Nome completo
        </label>
        <Input id="name" placeholder="Como devemos chamar você?" {...register('name')} />
        {errors.name ? <p className="text-xs text-error">{errors.name.message}</p> : null}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="email">
            E-mail
          </label>
          <Input id="email" type="email" placeholder="seuemail@exemplo.com" {...register('email')} />
          {errors.email ? <p className="text-xs text-error">{errors.email.message}</p> : null}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="phone">
            Telefone / WhatsApp
          </label>
          <Input id="phone" placeholder="(11) 99999-0000" {...register('phone')} />
          {errors.phone ? <p className="text-xs text-error">{errors.phone.message}</p> : null}
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="area">
          Como você quer ajudar?
        </label>
        <Textarea
          id="area"
          placeholder="Ex.: Lar temporário, transporte, doações corporativas, redes sociais..."
          rows={4}
          {...register('area')}
        />
        {errors.area ? <p className="text-xs text-error">{errors.area.message}</p> : null}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="message">
          Mensagem (opcional)
        </label>
        <Textarea id="message" rows={3} {...register('message')} />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Quero ser voluntário'}
      </Button>
    </form>
  );
};

export default VolunteerForm;
