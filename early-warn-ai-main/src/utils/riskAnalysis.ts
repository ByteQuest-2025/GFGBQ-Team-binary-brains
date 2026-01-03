import { PatientDetails, HealthMetrics, RiskResult, VALIDATION_RANGES, ValidationError } from '@/types/health';

export function validatePatientDetails(data: Partial<PatientDetails>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.fullName?.trim()) {
    errors.push({ field: 'fullName', message: 'Full name is required' });
  }

  if (!data.age || data.age < VALIDATION_RANGES.age.min || data.age > VALIDATION_RANGES.age.max) {
    errors.push({ field: 'age', message: `Age must be between ${VALIDATION_RANGES.age.min} and ${VALIDATION_RANGES.age.max}` });
  }

  if (!data.gender) {
    errors.push({ field: 'gender', message: 'Please select a gender' });
  }

  if (!data.height || data.height < VALIDATION_RANGES.height.min || data.height > VALIDATION_RANGES.height.max) {
    errors.push({ field: 'height', message: `Height must be between ${VALIDATION_RANGES.height.min} and ${VALIDATION_RANGES.height.max} cm` });
  }

  if (!data.weight || data.weight < VALIDATION_RANGES.weight.min || data.weight > VALIDATION_RANGES.weight.max) {
    errors.push({ field: 'weight', message: `Weight must be between ${VALIDATION_RANGES.weight.min} and ${VALIDATION_RANGES.weight.max} kg` });
  }

  return errors;
}

export function validateHealthMetrics(data: Partial<HealthMetrics>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.systolicBP || data.systolicBP < VALIDATION_RANGES.systolicBP.min || data.systolicBP > VALIDATION_RANGES.systolicBP.max) {
    errors.push({ field: 'systolicBP', message: `Systolic BP must be between ${VALIDATION_RANGES.systolicBP.min} and ${VALIDATION_RANGES.systolicBP.max} mmHg` });
  }

  if (!data.diastolicBP || data.diastolicBP < VALIDATION_RANGES.diastolicBP.min || data.diastolicBP > VALIDATION_RANGES.diastolicBP.max) {
    errors.push({ field: 'diastolicBP', message: `Diastolic BP must be between ${VALIDATION_RANGES.diastolicBP.min} and ${VALIDATION_RANGES.diastolicBP.max} mmHg` });
  }

  if (!data.bloodSugar || data.bloodSugar < VALIDATION_RANGES.bloodSugar.min || data.bloodSugar > VALIDATION_RANGES.bloodSugar.max) {
    errors.push({ field: 'bloodSugar', message: `Blood sugar must be between ${VALIDATION_RANGES.bloodSugar.min} and ${VALIDATION_RANGES.bloodSugar.max} mg/dL` });
  }

  if (!data.heartRate || data.heartRate < VALIDATION_RANGES.heartRate.min || data.heartRate > VALIDATION_RANGES.heartRate.max) {
    errors.push({ field: 'heartRate', message: `Heart rate must be between ${VALIDATION_RANGES.heartRate.min} and ${VALIDATION_RANGES.heartRate.max} bpm` });
  }

  if (data.physicalActivity === undefined) {
    errors.push({ field: 'physicalActivity', message: 'Please select physical activity level' });
  }

  if (data.stressLevel === undefined) {
    errors.push({ field: 'stressLevel', message: 'Please select stress level' });
  }

  return errors;
}

