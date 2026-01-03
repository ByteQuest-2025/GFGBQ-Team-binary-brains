import { motion } from 'framer-motion';
import { Brain, Heart, Activity, Shield } from 'lucide-react';

const steps = [
  { icon: Heart, label: 'Analyzing vital signs...' },
  { icon: Activity, label: 'Processing health metrics...' },
  { icon: Brain, label: 'AI computing risk factors...' },
  { icon: Shield, label: 'Generating recommendations...' },
];

interface AnalysisLoaderProps {
  currentStep: number;
}

export function AnalysisLoader({ currentStep }: AnalysisLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="text-center max-w-md">
        {/* Animated Logo */}
        <motion.div
          className="relative mx-auto mb-8 w-32 h-32"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 rounded-full gradient-primary opacity-20 animate-pulse-ring" />
          <div className="absolute inset-4 rounded-full gradient-primary opacity-40 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-20 h-20 rounded-2xl gradient-primary shadow-elevated flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain className="w-10 h-10 text-primary-foreground" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl font-bold text-foreground mb-4"
        >
          AI Health Analysis
        </motion.h2>

        {/* Progress Steps */}
        <div className="space-y-3 mb-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: index <= currentStep ? 1 : 0.3,
                x: 0,
              }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                index === currentStep 
                  ? 'bg-accent border border-primary/20' 
                  : index < currentStep 
                    ? 'bg-success/10 border border-success/20'
                    : 'bg-muted'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                index === currentStep 
                  ? 'gradient-primary text-primary-foreground' 
                  : index < currentStep
                    ? 'bg-success text-success-foreground'
                    : 'bg-muted-foreground/20 text-muted-foreground'
              }`}>
                <step.icon className="w-4 h-4" />
              </div>
              <span className={`text-sm font-medium ${
                index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.label}
              </span>
              {index === currentStep && (
                <motion.div
                  className="ml-auto w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              )}
              {index < currentStep && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto text-success"
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-primary"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
