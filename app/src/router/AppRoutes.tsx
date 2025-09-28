import { Outlet, Route, Routes } from 'react-router-dom';
import SiteLayout from '@/components/layout/SiteLayout';
import RequireAdmin from '@/features/admin/components/RequireAdmin';
import HomePage from '@/pages/HomePage';
import AdoptionPage from '@/pages/AdoptionPage';
import DogDetailsPage from '@/pages/DogDetailsPage';
import DonationsPage from '@/pages/DonationsPage';
import StoriesPage from '@/pages/StoriesPage';
import PartnersPage from '@/pages/PartnersPage';
import VolunteerPage from '@/pages/VolunteerPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminFlagsPage from '@/pages/admin/AdminFlagsPage';
import AdminDogsPage from '@/pages/admin/AdminDogsPage';
import AdminPostsPage from '@/pages/admin/AdminPostsPage';
import AdminPartnersPage from '@/pages/admin/AdminPartnersPage';
import AdminLeadsPage from '@/pages/admin/AdminLeadsPage';
import AdminResultsPage from '@/pages/admin/AdminResultsPage';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import NotFoundPage from '@/pages/NotFoundPage';

const PublicLayout = () => (
  <SiteLayout>
    <Outlet />
  </SiteLayout>
);

const AdminLayout = () => (
  <RequireAdmin>
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  </RequireAdmin>
);

const AppRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/adocao" element={<AdoptionPage />} />
      <Route path="/adocao/:id" element={<DogDetailsPage />} />
      <Route path="/doacoes" element={<DonationsPage />} />
      <Route path="/historias" element={<StoriesPage />} />
      <Route path="/parceiros" element={<PartnersPage />} />
      <Route path="/voluntario" element={<VolunteerPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
    <Route element={<AdminLayout />}>
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/flags" element={<AdminFlagsPage />} />
      <Route path="/admin/caes" element={<AdminDogsPage />} />
      <Route path="/admin/posts" element={<AdminPostsPage />} />
      <Route path="/admin/parceiros" element={<AdminPartnersPage />} />
      <Route path="/admin/leads" element={<AdminLeadsPage />} />
      <Route path="/admin/resultados" element={<AdminResultsPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
