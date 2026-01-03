import { predictions, type InsertPrediction, type Prediction } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createPrediction(prediction: InsertPrediction): Promise<Prediction>;
}

export class DatabaseStorage implements IStorage {
  async createPrediction(insertPrediction: InsertPrediction): Promise<Prediction> {
    const [prediction] = await db
      .insert(predictions)
      .values(insertPrediction)
      .returning();
    return prediction;
  }
}

export const storage = new DatabaseStorage();
