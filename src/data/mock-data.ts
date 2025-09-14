import { User, CollectionEvent, ProcessingStep, QualityTest, Batch, KPIData, RecallEvent } from '@/types/supply-chain';

export const mockUsers: User[] = [
  { id: '1', name: 'Dr. Rajesh Kumar', role: 'farmer', email: 'rajesh@ayurfarming.in' },
  { id: '2', name: 'Priya Processing Co.', role: 'processor', email: 'contact@priyaprocessing.com' },
  { id: '3', name: 'AyurLab Analytics', role: 'lab', email: 'lab@ayurlab.org' },
  { id: '4', name: 'Himalaya Manufacturing', role: 'manufacturer', email: 'quality@himalaya.com' },
  { id: '5', name: 'Ayush Regulatory Board', role: 'regulator', email: 'inspector@ayush.gov.in' },
];

export const mockCollectionEvents: CollectionEvent[] = [
  {
    id: 'ce-001',
    batchId: 'batch-001',
    species: 'Ashwagandha (Withania somnifera)',
    farmerId: '1',
    farmerName: 'Dr. Rajesh Kumar',
    location: { latitude: 26.9124, longitude: 75.7873, accuracy: 5 },
    timestamp: '2024-09-10T06:30:00Z',
    quantity: 250,
    unit: 'kg',
    complianceStatus: 'compliant',
    certifications: ['Organic India Certificate', 'Fair Trade Verified'],
    sustainabilityScore: 8.5,
    geoFenceViolation: false,
    seasonalViolation: false,
  },
  {
    id: 'ce-002',
    batchId: 'batch-002',
    species: 'Turmeric (Curcuma longa)',
    farmerId: '1',
    farmerName: 'Dr. Rajesh Kumar',
    location: { latitude: 26.8467, longitude: 75.8156, accuracy: 8 },
    timestamp: '2024-09-12T07:15:00Z',
    quantity: 180,
    unit: 'kg',
    complianceStatus: 'violation',
    certifications: ['Organic India Certificate'],
    sustainabilityScore: 6.2,
    geoFenceViolation: true,
    seasonalViolation: false,
  },
];

export const mockProcessingSteps: ProcessingStep[] = [
  {
    id: 'ps-001',
    batchId: 'batch-001',
    stepType: 'drying',
    processorId: '2',
    processorName: 'Priya Processing Co.',
    timestamp: '2024-09-11T14:20:00Z',
    status: 'completed',
    metadata: {
      temperature: '45°C',
      humidity: '12%',
      duration: '48 hours',
      method: 'solar-assisted'
    },
    certificateIds: ['cert-dry-001'],
    location: { latitude: 26.9200, longitude: 75.8000, accuracy: 10 },
  },
];

export const mockQualityTests: QualityTest[] = [
  {
    id: 'qt-001',
    batchId: 'batch-001',
    testType: 'contaminants',
    labId: '3',
    labName: 'AyurLab Analytics',
    timestamp: '2024-09-13T10:30:00Z',
    results: {
      heavyMetals: 'Below detection limit',
      pesticides: 'Not detected',
      aflatoxins: 'Within acceptable limits'
    },
    passed: true,
    certificateUrl: '/certificates/qt-001.pdf',
  },
];

export const mockBatches: Batch[] = [
  {
    id: 'batch-001',
    qrCode: 'QR-ASH-001-2024',
    species: 'Ashwagandha (Withania somnifera)',
    status: 'testing',
    collectionEvents: [mockCollectionEvents[0]],
    processingSteps: [mockProcessingSteps[0]],
    qualityTests: [mockQualityTests[0]],
    sustainabilityScore: 8.5,
    complianceRating: 9.2,
    fairTradeVerified: true,
    createdAt: '2024-09-10T06:30:00Z',
    updatedAt: '2024-09-13T10:30:00Z',
  },
  {
    id: 'batch-002',
    qrCode: 'QR-TUR-002-2024',
    species: 'Turmeric (Curcuma longa)',
    status: 'collection',
    collectionEvents: [mockCollectionEvents[1]],
    processingSteps: [],
    qualityTests: [],
    sustainabilityScore: 6.2,
    complianceRating: 5.8,
    fairTradeVerified: false,
    createdAt: '2024-09-12T07:15:00Z',
    updatedAt: '2024-09-12T07:15:00Z',
  },
];

export const mockKPIData: KPIData = {
  complianceRate: 87.5,
  seasonalComplianceRate: 92.3,
  fairTradePercentage: 76.8,
  sustainabilityScore: 8.1,
  activeRecalls: 2,
  totalBatches: 1247,
  recentScans: 15420,
};

export const mockRecalls: RecallEvent[] = [
  {
    id: 'recall-001',
    batchIds: ['batch-005', 'batch-006'],
    reason: 'Contamination detected in processing facility',
    severity: 'medium',
    status: 'in-progress',
    initiatedBy: 'AyurLab Analytics',
    timestamp: '2024-09-14T08:00:00Z',
    affectedProducts: 45,
    recoveryRate: 67.5,
  },
];