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
  const { data: dogs, isLoading: isLoadingDogs } = useDogs('dispon�vel');
  const { data: posts, isLoading: isLoadingPosts } = usePosts();
  const { data: partners } = usePartners();
  const { data: results } = useResults();

  return (
    <div className="space-y-12">
      <HeroSection
        title="Sua ajuda salva vidas de c�es todos os dias"
        subtitle="Acolhemos, tratamos e encontramos lares amorosos para c�es resgatados. Fa�a parte dessa rede de cuidado."
        cta={{ label: 'Ver c�es para ado��o', href: '/adocao' }}
        secondaryCta={{ label: 'Doe agora', href: '#doacoes' }}
      />

      <Section title="Nosso impacto recente">
        <ResultsHighlight results={results} />
      </Section>

      {flags.adoption ? (
        <Section
          id="adocao"
          title="C�es aguardando um lar"
          description="Conhe�a os peludos dispon�veis e preencha o formul�rio para dar um novo come�o."
        >
          <AdoptionList dogs={dogs} isLoading={isLoadingDogs} />
        </Section>
      ) : null}

      {flags.donations ? (
        <Section id="doacoes" title="Apoie com doa��es" description="Chave PIX e itens que mant�m o abrigo funcionando.">
          <DonationsSection />
        </Section>
      ) : null}

      {flags.stories ? (
        <Section title="Hist�rias que inspiram" description="Vit�rias que s� acontecem gra�as a voc�.">
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
          title="Seja volunt�rio ou lar tempor�rio"
          description="Informe como voc� pode ajudar. Toda habilidade � bem-vinda!"
        >
          <VolunteerForm />
        </Section>
      ) : null}
    </div>
  );
};

export default HomePage;
