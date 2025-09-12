import { BookOpen, Building2, GraduationCap, LayoutDashboard } from "lucide-react";

export const guruMenuItems  = [
   { 
      href: '/', 
      label: 'Dashboard', 
      description: 'Ringkasan Aktivitas',
      icon: LayoutDashboard,
   },
   { 
      href: '/guru/dudi', 
      label: 'DUDI', 
      description: 'Dunia Usaha dan Industri',
      icon: Building2,
   },
   { 
      href: '/guru/magang', 
      label: 'Magang', 
      description: 'Data Siswa Magang',
      icon: GraduationCap,
   },
   { 
      href: '/guru/logbook', 
      label: 'Logbook', 
      description: 'Catatan Harian',
      icon: BookOpen,
   },
];

export const siswaMenuItems  = [
   { 
      href: '/siswa', 
      label: 'Dashboard', 
      description: 'Ringkasan Aktivitas',
      icon: LayoutDashboard,
   },
   { 
      href: '/siswa/dudi', 
      label: 'DUDI', 
      description: 'Dunia Usaha dan Industri',
      icon: Building2,
   },
   { 
      href: '/siswa/magang', 
      label: 'Magang', 
      description: 'Data Siswa Magang',
      icon: GraduationCap,
   },
   { 
      href: '/siswa/logbook', 
      label: 'Logbook', 
      description: 'Catatan Harian',
      icon: BookOpen,
   },
]