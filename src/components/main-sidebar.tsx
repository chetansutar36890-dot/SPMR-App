'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Bot,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Siren,
  Stethoscope,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/providers/auth-provider';
import { Separator } from './ui/separator';

const patientLinks = [
  { href: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/patient/vitals', label: 'Record Vitals', icon: HeartPulse },
  { href: '/patient/alerts', label: 'View Alerts', icon: Siren },
  { href: '/chatbot', label: 'Chatbot', icon: Bot },
];

const doctorLinks = [
  { href: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/chatbot', label: 'Chatbot', icon: Bot },
];

const adminLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/patients', label: 'Manage Patients', icon: Users },
];

export function MainSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  let links = [];
  if (user?.role === 'patient') links = patientLinks;
  else if (user?.role === 'doctor') links = doctorLinks;
  else if (user?.role === 'admin') links = adminLinks;
  
  // Add common links for roles that have access
  if (user?.role === 'doctor') {
     // A doctor might want to see all patients, not just assigned ones
     links.push({ href: '/admin/patients', label: 'View Patients', icon: Users });
  }


  return (
    <div className="flex h-full flex-col">
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Stethoscope className="h-8 w-8 text-primary" />
          <span className="text-lg font-semibold">SPMR</span>
        </div>
      </SidebarHeader>
      <Separator className="my-2" />
      <SidebarContent className="flex-1">
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} passHref legacyBehavior>
                <SidebarMenuButton
                  isActive={pathname === link.href}
                  tooltip={link.label}
                >
                  <link.icon />
                  <span>{link.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator className="my-2" />
      <SidebarMenu className="p-2">
        <SidebarMenuItem>
          <SidebarMenuButton onClick={logout} tooltip="Logout">
            <LogOut />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}
