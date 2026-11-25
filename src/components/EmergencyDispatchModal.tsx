import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { AlertTriangle, CheckCircle2, PhoneCall, X } from 'lucide-react';
import type { EmergencyDispatchForm } from '../utils/estimateCalculator';
import { validateEmergencyForm } from '../utils/estimateCalculator';

export interface EmergencyTicketRecord extends EmergencyDispatchForm {
  ticketId: string;
  createdAt: string;
  etaWindow: string;
}

interface EmergencyDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitTicket: (ticket: EmergencyTicketRecord) => void;
  recentTickets: EmergencyTicketRecord[];
}

const HAZARD_OPTIONS: EmergencyDispatchForm['hazardType'][] = [
  'Fallen Tree on Structure',
  'Blocked Driveway / Access',
  'Hanging Storm Limb',
  'Root Heave / Leaning Pine',
];

const INITIAL_FORM: EmergencyDispatchForm = {
  callerName: '',
  phone: '',
  propertyAddress: '',
  hazardType: 'Fallen Tree on Structure',
  details: '',
};

export function EmergencyDispatchModal({
  isOpen,
  onClose,
  onSubmitTicket,
  recentTickets,
}: EmergencyDispatchModalProps) {
  const [form, setForm] = useState<EmergencyDispatchForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof EmergencyDispatchForm, string>>>({});
  const [confirmedTicket, setConfirmedTicket] = useState<EmergencyTicketRecord | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = validateEmergencyForm(form);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    const ticket: EmergencyTicketRecord = {
      ...form,
      ticketId: `EV-STORM-${String(1000 + recentTickets.length + 1)}`,
      createdAt: new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }),
      etaWindow: form.hazardType === 'Fallen Tree on Structure' ? '60–90 minutes' : '2–3 hours',
    };

    onSubmitTicket(ticket);
    setConfirmedTicket(ticket);
    setErrors({});
    setForm(INITIAL_FORM);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/40 backdrop-blur-[8px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-[24px] estate-modal-shadow border border-[#0F172A]/10 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#006E2F]">
              24/7 MIDDLE GEORGIA RAPID RESPONSE
            </p>
            <h2
              id="emergency-modal-title"
              className="mt-1 text-[24px] font-bold leading-[32px] tracking-[-0.01em] text-[#0F172A]"
            >
              Emergency Tree &amp; Storm Dispatch
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close emergency tree service dialog"
            className="w-10 h-10 rounded-full bg-[#F2F4F2] text-[#0F172A] hover:bg-[#E6E9E7] flex items-center justify-center shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Direct Hotline Strip */}
        <div className="mt-5 p-4 rounded-[12px] bg-[#0F172A] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[8px] bg-[#22C55E] text-[#0F172A] flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[#96D5A3]">Direct Arborist Dispatch Line</p>
              <p className="text-[18px] font-bold tabular-nums">(478) 555-0199</p>
            </div>
          </div>
          <span className="text-[12px] text-[#EFF1EF]/80">
            Serving Macon, Warner Robins &amp; Lake Oconee
          </span>
        </div>

        {confirmedTicket ? (
          <div className="mt-6 space-y-5" data-testid="emergency-ticket-confirmed">
            <div className="p-5 rounded-[16px] bg-[#F0FDF4] border border-[#DCFCE7] flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#14532D] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#14532D]">
                  DISPATCH LOGGED · {confirmedTicket.ticketId}
                </p>
                <h3 className="mt-1 text-[18px] font-bold text-[#0F172A]">
                  Arborist Crew Notified
                </h3>
                <p className="mt-1 text-[14px] leading-[20px] text-[#404941]">
                  Our on-call crew lead will call{' '}
                  <span className="font-semibold text-[#0F172A] tabular-nums">{confirmedTicket.phone}</span>{' '}
                  shortly to confirm site access at {confirmedTicket.propertyAddress}.
                </p>
              </div>
            </div>

            <dl className="space-y-2">
              <div className="flex items-center justify-between px-4 py-3 rounded-[8px] bg-[#F1F5F9]">
                <dt className="text-[13px] font-medium text-[#404941]">Hazard Classification</dt>
                <dd className="text-[14px] font-bold text-[#14532D]">{confirmedTicket.hazardType}</dd>
              </div>
              <div className="flex items-center justify-between px-4 py-3 rounded-[8px] bg-[#F1F5F9]">
                <dt className="text-[13px] font-medium text-[#404941]">Target Response Window</dt>
                <dd className="text-[14px] font-bold text-[#14532D] tabular-nums">{confirmedTicket.etaWindow}</dd>
              </div>
            </dl>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmedTicket(null)}
                className="h-11 px-5 rounded-[8px] border border-[#CBD5E1] bg-white text-[#0F172A] text-[14px] font-semibold hover:border-[#14532D] cursor-pointer"
              >
                Log Another Location
              </button>
              <button
                type="button"
                onClick={onClose}
                className="estate-btn-primary h-11 px-6 rounded-[8px] text-[14px] font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            <fieldset>
              <legend className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#404941]">
                Select Hazard Type
              </legend>
              <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {HAZARD_OPTIONS.map((option) => {
                  const isSelected = form.hazardType === option;
                  return (
                    <label
                      key={option}
                      className={`flex items-center gap-3 p-3 rounded-[8px] border cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#F0FDF4] border-[#14532D]'
                          : 'bg-white border-[#CBD5E1] hover:border-[#14532D]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="hazardType"
                        value={option}
                        checked={isSelected}
                        onChange={() => setForm((prev) => ({ ...prev, hazardType: option }))}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-[#14532D] border-[#14532D]'
                            : 'bg-white border-[#94A3B8]'
                        }`}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </span>
                      <span className="text-[13px] font-semibold text-[#0F172A]">{option}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="emergency-name"
                  className="block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#64748B] mb-1.5"
                >
                  Contact Name
                </label>
                <input
                  id="emergency-name"
                  type="text"
                  value={form.callerName}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, callerName: e.target.value }));
                    if (errors.callerName) setErrors((prev) => ({ ...prev, callerName: undefined }));
                  }}
                  placeholder="Jordan Ellis"
                  className={`estate-input w-full px-3.5 text-[15px] ${errors.callerName ? 'estate-input-error' : ''}`}
                />
                {errors.callerName && (
                  <p role="alert" className="mt-1.5 text-[12px] font-medium text-[#BA1A1A] flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.callerName}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="emergency-phone"
                  className="block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#64748B] mb-1.5"
                >
                  Mobile Phone
                </label>
                <input
                  id="emergency-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, phone: e.target.value }));
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  placeholder="(478) 555-0142"
                  className={`estate-input w-full px-3.5 text-[15px] ${errors.phone ? 'estate-input-error' : ''}`}
                />
                {errors.phone && (
                  <p role="alert" className="mt-1.5 text-[12px] font-medium text-[#BA1A1A] flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="emergency-address"
                className="block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#64748B] mb-1.5"
              >
                Property Address
              </label>
              <input
                id="emergency-address"
                type="text"
                value={form.propertyAddress}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, propertyAddress: e.target.value }));
                  if (errors.propertyAddress) {
                    setErrors((prev) => ({ ...prev, propertyAddress: undefined }));
                  }
                }}
                placeholder="412 Vineville Ave, Macon, GA 31204"
                className={`estate-input w-full px-3.5 text-[15px] ${errors.propertyAddress ? 'estate-input-error' : ''}`}
              />
              {errors.propertyAddress && (
                <p role="alert" className="mt-1.5 text-[12px] font-medium text-[#BA1A1A] flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.propertyAddress}</span>
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="emergency-details"
                className="block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#64748B] mb-1.5"
              >
                Gate Access or Power Line Notes (Optional)
              </label>
              <textarea
                id="emergency-details"
                rows={2}
                value={form.details}
                onChange={(e) => setForm((prev) => ({ ...prev, details: e.target.value }))}
                placeholder="Note downed utility lines, gate codes, or driveway width."
                className="w-full px-3.5 py-2.5 bg-white border border-[#CBD5E1] text-[#0F172A] rounded-[8px] text-[15px] focus:outline-none focus:border-[#14532D] focus:ring-2 focus:ring-[#14532D]"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-12 px-5 rounded-[8px] border border-[#CBD5E1] bg-white text-[#0F172A] text-[14px] font-semibold hover:border-[#14532D] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-12 px-6 rounded-[8px] bg-[#22C55E] hover:bg-[#16A34A] text-[#0F172A] text-[14px] font-bold tracking-[0.02em] transition-colors whitespace-nowrap cursor-pointer"
              >
                Dispatch Emergency Crew
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
