export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  assignedDoctor?: string;
}

export interface Vital {
  id: string;
  patientId: string;
  heartRate: number;
  spo2: number;
  temperature: number;
  respiratoryRate: number;
  timestamp: string;
  status: 'Normal' | 'Critical';
}

export interface Alert {
  id: string;
  patientId: string;
  severity: 'Low' | 'Medium' | 'Critical';
  message: string;
  timestamp: string;
}
