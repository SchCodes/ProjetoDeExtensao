import Button from '@/components/ui/Button';

const NotFoundPage = () => (
  <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
    <h1 className="text-4xl font-semibold text-slate-900">Página não encontrada</h1>
    <p className="text-slate-600">Talvez o conteúdo tenha sido removido ou esteja com a flag desativada.</p>
    <Button asChild>
      <a href="/">Voltar para o início</a>
    </Button>
  </div>
);

export default NotFoundPage;
