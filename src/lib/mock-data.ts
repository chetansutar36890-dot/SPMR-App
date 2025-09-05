import type { Patient, Vital, Alert } from '@/lib/types';

export const mockPatients: Patient[] = [
  { id: 'p1', name: 'John Doe', age: 45, assignedDoctor: 'Doctor Smith' },
  { id: 'p2', name: 'Jane Smith', age: 32, assignedDoctor: 'Doctor Jones' },
  { id: 'p3', name: 'Peter Jones', age: 67, assignedDoctor: 'Doctor Smith' },
  { id: 'p4', name: 'Mary Johnson', age: 55, assignedDoctor: 'Doctor Williams' },
];

export const mockVitals: Vital[] = [
  {
    id: 'v1',
    patientId: 'p1',
    heartRate: 110,
    spo2: 92,
    temperature: 38.5,
    respiratoryRate: 22,
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    status: 'Critical',
  },
  {
    id: 'v2',
    patientId: 'p1',
    heartRate: 75,
    spo2: 98,
    temperature: 37.0,
    respiratoryRate: 16,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    status: 'Normal',
  },
  {
    id: 'v3',
    patientId: 'p2',
    heartRate: 80,
    spo2: 99,
    temperature: 36.8,
    respiratoryRate: 18,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: 'Normal',
  },
];

export const mockAlerts: Alert[] = [
  {
    id: 'a1',
    patientId: 'p1',
    severity: 'Critical',
    message: 'Heart rate is critically high (110 bpm).',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'a2',
    patientId: 'p1',
    severity: 'Medium',
    message: 'SpO2 dropped to 92%.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'a3',
    patientId: 'p3',
    severity: 'Low',
    message: 'Patient missed scheduled vitals recording.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
];
