import Card from '@/components/ui/Card';
import type { Result } from '@/types';

interface ResultsHighlightProps {
  results: Result[] | undefined;
}

const ResultsHighlight = ({ results }: ResultsHighlightProps) => {
  const latest = results?.[0];
  const helpedCount = latest?.helpedCount ?? 0;

  return (
    <Card className="flex flex-col gap-2 bg-primary text-white">
      <span className="text-sm uppercase tracking-widest text-white/75">Este mês</span>
      <span className="text-4xl font-semibold">{helpedCount}</span>
      <p className="text-sm text-white/80">animais receberam acolhimento, cuidados ou adoção</p>
      {latest?.notes ? <p className="text-xs text-white/70">{latest.notes}</p> : null}
    </Card>
  );
};

export default ResultsHighlight;
