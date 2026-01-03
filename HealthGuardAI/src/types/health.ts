export interface PatientDetails {
  fullName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number;
  weight: number;
  city: string;
}

export interface HealthMetrics {
  systolicBP: number;
  diastolicBP: number;
  bloodSugar: number;
  heartRate: number;
  smokingStatus: boolean;
  alcoholConsumption: boolean;
  physicalActivity: 'low' | 'moderate' | 'high';
  familyHistory: boolean;
  stressLevel: 'low' | 'medium' | 'high';
}

export interface RiskResult {
  riskScore: number;
  riskLevel: 'low' | 'moderate' | 'high';
  confidence: number;
  explanation: string;
  recommendations: string[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export const VALIDATION_RANGES = {
  age: { min: 1, max: 120 },
  height: { min: 50, max: 300 }, // cm
  weight: { min: 10, max: 500 }, // kg
  systolicBP: { min: 70, max: 250 },
  diastolicBP: { min: 40, max: 150 },
  bloodSugar: { min: 30, max: 600 }, // mg/dL
  heartRate: { min: 30, max: 220 }, // bpm
} as const;
