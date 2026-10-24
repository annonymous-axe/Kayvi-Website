"use client";

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CalculatorClient({ locale }: { locale: string }) {
  const t = useTranslations('CalculatorPage');
  
  // State
  const [bill, setBill] = useState([5000]);
  const [exposure, setExposure] = useState('high');
  const [roofType, setRoofType] = useState('sloped');

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
      <section className="bg-emerald-600 text-white py-24 px-4 text-center">
        <motion.div className="max-w-3xl mx-auto" {...fadeIn}>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{t('hero.title')}</h1>
          <p className="text-xl text-emerald-100">{t('hero.subtitle')}</p>
        </motion.div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl">
          
          {/* Input Panel */}
          <motion.div className="lg:col-span-4 bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 space-y-8" {...fadeIn} transition={{ delay: 0.1 }}>
            
            <div className="space-y-4">
              <Label className="text-base font-semibold">
                {t('form.billLabel')}: ₹{(Array.isArray(bill) ? bill[0] : bill).toLocaleString('en-IN')}
              </Label>
              <Slider 
                value={Array.isArray(bill) ? bill : [bill]} 
                onValueChange={(val: any) => setBill(Array.isArray(val) ? val : [val])} 
                max={20000} 
                min={1000} 
                step={500} 
                className="py-4 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₹1,000</span>
                <span>₹20,000+</span>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">{t('form.exposureLabel')}</Label>
              <RadioGroup value={exposure} onValueChange={setExposure} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="r-high" />
                  <Label htmlFor="r-high">{t('form.exposure.high')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="r-medium" />
                  <Label htmlFor="r-medium">{t('form.exposure.medium')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="r-low" />
                  <Label htmlFor="r-low">{t('form.exposure.low')}</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">{t('form.roofTypeLabel')}</Label>
              <Select value={roofType} onValueChange={(val) => val && setRoofType(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select roof type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sloped">{t('form.roofType.sloped')}</SelectItem>
                  <SelectItem value="flat">{t('form.roofType.flat')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              render={<Link href={`/${locale}/contact`} />}
              nativeButton={false}
            >
              {t('results.cta')}
            </Button>

          </motion.div>

          {/* Results Dashboard */}
          <motion.div className="lg:col-span-8 space-y-8" {...fadeIn} transition={{ delay: 0.2 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 text-center">
                <p className="text-sm text-muted-foreground mb-2">{t('results.systemSize')}</p>
                <p className="text-3xl font-bold text-emerald-600">{results.systemSize} kW</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 text-center">
                <p className="text-sm text-muted-foreground mb-2">{t('results.monthlySavings')}</p>
                <p className="text-3xl font-bold text-emerald-600">₹{results.monthlySavings.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 text-center">
                <p className="text-sm text-muted-foreground mb-2">{t('results.twentyYearSavings')}</p>
                <p className="text-3xl font-bold text-emerald-600">₹{results.twentyYearSavings.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 text-center">
                <p className="text-sm text-muted-foreground mb-2">{t('results.payback')}</p>
                <p className="text-3xl font-bold text-emerald-600">{results.payback} {t('results.years')}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800">
              <h3 className="text-xl font-bold mb-6">{t('results.chartTitle')}</h3>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value: number) => `₹${(value/100000).toFixed(1)}L`} tick={{ fontSize: 12, fill: '#71717a' }} />
                    <Tooltip 
                      formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, '']}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Area type="monotone" name={t('results.chartWithout')} dataKey="withoutSolar" stroke="#ef4444" fillOpacity={1} fill="url(#colorWithout)" strokeWidth={3} />
                    <Area type="monotone" name={t('results.chartWith')} dataKey="withSolar" stroke="#10b981" fillOpacity={1} fill="url(#colorWith)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
