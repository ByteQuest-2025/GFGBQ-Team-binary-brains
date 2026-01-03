import { motion } from 'framer-motion';
import { UserCircle, ClipboardList, Brain, FileHeart } from 'lucide-react';

const steps = [
  {
    icon: UserCircle,
    title: 'Enter Your Details',
    description: 'Provide basic personal information like age, gender, and physical measurements.',
  },
  {
    icon: ClipboardList,
    title: 'Health Assessment',
    description: 'Input your health metrics including blood pressure, sugar levels, and lifestyle habits.',
  },
  {
    icon: Brain,
    title: 'AI Analysis',
    description: 'Our intelligent algorithm analyzes multiple risk factors using weighted scoring.',
  },
  {
    icon: FileHeart,
    title: 'Get Recommendations',
    description: 'Receive personalized preventive recommendations based on your risk profile.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our AI-powered platform makes early disease detection simple and accessible
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative p-6 rounded-2xl bg-card shadow-card border border-border/50 text-center"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-soft">
                {index + 1}
              </div>
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent flex items-center justify-center">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
