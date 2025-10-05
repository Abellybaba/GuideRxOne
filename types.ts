
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  schedule: { time: string; days: string[] };
  imageUrl: string;
}

export interface Patient {
  id:string;
  name: string;
  phone: string;
  email: string;
  medications: Medication[];
}

export enum Screen {
  Login,
  Dashboard,
  Reminder,
  Help,
  Confirmation,
}
