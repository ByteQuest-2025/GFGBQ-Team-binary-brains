import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, Activity, Heart, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onStart: () => void;
}

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container max-w-6xl mx-auto text-center">
        {/* Logo animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary shadow-elevated mb-6">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
        >
          Health<span className="text-primary">Guard</span>AI
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Predict Early. Prevent Smarter. Protect Lives.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            variant="hero"
            size="xl"
            onClick={onStart}
            className="group"
          >
            Start Health Assessment
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {[
            { icon: Activity, label: 'AI-Powered Analysis' },
            { icon: Heart, label: 'Early Detection' },
            { icon: Shield, label: 'Preventive Care' },
          ].map((feature, index) => (
            <motion.div
              key={feature.label}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-card shadow-card border border-border/50"
            >
              <feature.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
