"use client";

import { useState, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sun, TrendingUp, Sparkles, Clock, FileText } from 'lucide-react';
import Link from 'next/link';
import LeadQuoteModal from '@/components/calculator/LeadQuoteModal';

export default function CalculatorClient({ locale }: { locale: string }) {
  const t = useTranslations('CalculatorPage');
  
  // State
  const [bill, setBill] = useState([5000]);
  const [exposure, setExposure] = useState('high');
  const [roofType, setRoofType] = useState('sloped');
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mock Heuristic Calculations (To be replaced by FastAPI backend logic later)
  const results = useMemo(() => {
    const monthlyBill = Array.isArray(bill) ? bill[0] : bill;
    // Baseline: ₹5000 bill ~ 5kW system. 
    // Modifier based on exposure: High = 1, Medium = 1.2, Low = 1.5
    const exposureModifier = exposure === 'high' ? 1 : exposure === 'medium' ? 1.2 : 1.5;
    
    const systemSize = (monthlyBill / 1000) * exposureModifier; 
    const monthlySavings = monthlyBill * 0.85; // Assume 85% offset
    const twentyYearSavings = monthlySavings * 12 * 20;
    
    // Estimated cost of system (₹60,000 per kW)
    const systemCost = systemSize * 60000; 
    const payback = systemCost / (monthlySavings * 12);

    // Chart Data (20 years projection)
    const chartData = [];
    let currentCostWithout = 0;
    let currentCostWith = systemCost; // Initial investment

    for (let year = 1; year <= 20; year++) {
      // 3% utility inflation
      const annualWithout = (monthlyBill * 12) * Math.pow(1.03, year);
      currentCostWithout += annualWithout;

      // With solar: mostly just the remaining 15% bill with inflation
      const annualWith = ((monthlyBill - monthlySavings) * 12) * Math.pow(1.03, year);
      currentCostWith += annualWith;

      chartData.push({
        year: `Year ${year}`,
        withoutSolar: Math.round(currentCostWithout),
        withSolar: Math.round(currentCostWith)
      });
    }

    return {
      systemSize: systemSize.toFixed(1),
      monthlySavings: Math.round(monthlySavings),
      twentyYearSavings: Math.round(twentyYearSavings),
      payback: payback.toFixed(1),
      chartData
    };
  }, [bill, exposure, roofType]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col min-h-screen pt-16 bg-gray-50 dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-12 sm:py-16 md:py-20 px-4 text-center">
        <motion.div className="max-w-3xl mx-auto" {...fadeIn}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </motion.div>
      </section>

      {/* Main Interactive Section */}
      <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 max-w-7xl">
          
          {/* Input Panel */}
          <motion.div 
            className="lg:col-span-4 bg-white dark:bg-zinc-900 p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 dark:border-zinc-800 space-y-6 sm:space-y-8 min-w-0" 
            {...fadeIn} 
            transition={{ delay: 0.1 }}
          >
            {/* Bill Slider */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm sm:text-base font-semibold">
                  {t('form.billLabel')}
                </Label>
                <span className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50">
                  ₹{(Array.isArray(bill) ? bill[0] : bill).toLocaleString('en-IN')}
                </span>
              </div>
              <Slider 
                value={Array.isArray(bill) ? bill : [bill]} 
                onValueChange={(val: any) => setBill(Array.isArray(val) ? val : [val])} 
                max={20000} 
                min={1000} 
                step={500} 
                className="py-3 sm:py-4 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₹1,000</span>
                <span>₹20,000+</span>
              </div>
            </div>

            {/* Sun Exposure */}
            <div className="space-y-3 sm:space-y-4">
              <Label className="text-sm sm:text-base font-semibold">{t('form.exposureLabel')}</Label>
              <RadioGroup value={exposure} onValueChange={setExposure} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/60 transition-colors">
                  <RadioGroupItem value="high" id="r-high" />
                  <Label htmlFor="r-high" className="cursor-pointer text-sm font-medium">{t('form.exposure.high')}</Label>
                </div>
                <div className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/60 transition-colors">
                  <RadioGroupItem value="medium" id="r-medium" />
                  <Label htmlFor="r-medium" className="cursor-pointer text-sm font-medium">{t('form.exposure.medium')}</Label>
                </div>
                <div className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/60 transition-colors">
                  <RadioGroupItem value="low" id="r-low" />
                  <Label htmlFor="r-low" className="cursor-pointer text-sm font-medium">{t('form.exposure.low')}</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Roof Type */}
            <div className="space-y-3 sm:space-y-4">
              <Label className="text-sm sm:text-base font-semibold">{t('form.roofTypeLabel')}</Label>
              <Select value={roofType} onValueChange={(val) => val && setRoofType(val)}>
                <SelectTrigger className="w-full h-11 bg-gray-50/50 dark:bg-zinc-800/50 rounded-xl">
                  <SelectValue placeholder="Select roof type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sloped">{t('form.roofType.sloped')}</SelectItem>
                  <SelectItem value="flat">{t('form.roofType.flat')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* CTA Button */}
            <Button 
              type="button"
              size="lg" 
              onClick={() => setIsModalOpen(true)}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              {t('results.cta')}
            </Button>

          </motion.div>

          {/* Results Dashboard */}
          <motion.div 
            className="lg:col-span-8 space-y-6 sm:space-y-8 min-w-0" 
            {...fadeIn} 
            transition={{ delay: 0.2 }}
          >
            {/* Stat Cards - Responsive Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
              
              {/* Card 1: System Size */}
              <div className="bg-white dark:bg-zinc-900 p-3.5 sm:p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 text-center flex flex-col justify-between overflow-hidden min-w-0 transition-all hover:shadow-md">
                <div className="flex items-center justify-center gap-1.5 mb-1.5 text-emerald-600 dark:text-emerald-400">
                  <Sun className="w-4 h-4 shrink-0" />
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {t('results.systemSize')}
                  </p>
                </div>
                <p 
                  className="text-lg sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight leading-tight truncate px-1"
                  title={`${results.systemSize} kW`}
                >
                  {results.systemSize} kW
                </p>
              </div>

              {/* Card 2: Monthly Savings */}
              <div className="bg-white dark:bg-zinc-900 p-3.5 sm:p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 text-center flex flex-col justify-between overflow-hidden min-w-0 transition-all hover:shadow-md">
                <div className="flex items-center justify-center gap-1.5 mb-1.5 text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {t('results.monthlySavings')}
                  </p>
                </div>
                <p 
                  className="text-lg sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight leading-tight truncate px-1"
                  title={`₹${results.monthlySavings.toLocaleString('en-IN')}`}
                >
                  ₹{results.monthlySavings.toLocaleString('en-IN')}
                </p>
              </div>

              {/* Card 3: 20-Year Savings */}
              <div className="bg-white dark:bg-zinc-900 p-3.5 sm:p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 text-center flex flex-col justify-between overflow-hidden min-w-0 transition-all hover:shadow-md">
                <div className="flex items-center justify-center gap-1.5 mb-1.5 text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {t('results.twentyYearSavings')}
                  </p>
                </div>
                <p 
                  className="text-lg sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight leading-tight truncate px-1"
                  title={`₹${results.twentyYearSavings.toLocaleString('en-IN')}`}
                >
                  ₹{results.twentyYearSavings.toLocaleString('en-IN')}
                </p>
              </div>

              {/* Card 4: Payback Period */}
              <div className="bg-white dark:bg-zinc-900 p-3.5 sm:p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 text-center flex flex-col justify-between overflow-hidden min-w-0 transition-all hover:shadow-md">
                <div className="flex items-center justify-center gap-1.5 mb-1.5 text-emerald-600 dark:text-emerald-400">
                  <Clock className="w-4 h-4 shrink-0" />
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {t('results.payback')}
                  </p>
                </div>
                <p 
                  className="text-lg sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight leading-tight truncate px-1"
                  title={`${results.payback} ${t('results.years')}`}
                >
                  {results.payback} {t('results.years')}
                </p>
              </div>

            </div>

            {/* Projection Chart */}
            <div className="bg-white dark:bg-zinc-900 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 overflow-hidden min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold">{t('results.chartTitle')}</h3>
                <span className="text-xs text-muted-foreground">Cumulative Cost Comparison</span>
              </div>

              <div className="h-[280px] sm:h-[350px] md:h-[400px] w-full min-w-0">
                {isMounted ? (
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={50}>
                    <AreaChart data={results.chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorWithout" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorWith" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.2} />
                      <XAxis 
                        dataKey="year" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 11, fill: '#71717a' }} 
                        dy={10} 
                        minTickGap={20}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        width={46}
                        tick={{ fontSize: 11, fill: '#71717a' }} 
                        tickFormatter={(value: number) => `₹${(value/100000).toFixed(1)}L`} 
                      />
                      <Tooltip 
                        formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, '']}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '13px' }} />
                      <Area type="monotone" name={t('results.chartWithout')} dataKey="withoutSolar" stroke="#ef4444" fillOpacity={1} fill="url(#colorWithout)" strokeWidth={3} />
                      <Area type="monotone" name={t('results.chartWith')} dataKey="withSolar" stroke="#10b981" fillOpacity={1} fill="url(#colorWith)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-50/50 dark:bg-zinc-800/20 rounded-xl">
                    <span className="text-xs text-muted-foreground animate-pulse">Loading projection chart...</span>
                  </div>
                )}
              </div>
            </div>

          </motion.div>

        </div>
      </section>

      {/* Lead Generation Modal */}
      <LeadQuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        monthlyBill={Array.isArray(bill) ? bill[0] : bill}
        systemSize={`${results.systemSize} kW`}
        monthlySavings={results.monthlySavings}
        twentyYearSavings={results.twentyYearSavings}
        payback={`${results.payback} ${t('results.years')}`}
        roofType={roofType}
        exposure={exposure}
        locale={locale}
      />
    </div>
  );
}
