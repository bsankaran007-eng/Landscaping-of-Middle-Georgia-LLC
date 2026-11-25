/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { PORTFOLIO_PROJECTS } from './data/estateData';
import type { EstateService } from './data/estateData';
import { Header } from './components/Header';
import type { ScreenId } from './components/Header';
import { Footer } from './components/Footer';
import { OverviewScreen } from './components/OverviewScreen';
import { ServicesScreen } from './components/ServicesScreen';
import { PortfolioScreen } from './components/PortfolioScreen';
import { EstimateScreen } from './components/EstimateScreen';
import type { EstimateDraftConfig, SavedEstimateRecord } from './components/EstimateScreen';
import { ServiceInspectionModal } from './components/ServiceInspectionModal';
import { EmergencyDispatchModal } from './components/EmergencyDispatchModal';
import type { EmergencyTicketRecord } from './components/EmergencyDispatchModal';

const STORAGE_KEY_ESTIMATES = 'estate_verve_saved_estimates_v1';
const STORAGE_KEY_TICKETS = 'estate_verve_emergency_tickets_v1';

const DEFAULT_DRAFT: EstimateDraftConfig = {
  propertyTier: 'Residential Estate',
  squareFootage: 14000,
  turfType: 'Zeon Zoysia',
  frequency: 'Weekly Precision',
  selectedAddOns: ['turf-management', 'bed-shrub-architecture'],
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('overview');
  const [inspectedService, setInspectedService] = useState<EstateService | null>(null);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);

  const [estimateDraft, setEstimateDraft] = useState<EstimateDraftConfig>(DEFAULT_DRAFT);
  const [savedEstimates, setSavedEstimates] = useState<SavedEstimateRecord[]>(() =>
    loadFromStorage<SavedEstimateRecord[]>(STORAGE_KEY_ESTIMATES, [])
  );
  const [emergencyTickets, setEmergencyTickets] = useState<EmergencyTicketRecord[]>(() =>
    loadFromStorage<EmergencyTicketRecord[]>(STORAGE_KEY_TICKETS, [])
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY_ESTIMATES, JSON.stringify(savedEstimates));
    } catch {
      // Ignore storage quota errors in restricted sandboxes
    }
  }, [savedEstimates]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify(emergencyTickets));
    } catch {
      // Ignore storage quota errors in restricted sandboxes
    }
  }, [emergencyTickets]);

  const handleNavigate = (screen: ScreenId) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleAddServiceToEstimate = (service: EstateService) => {
    setEstimateDraft((prev) => {
      const nextAddOns = prev.selectedAddOns.includes(service.linkedAddOnId)
        ? prev.selectedAddOns
        : [...prev.selectedAddOns, service.linkedAddOnId];
      return {
        ...prev,
        propertyTier: service.recommendedTier,
        squareFootage: service.recommendedSqFt,
        selectedAddOns: nextAddOns,
        sourceLabel: service.title,
      };
    });
    setInspectedService(null);
    handleNavigate('estimate');
  };

  const handleRequestProjectScope = (projectId: string) => {
    const project = PORTFOLIO_PROJECTS.find((item) => item.id === projectId);
    if (!project) return;
    setEstimateDraft({
      propertyTier: project.recommendedTier,
      squareFootage: project.measurements.squareFootage,
      turfType: project.measurements.turfType,
      frequency: project.measurements.frequency,
      selectedAddOns: [...project.linkedAddOns],
      sourceLabel: `${project.title} (${project.location})`,
    });
    handleNavigate('estimate');
  };

  const handleSaveEstimate = (record: SavedEstimateRecord) => {
    setSavedEstimates((prev) => [record, ...prev]);
  };

  const handleDeleteEstimate = (referenceId: string) => {
    setSavedEstimates((prev) => prev.filter((item) => item.referenceId !== referenceId));
  };

  const handleSubmitEmergencyTicket = (ticket: EmergencyTicketRecord) => {
    setEmergencyTickets((prev) => [ticket, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8] text-[#191C1B]">
      <Header activeScreen={activeScreen} onNavigate={handleNavigate} />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        {activeScreen === 'overview' && (
          <OverviewScreen
            onNavigate={handleNavigate}
            onInspectService={setInspectedService}
            onOpenEmergency={() => setEmergencyModalOpen(true)}
            onRequestProjectScope={handleRequestProjectScope}
          />
        )}

        {activeScreen === 'services' && (
          <ServicesScreen
            onInspectService={setInspectedService}
            onNavigate={handleNavigate}
            onOpenEmergency={() => setEmergencyModalOpen(true)}
          />
        )}

        {activeScreen === 'portfolio' && (
          <PortfolioScreen onRequestProjectScope={handleRequestProjectScope} />
        )}

        {activeScreen === 'estimate' && (
          <EstimateScreen
            draftConfig={estimateDraft}
            onUpdateDraft={setEstimateDraft}
            savedEstimates={savedEstimates}
            onSaveEstimate={handleSaveEstimate}
            onDeleteEstimate={handleDeleteEstimate}
          />
        )}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenEmergency={() => setEmergencyModalOpen(true)}
      />

      <ServiceInspectionModal
        service={inspectedService}
        onClose={() => setInspectedService(null)}
        onAddToEstimate={handleAddServiceToEstimate}
      />

      <EmergencyDispatchModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        onSubmitTicket={handleSubmitEmergencyTicket}
        recentTickets={emergencyTickets}
      />
    </div>
  );
}
