import HeroSection from '@/components/common/HeroSection';
import ResultsHighlight from '@/features/results/ResultsHighlight';
import { useResults } from '@/features/results/hooks';
import AdoptionList from '@/features/adoption/components/AdoptionList';
import { useDogs } from '@/features/adoption/hooks/useDogs';
import DonationsSection from '@/features/donations/components/DonationsSection';
import StoriesList from '@/features/stories/components/StoriesList';
import { usePosts } from '@/features/stories/hooks/usePosts';
import PartnerGrid from '@/features/partners/components/PartnerGrid';
import { usePartners } from '@/features/partners/hooks/usePartners';
import VolunteerForm from '@/features/volunteer/components/VolunteerForm';
import Section from '@/components/common/Section';
import { useFeatureFlags } from '@/providers/FeatureFlagProvider';

const HomePage = () => {
  const { flags } = useFeatureFlags();
  const { data: dogs, isLoading: isLoadingDogs } = useDogs('disponível');
  const { data: posts, isLoading: isLoadingPosts } = usePosts();
  const { data: partners } = usePartners();
  const { data: results } = useResults();

  return (
    <div className="space-y-12">
      <HeroSection
        title="Sua ajuda salva vidas de cães todos os dias"
        subtitle="Acolhemos, tratamos e encontramos lares amorosos para cães resgatados. Faça parte dessa rede de cuidado."
        cta={{ label: 'Ver cães para adoção', href: '/adocao' }}
        secondaryCta={{ label: 'Doe agora', href: '#doacoes' }}
      />

      <Section title="Nosso impacto recente">
        <ResultsHighlight results={results} />
      </Section>

      {flags.adoption ? (
        <Section
          id="adocao"
          title="Cães aguardando um lar"
          description="Conheça os peludos disponíveis e preencha o formulário para dar um novo começo."
        >
          <AdoptionList dogs={dogs} isLoading={isLoadingDogs} />
        </Section>
      ) : null}

      {flags.donations ? (
        <Section id="doacoes" title="Apoie com doações" description="Chave PIX e itens que mantêm o abrigo funcionando.">
          <DonationsSection />
        </Section>
      ) : null}

      {flags.stories ? (
        <Section title="Histórias que inspiram" description="Vitórias que só acontecem graças a você.">
          <StoriesList posts={posts} isLoading={isLoadingPosts} />
        </Section>
      ) : null}

      {flags.partners ? (
        <Section title="Parceiros que caminham conosco">
          <PartnerGrid partners={partners} />
        </Section>
      ) : null}

      {flags.volunteers ? (
        <Section
          id="voluntario"
          title="Seja voluntário ou lar temporário"
          description="Informe como você pode ajudar. Toda habilidade é bem-vinda!"
        >
          <VolunteerForm />
        </Section>
      ) : null}
    </div>
  );
};

export default HomePage;
