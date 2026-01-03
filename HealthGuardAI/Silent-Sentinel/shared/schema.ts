import { pgTable, text, serial, integer, boolean, jsonb, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const predictions = pgTable("predictions", {
  id: serial("id").primaryKey(),
  name: text("name"),
  age: integer("age"),
  gender: text("gender"),
  glucose: integer("glucose").notNull(),
  bp: integer("bp").notNull(),
  cholesterol: integer("cholesterol").notNull(),
  sleepHours: integer("sleep_hours").notNull(),
  activityLevel: integer("activity_level").notNull(), // 1-5
  stressLevel: integer("stress_level").notNull(), // 1-5
  familyHistory: text("family_history").array().notNull(),
  anxietyLevel: integer("anxiety_level").notNull(), // 0-10? Assuming 1-5 or similar based on prompt "number"
  depressionLevel: integer("depression_level").notNull(),
  riskScore: integer("risk_score").notNull(),
  recommendation: text("recommendation").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPredictionSchema = createInsertSchema(predictions).omit({ 
  id: true, 
  createdAt: true,
  riskScore: true,
  recommendation: true 
});

// Input schema matching the prompt's JSON structure exactly for the API
export const predictionInputSchema = z.object({
  personal_info: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    gender: z.string().optional(),
  }).optional(),
  lab_trends: z.object({
    glucose: z.number(),
    bp: z.number(),
    cholesterol: z.number(),
  }),
  sleep_hours: z.number().min(0).max(24),
  activity_level: z.number().min(1).max(5),
  stress_level: z.number().min(1).max(5),
  family_history: z.array(z.string()),
  mental_health: z.object({
    anxiety: z.number(),
    depression: z.number(),
  }),
});

export const predictionResponseSchema = z.object({
  risk_score: z.number(),
  recommendation: z.string(),
});

export type Prediction = typeof predictions.$inferSelect;
export type InsertPrediction = z.infer<typeof insertPredictionSchema>;
export type PredictionInput = z.infer<typeof predictionInputSchema>;
export type PredictionResponse = z.infer<typeof predictionResponseSchema>;
