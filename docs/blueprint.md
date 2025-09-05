# **App Name**: SPMR Monitor

## Core Features:

- Authentication: Allow users (patient, doctor, admin) to register and login. JWT token stored in session storage.
- Role-based Dashboards: Redirect users to role-specific dashboards (patient, doctor, admin).
- Patient Management (Admin): Enable admins to manage users, doctors, and patients.
- Record Vitals: Allow users to record vitals and display ML prediction results (Normal/Critical).
- Alert System: Display alerts per patient, highlighting critical alerts.
- Chatbot: Provide a chatbot interface for users to input symptoms and receive potential diagnoses or recommendations, using a tool to decide when to highlight in red.
- Conditional Navigation: Common navbar with role-specific options: Dashboard, Patients, Vitals, Alerts, Chatbot, and Logout.

## Style Guidelines:

- Primary color: Sky blue (#87CEEB) evokes trust and calmness, reflecting the health focus.
- Background color: Light grayish-blue (#F0F8FF), same hue but desaturated for a clean and professional feel.
- Accent color: Soft lavender (#E6E6FA) adds a gentle, caring touch.
- Font pairing: 'Inter' (sans-serif) for both headlines and body, for a clean and modern look.
- Use clean and simple icons to represent different features and data points.
- Use a clear and intuitive layout to make navigation easy and data accessible.
- Subtle animations when data is updated, or when a new alert comes in.