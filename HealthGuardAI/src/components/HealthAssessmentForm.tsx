import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { HealthMetrics, PatientDetails, ValidationError, VALIDATION_RANGES } from '@/types/health';
import { validateHealthMetrics } from '@/utils/riskAnalysis';
import { Activity, Heart, Droplets, Cigarette, Wine, Dumbbell, Users, Brain, ArrowRight, AlertCircle } from 'lucide-react';

interface HealthAssessmentFormProps {
  patient: PatientDetails;
  onSubmit: (data: HealthMetrics) => void;
  onBack: () => void;
}

export function HealthAssessmentForm({ patient, onSubmit, onBack }: HealthAssessmentFormProps) {
  const [formData, setFormData] = useState<Partial<HealthMetrics>>({
    systolicBP: undefined,
    diastolicBP: undefined,
    bloodSugar: undefined,
    heartRate: undefined,
    smokingStatus: false,
    alcoholConsumption: false,
    physicalActivity: undefined,
    familyHistory: false,
    stressLevel: undefined,
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (Object.values(touched).some(Boolean)) {
      setErrors(validateHealthMetrics(formData));
    }
  }, [formData, touched]);

  const getError = (field: string) => {
    return touched[field] ? errors.find(e => e.field === field)?.message : undefined;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateHealthMetrics(formData);
    setErrors(validationErrors);
    setTouched({
      systolicBP: true,
      diastolicBP: true,
      bloodSugar: true,
      heartRate: true,
      physicalActivity: true,
      stressLevel: true,
    });

    if (validationErrors.length === 0) {
      onSubmit(formData as HealthMetrics);
    }
  };

  const isValid = errors.length === 0 && 
    formData.systolicBP && 
    formData.diastolicBP && 
    formData.bloodSugar && 
    formData.heartRate && 
    formData.physicalActivity && 
    formData.stressLevel;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-screen flex items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-soft mb-4">
            <Activity className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Health Assessment
          </h1>
          <p className="text-muted-foreground">
            Hi {patient.fullName.split(' ')[0]}, please enter your health metrics
          </p>
        </motion.div>

        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl shadow-card border border-border/50 p-6 md:p-8 space-y-6"
        >
          {/* Blood Pressure */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Blood Pressure
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="systolicBP">Systolic (mmHg) *</Label>
                <Input
                  id="systolicBP"
                  type="number"
                  placeholder={`${VALIDATION_RANGES.systolicBP.min}-${VALIDATION_RANGES.systolicBP.max}`}
                  value={formData.systolicBP || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, systolicBP: Number(e.target.value) || undefined }))}
                  onBlur={() => setTouched(prev => ({ ...prev, systolicBP: true }))}
                  className={getError('systolicBP') ? 'border-destructive' : ''}
                />
                {getError('systolicBP') && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {getError('systolicBP')}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="diastolicBP">Diastolic (mmHg) *</Label>
                <Input
                  id="diastolicBP"
                  type="number"
                  placeholder={`${VALIDATION_RANGES.diastolicBP.min}-${VALIDATION_RANGES.diastolicBP.max}`}
                  value={formData.diastolicBP || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, diastolicBP: Number(e.target.value) || undefined }))}
                  onBlur={() => setTouched(prev => ({ ...prev, diastolicBP: true }))}
                  className={getError('diastolicBP') ? 'border-destructive' : ''}
                />
                {getError('diastolicBP') && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {getError('diastolicBP')}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Blood Sugar and Heart Rate */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bloodSugar" className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-primary" />
                Blood Sugar (mg/dL) *
              </Label>
              <Input
                id="bloodSugar"
                type="number"
                placeholder={`${VALIDATION_RANGES.bloodSugar.min}-${VALIDATION_RANGES.bloodSugar.max}`}
                value={formData.bloodSugar || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, bloodSugar: Number(e.target.value) || undefined }))}
                onBlur={() => setTouched(prev => ({ ...prev, bloodSugar: true }))}
                className={getError('bloodSugar') ? 'border-destructive' : ''}
              />
              {getError('bloodSugar') && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {getError('bloodSugar')}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="heartRate" className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                Heart Rate (bpm) *
              </Label>
              <Input
                id="heartRate"
                type="number"
                placeholder={`${VALIDATION_RANGES.heartRate.min}-${VALIDATION_RANGES.heartRate.max}`}
                value={formData.heartRate || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, heartRate: Number(e.target.value) || undefined }))}
                onBlur={() => setTouched(prev => ({ ...prev, heartRate: true }))}
                className={getError('heartRate') ? 'border-destructive' : ''}
              />
              {getError('heartRate') && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {getError('heartRate')}
                </p>
              )}
            </div>
          </div>

          {/* Lifestyle Toggles */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">
              Lifestyle Factors
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center gap-2">
                  <Cigarette className="w-5 h-5 text-muted-foreground" />
                  <Label htmlFor="smoking" className="cursor-pointer">Smoking</Label>
                </div>
                <Switch
                  id="smoking"
                  checked={formData.smokingStatus}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, smokingStatus: checked }))}
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center gap-2">
                  <Wine className="w-5 h-5 text-muted-foreground" />
                  <Label htmlFor="alcohol" className="cursor-pointer">Alcohol</Label>
                </div>
                <Switch
                  id="alcohol"
                  checked={formData.alcoholConsumption}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, alcoholConsumption: checked }))}
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <Label htmlFor="family" className="cursor-pointer">Family History</Label>
                </div>
                <Switch
                  id="family"
                  checked={formData.familyHistory}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, familyHistory: checked }))}
                />
              </div>
            </div>
          </div>

          {/* Physical Activity */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-foreground font-medium">
              <Dumbbell className="w-5 h-5 text-primary" />
              Physical Activity Level *
            </Label>
            <div className="flex gap-3">
              {(['low', 'moderate', 'high'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, physicalActivity: level }));
                    setTouched(prev => ({ ...prev, physicalActivity: true }));
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                    formData.physicalActivity === level
                      ? 'gradient-primary text-primary-foreground shadow-soft'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
            {getError('physicalActivity') && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {getError('physicalActivity')}
              </p>
            )}
          </div>

          {/* Stress Level */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-foreground font-medium">
              <Brain className="w-5 h-5 text-primary" />
              Stress Level *
            </Label>
            <div className="flex gap-3">
              {(['low', 'medium', 'high'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, stressLevel: level }));
                    setTouched(prev => ({ ...prev, stressLevel: true }));
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                    formData.stressLevel === level
                      ? level === 'low' ? 'bg-success text-success-foreground shadow-soft'
                        : level === 'medium' ? 'bg-warning text-warning-foreground shadow-soft'
                        : 'bg-destructive text-destructive-foreground shadow-soft'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
            {getError('stressLevel') && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {getError('stressLevel')}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="hero"
              disabled={!isValid}
              className="flex-1 group"
            >
              Analyze Risk
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
}