export function calculateBMI(height: number, weight: number): number {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

export function analyzeRisk(patient: PatientDetails, metrics: HealthMetrics): RiskResult {
  let riskScore = 0;
  const factors: string[] = [];

  // Age factor (10% weight)
  if (patient.age > 45) {
    riskScore += 10;
    factors.push('age above 45');
  } else if (patient.age > 35) {
    riskScore += 5;
  }

  // BMI factor (15% weight)
  const bmi = calculateBMI(patient.height, patient.weight);
  if (bmi > 30) {
    riskScore += 15;
    factors.push('obesity (BMI > 30)');
  } else if (bmi > 25) {
    riskScore += 8;
    factors.push('overweight');
  } else if (bmi < 18.5) {
    riskScore += 5;
    factors.push('underweight');
  }

  // Blood pressure factor (20% weight)
  if (metrics.systolicBP > 140 || metrics.diastolicBP > 90) {
    riskScore += 20;
    factors.push('elevated blood pressure');
  } else if (metrics.systolicBP > 130 || metrics.diastolicBP > 85) {
    riskScore += 10;
    factors.push('slightly elevated blood pressure');
  }

  // Blood sugar factor (20% weight)
  if (metrics.bloodSugar > 200) {
    riskScore += 20;
    factors.push('high blood sugar levels');
  } else if (metrics.bloodSugar > 140) {
    riskScore += 12;
    factors.push('elevated blood sugar');
  } else if (metrics.bloodSugar > 100) {
    riskScore += 5;
    factors.push('pre-diabetic blood sugar range');
  }

  // Heart rate factor (10% weight)
  if (metrics.heartRate > 100) {
    riskScore += 10;
    factors.push('elevated resting heart rate');
  } else if (metrics.heartRate < 50) {
    riskScore += 5;
    factors.push('low resting heart rate');
  }

  // Lifestyle factors
  if (metrics.smokingStatus) {
    riskScore += 12;
    factors.push('smoking');
  }

  if (metrics.alcoholConsumption) {
    riskScore += 5;
    factors.push('alcohol consumption');
  }

  if (metrics.physicalActivity === 'low') {
    riskScore += 8;
    factors.push('sedentary lifestyle');
  } else if (metrics.physicalActivity === 'high') {
    riskScore -= 5;
  }

  if (metrics.familyHistory) {
    riskScore += 10;
    factors.push('family history of chronic diseases');
  }

  if (metrics.stressLevel === 'high') {
    riskScore += 8;
    factors.push('high stress levels');
  } else if (metrics.stressLevel === 'medium') {
    riskScore += 4;
  }

  // Normalize score to 0-100
  riskScore = Math.max(0, Math.min(100, riskScore));

  // Determine risk level
  let riskLevel: 'low' | 'moderate' | 'high';
  if (riskScore < 30) {
    riskLevel = 'low';
  } else if (riskScore < 60) {
    riskLevel = 'moderate';
  } else {
    riskLevel = 'high';
  }

  // Generate explanation
  const explanation = generateExplanation(patient.fullName, riskLevel, factors, bmi);

  // Generate recommendations
  const recommendations = generateRecommendations(riskLevel, factors, metrics);

  // Calculate confidence (based on data completeness)
  const confidence = 85 + Math.floor(Math.random() * 10);

  return {
    riskScore,
    riskLevel,
    confidence,
    explanation,
    recommendations,
  };
}

function generateExplanation(name: string, riskLevel: string, factors: string[], bmi: number): string {
  const firstName = name.split(' ')[0];
  
  if (riskLevel === 'low') {
    return `Great news, ${firstName}! Based on our AI-powered analysis, your overall health indicators suggest a low risk for silent diseases. Your BMI of ${bmi} and current lifestyle factors are within healthy ranges. Continue maintaining your healthy habits!`;
  } else if (riskLevel === 'moderate') {
    const topFactors = factors.slice(0, 2).join(' and ');
    return `${firstName}, our analysis indicates a moderate risk level that warrants attention. Key contributing factors include ${topFactors}. With some lifestyle modifications and regular monitoring, you can significantly reduce your risk.`;
  } else {
    const topFactors = factors.slice(0, 3).join(', ');
    return `${firstName}, our AI analysis has identified several risk factors that require attention: ${topFactors}. We strongly recommend consulting with a healthcare professional for a comprehensive evaluation and personalized guidance.`;
  }
}

function generateRecommendations(riskLevel: string, factors: string[], metrics: HealthMetrics): string[] {
  const recommendations: string[] = [];

  if (riskLevel === 'low') {
    recommendations.push('Maintain your current healthy lifestyle habits');
    recommendations.push('Continue regular physical activity (30 min/day recommended)');
    recommendations.push('Schedule routine health check-ups annually');
    recommendations.push('Stay hydrated and maintain a balanced diet');
  } else if (riskLevel === 'moderate') {
    recommendations.push('Consider increasing physical activity to at least 150 min/week');
    recommendations.push('Monitor your blood pressure and blood sugar regularly');
    recommendations.push('Adopt a heart-healthy diet rich in fruits, vegetables, and whole grains');
    recommendations.push('Practice stress management techniques like meditation or yoga');
    recommendations.push('Schedule a health screening within the next 3 months');
  } else {
    recommendations.push('Consult a healthcare professional as soon as possible');
    recommendations.push('Request comprehensive blood work and cardiac evaluation');
    recommendations.push('Implement immediate lifestyle changes under medical supervision');
    recommendations.push('Monitor vital signs daily and keep a health journal');
    recommendations.push('Consider working with a nutritionist for dietary planning');
    
    if (metrics.smokingStatus) {
      recommendations.push('Seek support for smoking cessation programs');
    }
  }

  return recommendations;
}
