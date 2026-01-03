import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.predict.path, async (req, res) => {
    try {
      const input = api.predict.input.parse(req.body);
      
      // AI Logic / Risk Calculation
      let riskScore = 0;
      let reasons: string[] = [];

      // 1. Lab Trends (Weighted heavily)
      // Glucose > 140 is high (random), > 100 fasting. Assuming random for simplicity.
      if (input.lab_trends.glucose > 140) {
        riskScore += 20;
        reasons.push("High glucose levels");
      } else if (input.lab_trends.glucose > 100) {
        riskScore += 10;
      }

      // BP: Systolic > 130 is high
      if (input.lab_trends.bp > 130) {
        riskScore += 20;
        reasons.push("Elevated blood pressure");
      } else if (input.lab_trends.bp > 120) {
        riskScore += 10;
      }

      // Cholesterol > 200 is high
      if (input.lab_trends.cholesterol > 240) {
        riskScore += 20;
        reasons.push("High cholesterol");
      } else if (input.lab_trends.cholesterol > 200) {
        riskScore += 10;
      }

      // 2. Sleep (< 6 hours increases risk)
      if (input.sleep_hours < 6) {
        riskScore += 10;
        reasons.push("Insufficient sleep");
      }

      // 3. Activity (< 3 increases risk)
      if (input.activity_level < 3) {
        riskScore += 10;
        reasons.push("Low physical activity");
      }

      // 4. Stress (High stress increases risk)
      if (input.stress_level > 3) {
        riskScore += 10;
        reasons.push("High stress levels");
      }

      // 5. Family History
      if (input.family_history.length > 0) {
        riskScore += 10 * input.family_history.length;
        reasons.push("Family history of disease");
      }

      // 6. Mental Health
      if (input.mental_health.anxiety > 5 || input.mental_health.depression > 5) {
        riskScore += 10;
        reasons.push("Mental health indicators");
      }

      // Cap at 100
      riskScore = Math.min(100, riskScore);

      // Recommendations
      let recommendation = "";
      if (riskScore < 30) {
        recommendation = "Low risk. Maintain your healthy lifestyle.";
      } else if (riskScore < 70) {
        recommendation = "Moderate risk. Consider lifestyle improvements (diet, exercise, stress management) and regular checkups.";
      } else {
        recommendation = "High risk. Strongly recommend consulting a doctor for a comprehensive evaluation.";
      }

      // Append specific reasons if any
      if (reasons.length > 0) {
        recommendation += " Key factors: " + reasons.join(", ") + ".";
      }

      // Optional: Store prediction for history (fire and forget)
      storage.createPrediction({
        glucose: input.lab_trends.glucose,
        bp: input.lab_trends.bp,
        cholesterol: input.lab_trends.cholesterol,
        sleepHours: input.sleep_hours,
        activityLevel: input.activity_level,
        stressLevel: input.stress_level,
        familyHistory: input.family_history,
        anxietyLevel: input.mental_health.anxiety,
        depressionLevel: input.mental_health.depression,
        riskScore,
        recommendation
      }).catch(console.error); // Don't block response

      res.json({
        risk_score: riskScore,
        recommendation: recommendation
      });

    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      } else {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get(api.status.path, (_req, res) => {
    res.json({ message: "Silent Disease Early Detection API is running" });
  });

  return httpServer;
}
