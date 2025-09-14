import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

const variantStyles = {
  default: 'border-border',
  success: 'border-primary/20 bg-primary/5',
  warning: 'border-yellow-200 bg-yellow-50',
  danger: 'border-destructive/20 bg-destructive/5',
};

export default function KPICard({
  title,
  value,
  change,
  icon: Icon,
  description,
  variant = 'default',
  className,
}: KPICardProps) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'enterprise-card enterprise-card-hover p-6',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={cn(
              'p-2 rounded-lg',
              variant === 'success' && 'gradient-primary',
              variant === 'warning' && 'bg-yellow-100',
              variant === 'danger' && 'bg-destructive/10',
              variant === 'default' && 'bg-muted/50'
            )}>
              <Icon className={cn(
                'w-5 h-5',
                variant === 'success' && 'text-primary-foreground',
                variant === 'warning' && 'text-yellow-600',
                variant === 'danger' && 'text-destructive',
                variant === 'default' && 'text-muted-foreground'
              )} />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </h3>
          </div>
          
          <div className="space-y-1">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold text-foreground"
            >
              {value}
            </motion.div>
            
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>

        {change !== undefined && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className={cn(
              'text-sm font-semibold px-2 py-1 rounded-full',
              change >= 0
                ? 'text-primary bg-primary/10'
                : 'text-destructive bg-destructive/10'
            )}
          >
            {change >= 0 ? '+' : ''}{change}%
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}