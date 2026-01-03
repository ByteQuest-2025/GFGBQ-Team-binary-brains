import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { usePredict } from "@/hooks/use-prediction";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RiskIndicator } from "@/components/RiskIndicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, ArrowRight, Activity, Moon, HeartPulse, Brain, User, AlertTriangle, RefreshCw } from "lucide-react";
import { predictionInputSchema, type PredictionResponse } from "@shared/routes";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

// Helper for UI-friendly validation messages
const formSchema = predictionInputSchema;

type FormValues = z.infer<typeof formSchema>;

const FAMILY_HISTORY_OPTIONS = [
  { id: "diabetes", label: "Diabetes" },
  { id: "hypertension", label: "Hypertension" },
  { id: "heart_disease", label: "Heart Disease" },
];

export default function Home() {
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const { toast } = useToast();
  const predictMutation = usePredict();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lab_trends: {
        glucose: 85,
        bp: 120,
        cholesterol: 180,
      },
      sleep_hours: 7,
      activity_level: 3,
      stress_level: 2,
      family_history: [],
      mental_health: {
        anxiety: 2,
        depression: 1,
      },
    },
  });

  const onSubmit = (data: FormValues) => {
    predictMutation.mutate(data, {
      onSuccess: (data) => {
        setResult(data);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        toast({
          title: "Analysis Complete",
          description: "Your health data has been successfully processed.",
        });
      },
      onError: (error) => {
        toast({
          title: "Analysis Failed",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  const resetAnalysis = () => {
    setResult(null);
    form.reset();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Header />

      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8 md:py-12">
        
        {/* Hero Section */}
        <section className="mb-12 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
              AI-Powered Diagnostics
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Silent Disease Early Detection
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our advanced machine learning model analyzes your vital health markers to identify potential silent health risks before they become critical.
            </p>
          </motion.div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-8">
            <Card className="border-border/60 shadow-lg shadow-slate-200/50 bg-white overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Activity className="w-5 h-5 text-primary" />
                  Health Profile
                </CardTitle>
                <CardDescription>
                  Enter your recent biometric data for analysis. All fields are required for accurate prediction.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    
                    {/* Section 1: Lab Trends */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
                        <HeartPulse className="w-4 h-4 text-slate-500" /> Lab Metrics
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="lab_trends.glucose"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Glucose (mg/dL)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  {...field} 
                                  onChange={e => field.onChange(parseFloat(e.target.value))}
                                  className="font-medium"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lab_trends.bp"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Systolic BP (mmHg)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  {...field}
                                  onChange={e => field.onChange(parseFloat(e.target.value))}
                                  className="font-medium"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lab_trends.cholesterol"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cholesterol (mg/dL)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  {...field}
                                  onChange={e => field.onChange(parseFloat(e.target.value))}
                                  className="font-medium"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Section 2: Lifestyle */}
                    <div className="space-y-6 pt-2">
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
                        <Moon className="w-4 h-4 text-slate-500" /> Lifestyle Factors
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                          control={form.control}
                          name="sleep_hours"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex justify-between">
                                Sleep (Hours)
                                <span className="text-primary font-bold">{field.value}h</span>
                              </FormLabel>
                              <FormControl>
                                <Slider
                                  min={0}
                                  max={12}
                                  step={0.5}
                                  value={[field.value]}
                                  onValueChange={(vals) => field.onChange(vals[0])}
                                  className="py-4"
                                />
                              </FormControl>
                              <FormDescription>Average nightly sleep duration</FormDescription>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="activity_level"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex justify-between">
                                Activity Level
                                <span className="text-primary font-bold">{field.value}/5</span>
                              </FormLabel>
                              <FormControl>
                                <Slider
                                  min={1}
                                  max={5}
                                  step={1}
                                  value={[field.value]}
                                  onValueChange={(vals) => field.onChange(vals[0])}
                                  className="py-4"
                                />
                              </FormControl>
                              <div className="flex justify-between text-xs text-slate-400 px-1">
                                <span>Sedentary</span>
                                <span>Very Active</span>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Section 3: Mental Health & Stress */}
                    <div className="space-y-6 pt-2">
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
                        <Brain className="w-4 h-4 text-slate-500" /> Mental Wellbeing
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="stress_level"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-semibold uppercase text-slate-500">Stress</FormLabel>
                              <FormControl>
                                <div className="space-y-3">
                                  <Slider
                                    min={1}
                                    max={5}
                                    step={1}
                                    value={[field.value]}
                                    onValueChange={(vals) => field.onChange(vals[0])}
                                    className="py-2"
                                  />
                                  <div className="text-center font-bold text-lg text-slate-700">{field.value}/5</div>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="mental_health.anxiety"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-semibold uppercase text-slate-500">Anxiety</FormLabel>
                              <FormControl>
                                <div className="space-y-3">
                                  <Slider
                                    min={0}
                                    max={10}
                                    step={1}
                                    value={[field.value]}
                                    onValueChange={(vals) => field.onChange(vals[0])}
                                    className="py-2"
                                  />
                                  <div className="text-center font-bold text-lg text-slate-700">{field.value}/10</div>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="mental_health.depression"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-semibold uppercase text-slate-500">Depression</FormLabel>
                              <FormControl>
                                <div className="space-y-3">
                                  <Slider
                                    min={0}
                                    max={10}
                                    step={1}
                                    value={[field.value]}
                                    onValueChange={(vals) => field.onChange(vals[0])}
                                    className="py-2"
                                  />
                                  <div className="text-center font-bold text-lg text-slate-700">{field.value}/10</div>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Section 4: Family History */}
                    <div className="space-y-4 pt-2">
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
                        <User className="w-4 h-4 text-slate-500" /> Family History
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {FAMILY_HISTORY_OPTIONS.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="family_history"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-slate-200 p-4 hover:bg-slate-50 transition-colors"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer w-full">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="pt-6">
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full text-base h-12 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                        disabled={predictMutation.isPending}
                      >
                        {predictMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Analyzing Biomarkers...
                          </>
                        ) : (
                          <>
                            Run Analysis <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </div>

                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Results - Sticky Desktop */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="border-2 border-primary/10 shadow-xl overflow-hidden bg-white">
                      <div className="bg-primary/5 p-4 border-b border-primary/10 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                          <Activity className="w-5 h-5 text-primary" /> Analysis Result
                        </h3>
                        <Button variant="ghost" size="sm" onClick={resetAnalysis} className="h-8 px-2 text-slate-500 hover:text-primary">
                          <RefreshCw className="w-4 h-4 mr-1" /> Reset
                        </Button>
                      </div>
                      <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                        <RiskIndicator score={result.risk_score} />
                        
                        <div className="mt-8 w-full">
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3 border-b pb-2">Recommendation</h4>
                          <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 text-left text-sm">
                            {result.recommendation}
                          </p>
                        </div>

                        <div className="mt-6 flex items-start gap-3 p-3 bg-blue-50 text-blue-800 rounded-lg text-left text-xs">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                          <p>
                            This analysis is generated by AI and is not a substitute for professional medical advice. Please consult a doctor for a definitive diagnosis.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                     <Card className="border-dashed border-2 border-slate-200 bg-slate-50/50 shadow-none">
                      <CardContent className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                          <Brain className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="font-semibold text-slate-600 mb-1">Ready to Analyze</h3>
                        <p className="text-sm max-w-[200px]">
                          Complete the health profile form to generate your risk assessment.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
