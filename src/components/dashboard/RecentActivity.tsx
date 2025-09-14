import { motion } from 'framer-motion';
import { Clock, MapPin, CheckCircle, AlertCircle, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ActivityItem {
  id: string;
  type: 'collection' | 'processing' | 'testing' | 'violation' | 'recall';
  title: string;
  description: string;
  timestamp: string;
  location?: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'collection',
    title: 'New Ashwagandha Collection',
    description: 'Dr. Rajesh Kumar harvested 250kg from Rajasthan',
    timestamp: '2 hours ago',
    location: 'Jaipur, Rajasthan',
    status: 'success',
  },
  {
    id: '2',
    type: 'testing',
    title: 'Quality Test Completed',
    description: 'Batch QR-ASH-001-2024 passed all contaminant tests',
    timestamp: '4 hours ago',
    status: 'success',
  },
  {
    id: '3',
    type: 'violation',
    title: 'Geo-fence Violation Detected',
    description: 'Turmeric collection outside approved zone',
    timestamp: '6 hours ago',
    location: 'Gujarat Border',
    status: 'error',
  },
  {
    id: '4',
    type: 'processing',
    title: 'Drying Process Started',
    description: 'Solar-assisted drying initiated for Batch ASH-001',
    timestamp: '8 hours ago',
    status: 'info',
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'collection':
      return MapPin;
    case 'testing':
      return CheckCircle;
    case 'processing':
      return Package;
    case 'violation':
      return AlertCircle;
    default:
      return Clock;
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'success':
      return 'default';
    case 'warning':
      return 'secondary';
    case 'error':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default function RecentActivity() {
  return (
    <div className="enterprise-card p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {mockActivities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-smooth"
            >
              <div className={`
                p-2 rounded-lg flex-shrink-0 
                ${activity.status === 'success' ? 'gradient-primary' : ''}
                ${activity.status === 'error' ? 'bg-destructive/10' : ''}
                ${activity.status === 'warning' ? 'bg-yellow-100' : ''}
                ${activity.status === 'info' ? 'bg-muted/50' : ''}
              `}>
                <Icon className={`
                  w-4 h-4 
                  ${activity.status === 'success' ? 'text-primary-foreground' : ''}
                  ${activity.status === 'error' ? 'text-destructive' : ''}
                  ${activity.status === 'warning' ? 'text-yellow-600' : ''}
                  ${activity.status === 'info' ? 'text-muted-foreground' : ''}
                `} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    {activity.location && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {activity.location}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={getStatusVariant(activity.status)} className="capitalize text-xs">
                      {activity.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}