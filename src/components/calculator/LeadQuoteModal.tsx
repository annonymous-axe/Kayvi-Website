"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, User, Phone, MapPin, Loader2, MessageSquare, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { submitLead } from '@/lib/leads';

interface LeadQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  monthlyBill: number;
  systemSize: string;
  monthlySavings: number;
  twentyYearSavings: number;
  payback: string;
  roofType: string;
  exposure: string;
  locale: string;
}

export default function LeadQuoteModal({
  isOpen,
  onClose,
  monthlyBill,
  systemSize,
  monthlySavings,
  twentyYearSavings,
  payback,
  roofType,
  exposure,
  locale
}: LeadQuoteModalProps) {
  const t = useTranslations('CalculatorPage.modal');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Surat');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [validationError, setValidationError] = useState('');

  const resetForm = () => {
    setName('');
    setPhone('');
    setCity('Surat');
    setIsSubmitted(false);
    setValidationError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const cleanName = name.trim();
    const cleanPhone = phone.replace(/[^0-9]/g, '');

    if (cleanName.length < 2) {
      setValidationError(locale === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें।' : locale === 'gu' ? 'કૃપા કરીને તમારું પૂરું નામ દાખલ કરો.' : 'Please enter your full name.');
      return;
    }

    if (cleanPhone.length < 10) {
      setValidationError(locale === 'hi' ? 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।' : locale === 'gu' ? 'કૃપા કરીને 10 અંકનો માન્ય મોબાઇલ નંબર દાખલ કરો.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitLead({
        name: cleanName,
        phone: cleanPhone,
        city: city.trim() || 'Surat',
        monthlyBill,
        systemSize,
        monthlySavings,
        twentyYearSavings,
        payback,
        roofType,
        exposure,
        locale
      });

      setWhatsappUrl(result.whatsappUrl);
      setIsSubmitted(true);
    } catch {
      // In case of unexpected client runtime issues
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800 p-6 sm:p-8 z-10 my-8 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div>
                {/* Header Badge & Title */}
                <div className="mb-6 text-center sm:text-left">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 mb-3">
                    <Zap className="w-3.5 h-3.5 text-emerald-600" />
                    {t('badge')}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                    {t('title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                    {t('subtitle')}
                  </p>
                </div>

                {/* Calculation Summary Strip */}
                <div className="bg-gray-50 dark:bg-zinc-800/60 rounded-2xl p-3.5 mb-6 border border-gray-200/60 dark:border-zinc-700/60 grid grid-cols-3 gap-2 text-center">
                  <div className="p-1">
                    <span className="block text-[11px] text-muted-foreground font-medium uppercase tracking-wider">System</span>
                    <span className="text-sm sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400">{systemSize}</span>
                  </div>
                  <div className="p-1 border-x border-gray-200 dark:border-zinc-700">
                    <span className="block text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Bill</span>
                    <span className="text-sm sm:text-base font-extrabold text-foreground">₹{monthlyBill.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="p-1">
                    <span className="block text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Subsidy</span>
                    <span className="text-sm sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400">₹78,000</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="lead-name" className="text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      {t('nameLabel')}
                    </Label>
                    <Input
                      id="lead-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('namePlaceholder')}
                      className="h-11 bg-gray-50/70 dark:bg-zinc-800/50 rounded-xl"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="lead-phone" className="text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      {t('phoneLabel')}
                    </Label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 flex items-center gap-1 text-sm font-bold text-muted-foreground pointer-events-none">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <Input
                        id="lead-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                        placeholder={t('phonePlaceholder')}
                        className="h-11 pl-16 bg-gray-50/70 dark:bg-zinc-800/50 rounded-xl font-medium tracking-wide"
                      />
                    </div>
                  </div>

                  {/* City Input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="lead-city" className="text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      {t('cityLabel')}
                    </Label>
                    <Input
                      id="lead-city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={t('cityPlaceholder')}
                      className="h-11 bg-gray-50/70 dark:bg-zinc-800/50 rounded-xl"
                    />
                  </div>

                  {/* Validation Error Alert */}
                  {validationError && (
                    <p className="text-xs text-red-500 font-semibold bg-red-50 dark:bg-red-950/40 p-2.5 rounded-lg border border-red-200 dark:border-red-800/50">
                      {validationError}
                    </p>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition-all mt-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t('submitting')}
                      </span>
                    ) : (
                      t('submit')
                    )}
                  </Button>

                  {/* Privacy / Assurance Notice */}
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{t('privacy')}</span>
                  </div>
                </form>
              </div>
            ) : (
              /* Success View */
              <div className="text-center py-4 space-y-5">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/80 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-foreground tracking-tight">
                    {t('successTitle')}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    {t('successMessage')}
                  </p>
                </div>

                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50 text-left space-y-1.5 text-xs text-emerald-900 dark:text-emerald-200">
                  <p className="font-semibold">📋 Lead Reference Sent:</p>
                  <p>• Customer: <strong>{name}</strong> (+91 {phone})</p>
                  <p>• Estimated System: <strong>{systemSize}</strong> (₹{monthlyBill}/mo bill)</p>
                  <p>• Location: <strong>{city || 'Surat'}</strong></p>
                </div>

                {/* Direct WhatsApp CTA Button */}
                <div className="space-y-2.5 pt-2">
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 w-full h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <MessageSquare className="w-5 h-5 fill-current" />
                      {t('whatsappButton')}
                    </a>
                  )}

                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="w-full h-11 rounded-xl font-semibold"
                  >
                    {t('closeButton')}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
