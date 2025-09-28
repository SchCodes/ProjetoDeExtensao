import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import PageHeader from '@/components/common/PageHeader';
import { useAdmin } from '@/providers/AdminProvider';

const AdminLoginPage = () => {
  const { isAdmin, setAdmin } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      window.alert('Informe e-mail e senha.');
      return;
    }

    setAdmin(true);
    window.alert('Acesso admin liberado localmente. Configure Firebase Auth para produção.');
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Login administrativo" description="Acesso restrito a responsáveis da ONG." />
      <Card className="max-w-md space-y-4">
        {isAdmin ? (
          <p className="text-sm text-green-700">Você já está autenticado localmente.</p>
        ) : null}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="email">
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@ong.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="password">
              Senha
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
            />
          </div>
          <Button type="submit">Entrar</Button>
        </form>
        <p className="text-xs text-slate-500">
          Em produção, utilize Firebase Auth com roles. Este formulário habilita o modo admin apenas no navegador atual.
        </p>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
