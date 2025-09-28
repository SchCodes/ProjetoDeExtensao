import type { PropsWithChildren } from 'react';
import Header from './Header';
import Footer from './Footer';

const SiteLayout = ({ children }: PropsWithChildren): JSX.Element => (
  <div className="flex min-h-screen flex-col bg-slate-50">
    <Header />
    <main className="flex-1">
      <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-10">{children}</div>
    </main>
    <Footer />
  </div>
);

export default SiteLayout;
