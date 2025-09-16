export interface User {
  id: string;
  name: string;
  role: 'farmer' | 'processor' | 'lab' | 'manufacturer' | 'regulator';
  email: string;
  avatar?: string;
}

export interface GeolocationData {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy: number;
}

export interface CollectionEvent {
  id: string;
  batchId: string;
  species: string;
  farmerId: string;
  farmerName: string;
  location: GeolocationData;
  timestamp: string;
  quantity: number;
  unit: 'kg' | 'tons';
  complianceStatus: 'compliant' | 'violation' | 'pending';
  certifications: string[];
  sustainabilityScore: number;
  geoFenceViolation?: boolean;
  seasonalViolation?: boolean;
}

export interface ProcessingStep {
  id: string;
  batchId: string;
  stepType: 'drying' | 'grinding' | 'testing' | 'packaging' | 'quality-check';
  processorId: string;
  processorName: string;
  timestamp: string;
  status: 'completed' | 'in-progress' | 'pending' | 'failed';
  metadata: Record<string, any>;
  certificateIds: string[];
  location: GeolocationData;
}

export interface QualityTest {
  id: string;
  batchId: string;
  testType: 'contaminants' | 'potency' | 'purity' | 'microbiological';
  labId: string;
  labName: string;
  timestamp: string;
  results: Record<string, any>;
  passed: boolean;
  certificateUrl?: string;
}

export interface Batch {
  id: string;
  qrCode: string;
  species: string;
  status: 'collection' | 'processing' | 'testing' | 'packaging' | 'distribution' | 'recalled';
  collectionEvents: CollectionEvent[];
  processingSteps: ProcessingStep[];
  qualityTests: QualityTest[];
  sustainabilityScore: number;
  complianceRating: number;
  fairTradeVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface KPIData {
  complianceRate: number;
  seasonalComplianceRate: number;
  fairTradePercentage: number;
  sustainabilityScore: number;
  activeRecalls: number;
  totalBatches: number;
  recentScans: number;
}

export interface RecallEvent {
  id: string;
  batchIds: string[];
  reason: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'initiated' | 'in-progress' | 'completed';
  initiatedBy: string;
  timestamp: string;
  affectedProducts: number;
  recoveryRate: number;
}