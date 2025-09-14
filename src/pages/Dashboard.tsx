import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Shield, 
  Leaf, 
  AlertTriangle, 
  Package,
  QrCode,
  Users,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import KPICard from '@/components/dashboard/KPICard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { mockKPIData } from '@/data/mock-data';

const complianceChartData = [
  { month: 'Jan', compliance: 85, sustainability: 78 },
  { month: 'Feb', compliance: 88, sustainability: 82 },
  { month: 'Mar', compliance: 87, sustainability: 80 },
  { month: 'Apr', compliance: 92, sustainability: 85 },
  { month: 'May', compliance: 89, sustainability: 87 },
  { month: 'Jun', compliance: 91, sustainability: 89 },
];

const harvestTrendsData = [
  { species: 'Ashwagandha', quantity: 2340 },
  { species: 'Turmeric', quantity: 1890 },
  { species: 'Brahmi', quantity: 1230 },
  { species: 'Neem', quantity: 980 },
  { species: 'Amla', quantity: 750 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Supply Chain Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Real-time monitoring of Ayurvedic herbal supply chain operations
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          Live Data • Updated 2 min ago
        </div>
      </motion.div>

      {/* KPI Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <KPICard
          title="Compliance Rate"
          value={`${mockKPIData.complianceRate}%`}
          change={2.5}
          icon={Shield}
          description="Within approved zones"
          variant="success"
        />
        
        <KPICard
          title="Sustainability Score"
          value={mockKPIData.sustainabilityScore}
          change={0.8}
          icon={Leaf}
          description="Environmental impact"
          variant="success"
        />
        
        <KPICard
          title="Active Batches"
          value={mockKPIData.totalBatches.toLocaleString()}
          change={12.3}
          icon={Package}
          description="Currently tracked"
          variant="default"
        />
        
        <KPICard
          title="Active Recalls"
          value={mockKPIData.activeRecalls}
          change={-25}
          icon={AlertTriangle}
          description="Risk management"
          variant={mockKPIData.activeRecalls > 0 ? "danger" : "success"}
        />
      </motion.div>

      {/* Secondary KPIs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <KPICard
          title="Fair Trade Verified"
          value={`${mockKPIData.fairTradePercentage}%`}
          change={4.2}
          icon={Users}
          description="Certified batches"
          variant="success"
        />
        
        <KPICard
          title="Recent QR Scans"
          value={mockKPIData.recentScans.toLocaleString()}
          change={18.7}
          icon={QrCode}
          description="Consumer engagement"
          variant="default"
        />
        
        <KPICard
          title="Seasonal Compliance"
          value={`${mockKPIData.seasonalComplianceRate}%`}
          change={1.2}
          icon={BarChart3}
          description="Harvest timing"
          variant="success"
        />
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="enterprise-card p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Compliance Trends</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={complianceChartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="compliance" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                name="Compliance %"
              />
              <Line 
                type="monotone" 
                dataKey="sustainability" 
                stroke="hsl(var(--sage))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--sage))', strokeWidth: 2, r: 6 }}
                name="Sustainability %"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="enterprise-card p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Harvest Volume by Species</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={harvestTrendsData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="species" 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="quantity" 
                fill="url(#primaryGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <RecentActivity />
      </motion.div>
    </div>
  );
}