import { motion } from 'framer-motion';
import { Shield, Heart, Code2 } from 'lucide-react';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-t border-border bg-card/50 backdrop-blur-sm"
    >
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">HealthGuardAI</span>
          </div>

          {/* Center Info */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground flex items-center gap-2 justify-center">
              Made with <Heart className="w-4 h-4 text-destructive" /> by Team
              <span className="font-semibold text-foreground">Binary Brains</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Hackathon Project 2024
            </p>
          </div>

          {/* Tech Badge */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Code2 className="w-4 h-4" />
            <span>Built with React & AI</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            This application is a prototype designed for educational and hackathon purposes only.
            It does not provide real medical diagnosis. Always consult qualified healthcare professionals
            for medical advice and treatment.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
