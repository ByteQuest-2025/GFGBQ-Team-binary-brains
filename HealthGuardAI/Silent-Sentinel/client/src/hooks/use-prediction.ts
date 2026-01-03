import { useMutation, useQuery } from "@tanstack/react-query";
import { api, type PredictionInput, type PredictionResponse } from "@shared/routes";

// Hook to check system status
export function useSystemStatus() {
  return useQuery({
    queryKey: [api.status.path],
    queryFn: async () => {
      const res = await fetch(api.status.path);
      if (!res.ok) throw new Error("Failed to fetch status");
      return api.status.responses[200].parse(await res.json());
    },
  });
}

// Hook to submit prediction data
export function usePredict() {
  return useMutation({
    mutationFn: async (data: PredictionInput) => {
      // Validate input before sending using Zod schema from shared routes
      // This ensures we catch basic type errors early
      const validated = api.predict.input.parse(data);

      const res = await fetch(api.predict.path, {
        method: api.predict.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.predict.responses[400].parse(await res.json());
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Prediction failed");
      }

      return api.predict.responses[200].parse(await res.json());
    },
  });
}
