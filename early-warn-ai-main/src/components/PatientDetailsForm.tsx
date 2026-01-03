import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PatientDetails, ValidationError, VALIDATION_RANGES } from '@/types/health';
import { validatePatientDetails, calculateBMI } from '@/utils/riskAnalysis';
import { User, Ruler, Weight, MapPin, ArrowRight, AlertCircle } from 'lucide-react';

interface PatientDetailsFormProps {
  onSubmit: (data: PatientDetails) => void;
  onBack: () => void;
}

export function PatientDetailsForm({ onSubmit, onBack }: PatientDetailsFormProps) {
  const [formData, setFormData] = useState<Partial<PatientDetails>>({
    fullName: '',
    age: undefined,
    gender: undefined,
    height: undefined,
    weight: undefined,
    city: '',
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const bmi = formData.height && formData.weight
    ? calculateBMI(formData.height, formData.weight)
    : null;

  useEffect(() => {
    if (Object.values(touched).some(Boolean)) {
      setErrors(validatePatientDetails(formData));
    }
  }, [formData, touched]);

  const getError = (field: string) => {
    return touched[field] ? errors.find(e => e.field === field)?.message : undefined;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validatePatientDetails(formData);
    setErrors(validationErrors);
    setTouched({ fullName: true, age: true, gender: true, height: true, weight: true });

    if (validationErrors.length === 0) {
      onSubmit(formData as PatientDetails);
    }
  };

  const isValid = errors.length === 0 && formData.fullName && formData.age && formData.gender && formData.height && formData.weight;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-screen flex items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-soft mb-4">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Patient Details
          </h1>
          <p className="text-muted-foreground">
            Let's start with some basic information about you
          </p>
        </motion.div>

        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl shadow-card border border-border/50 p-6 md:p-8 space-y-6"
        >
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-foreground font-medium">
              Full Name *
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              onBlur={() => setTouched(prev => ({ ...prev, fullName: true }))}
              className={getError('fullName') ? 'border-destructive' : ''}
            />
            {getError('fullName') && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {getError('fullName')}
              </p>
            )}
          </div>

          {/* Age and Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age" className="text-foreground font-medium">
                Age *
              </Label>
              <Input
                id="age"
                type="number"
                placeholder={`${VALIDATION_RANGES.age.min}-${VALIDATION_RANGES.age.max}`}
                value={formData.age || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, age: Number(e.target.value) || undefined }))}
                onBlur={() => setTouched(prev => ({ ...prev, age: true }))}
                className={getError('age') ? 'border-destructive' : ''}
              />
              {getError('age') && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {getError('age')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-foreground font-medium">Gender *</Label>
              <div className="flex gap-2">
                {(['male', 'female', 'other'] as const).map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, gender }));
                      setTouched(prev => ({ ...prev, gender: true }));
                    }}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      formData.gender === gender
                        ? 'gradient-primary text-primary-foreground shadow-soft'
                        : 'bg-muted text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </button>
                ))}
              </div>
              {getError('gender') && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {getError('gender')}
                </p>
              )}
            </div>
          </div>

          {/* Height and Weight */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height" className="text-foreground font-medium flex items-center gap-2">
                <Ruler className="w-4 h-4 text-primary" />
                Height (cm) *
              </Label>
              <Input
                id="height"
                type="number"
                placeholder={`${VALIDATION_RANGES.height.min}-${VALIDATION_RANGES.height.max}`}
                value={formData.height || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, height: Number(e.target.value) || undefined }))}
                onBlur={() => setTouched(prev => ({ ...prev, height: true }))}
                className={getError('height') ? 'border-destructive' : ''}
              />
              {getError('height') && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {getError('height')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight" className="text-foreground font-medium flex items-center gap-2">
                <Weight className="w-4 h-4 text-primary" />
                Weight (kg) *
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder={`${VALIDATION_RANGES.weight.min}-${VALIDATION_RANGES.weight.max}`}
                value={formData.weight || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: Number(e.target.value) || undefined }))}
                onBlur={() => setTouched(prev => ({ ...prev, weight: true }))}
                className={getError('weight') ? 'border-destructive' : ''}
              />
              {getError('weight') && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {getError('weight')}
                </p>
              )}
            </div>
          </div>

          {/* BMI Display */}
          {bmi && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-accent border border-primary/20"
            >
              <p className="text-sm text-muted-foreground">Calculated BMI</p>
              <p className="text-2xl font-display font-bold text-primary">{bmi}</p>
              <p className="text-sm text-muted-foreground">
                {bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'}
              </p>
            </motion.div>
          )}

          {/* City (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="city" className="text-foreground font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              City / Country (Optional)
            </Label>
            <Input
              id="city"
              type="text"
              placeholder="Enter your city"
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
            />
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
              Continue
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
}
