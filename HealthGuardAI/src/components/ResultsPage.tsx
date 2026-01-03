import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RiskMeter } from './RiskMeter';
import { PatientDetails, RiskResult } from '@/types/health';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  FileHeart,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ResultsPageProps {
  patient: PatientDetails;
  result: RiskResult;
  onRestart: () => void;
}

export function ResultsPage({ patient, result, onRestart }: ResultsPageProps) {
  const getRiskColor = () => {
    switch (result.riskLevel) {
      case 'low': return 'text-success';
      case 'moderate': return 'text-warning';
      case 'high': return 'text-destructive';
    }
  };

  const getRiskBg = () => {
    switch (result.riskLevel) {
      case 'low': return 'bg-success/10 border-success/30';
      case 'moderate': return 'bg-warning/10 border-warning/30';
      case 'high': return 'bg-destructive/10 border-destructive/30';
    }
  };

  const getRiskIcon = () => {
    switch (result.riskLevel) {
      case 'low': return CheckCircle2;
      case 'moderate': return AlertTriangle;
      case 'high': return XCircle;
    }
  };

  const RiskIcon = getRiskIcon();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-4 py-12"
    >
      <div className="container max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-soft mb-4">
            <FileHeart className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Health Risk Analysis
          </h1>
          <p className="text-muted-foreground">
            Results for {patient.fullName}
          </p>
        </motion.div>

        {/* Risk Score Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl shadow-card border border-border/50 p-8 mb-6"
        >
          <RiskMeter score={result.riskScore} riskLevel={result.riskLevel} />
          
          {/* Risk Level Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full border ${getRiskBg()} mx-auto`}
          >
            <RiskIcon className={`w-5 h-5 ${getRiskColor()}`} />
            <span className={`font-display font-semibold text-lg capitalize ${getRiskColor()}`}>
              {result.riskLevel} Risk
            </span>
          </motion.div>

          {/* Confidence */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            AI Confidence: {result.confidence}%
          </motion.div>
        </motion.div>

        {/* Explanation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl shadow-card border border-border/50 p-6 mb-6"
        >
          <h3 className="font-display font-semibold text-lg text-foreground mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            AI Analysis Summary
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {result.explanation}
          </p>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl shadow-card border border-border/50 p-6 mb-6"
        >
          <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-success" />
            Preventive Recommendations
          </h3>
          <ul className="space-y-3">
            {result.recommendations.map((rec, index) => (
              <motion.li
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-muted/50"
              >
                <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{rec}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-muted/50 rounded-xl p-4 mb-8 border border-border"
        >
          <p className="text-sm text-muted-foreground text-center">
            <strong>Disclaimer:</strong> This is a prototype for hackathon purposes and does not provide medical diagnosis.
            Always consult a qualified healthcare professional for medical advice.
          </p>
        </motion.div>

        {/* Restart Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Button
            variant="hero"
            size="lg"
            onClick={onRestart}
            className="group"
          >
            <RotateCcw className="w-5 h-5 transition-transform group-hover:-rotate-180 duration-500" />
            Start New Assessment
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
