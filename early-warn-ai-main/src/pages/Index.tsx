import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BackgroundElements } from '@/components/BackgroundElements';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorks } from '@/components/HowItWorks';
import { PatientDetailsForm } from '@/components/PatientDetailsForm';
import { HealthAssessmentForm } from '@/components/HealthAssessmentForm';
import { AnalysisLoader } from '@/components/AnalysisLoader';
import { ResultsPage } from '@/components/ResultsPage';
import { Footer } from '@/components/Footer';
import { PatientDetails, HealthMetrics, RiskResult } from '@/types/health';
import { analyzeRisk } from '@/utils/riskAnalysis';

type Step = 'landing' | 'patient-details' | 'health-assessment' | 'analyzing' | 'results';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('landing');
  const [patientData, setPatientData] = useState<PatientDetails | null>(null);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics | null>(null);
  const [result, setResult] = useState<RiskResult | null>(null);
  const [analysisStep, setAnalysisStep] = useState(0);

  const handleStartAssessment = () => {
    setCurrentStep('patient-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePatientSubmit = (data: PatientDetails) => {
    setPatientData(data);
    setCurrentStep('health-assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHealthSubmit = (data: HealthMetrics) => {
    setHealthMetrics(data);
    setCurrentStep('analyzing');
    setAnalysisStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setCurrentStep('landing');
    setPatientData(null);
    setHealthMetrics(null);
    setResult(null);
    setAnalysisStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Simulate analysis process
  useEffect(() => {
    if (currentStep === 'analyzing' && patientData && healthMetrics) {
      const steps = [0, 1, 2, 3];
      let stepIndex = 0;

      const interval = setInterval(() => {
        if (stepIndex < steps.length - 1) {
          stepIndex++;
          setAnalysisStep(stepIndex);
        } else {
          clearInterval(interval);
          // Calculate result
          const analysisResult = analyzeRisk(patientData, healthMetrics);
          setResult(analysisResult);
          setTimeout(() => {
            setCurrentStep('results');
          }, 500);
        }
      }, 800);

      return () => clearInterval(interval);
    }
  }, [currentStep, patientData, healthMetrics]);

  return (
    <div className="min-h-screen relative">
      <BackgroundElements />
      
      <AnimatePresence mode="wait">
        {currentStep === 'landing' && (
          <div key="landing">
            <HeroSection onStart={handleStartAssessment} />
            <HowItWorks />
            <Footer />
          </div>
        )}

        {currentStep === 'patient-details' && (
          <PatientDetailsForm
            key="patient-details"
            onSubmit={handlePatientSubmit}
            onBack={() => setCurrentStep('landing')}
          />
        )}

        {currentStep === 'health-assessment' && patientData && (
          <HealthAssessmentForm
            key="health-assessment"
            patient={patientData}
            onSubmit={handleHealthSubmit}
            onBack={() => setCurrentStep('patient-details')}
          />
        )}

        {currentStep === 'analyzing' && (
          <AnalysisLoader key="analyzing" currentStep={analysisStep} />
        )}

        {currentStep === 'results' && patientData && result && (
          <div key="results">
            <ResultsPage
              patient={patientData}
              result={result}
              onRestart={handleRestart}
            />
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
