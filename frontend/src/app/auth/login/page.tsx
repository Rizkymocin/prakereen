'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import type { LoginData } from '@/types';
import { useAuthStore } from '@/stores/auth.store';

export default function LoginPage() {
   const [showPassword, setShowPassword] = useState(false);
   const [formData, setFormData] = useState<Pick<LoginData, 'email' | 'password'>>({
      email: '',
      password: ''
   });

   const login = useAuthStore((state) => state.login);
   const loading = useAuthStore((state) => state.loading);
   const error = useAuthStore((state) => state.error);
   const verifyToken = useAuthStore((state) => state.verifyToken);

   const router = useRouter();

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async () => {
      try {
         await login(formData);
         router.push('/');
      } catch (error) {
         
      }
   }

   useEffect(() => {
      (async () => {
         const isValid = await verifyToken();
         if(isValid){
            router.push('/');
         }
      })();
   }, [])

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
         <div className="w-full max-w-md">
         <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 rounded-2xl" />
            <div className="relative z-10">
               <div className="text-center mb-8">
               <div className="w-16 h-16 bg-linear-to-r from-cyan-500 to-sky-600 text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <User className="w-8 h-8 text-white" />
               </div>
               <h1 className="text-3xl font-bold text-gray-800 mb-2">Prakereen</h1>
               <p className="text-gray-600">Digitalisasi Prakerin Menuju Masa Depan</p>
               </div>
               <div className="space-y-6">
               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                     <input
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleInputChange}
                     placeholder="Ketikan email anda"
                     className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                     <input
                     type={showPassword ? 'text' : 'password'}
                     name="password"
                     value={formData.password}
                     onChange={handleInputChange}
                     placeholder="Ketikan password anda"
                     className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                     <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                     >
                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                     </button>
                  </div>
               </div>
               <div className="flex items-center justify-between">
                  <label className="flex items-center">
                     <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                     <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-cyan-500 hover:text-sky-600">Forgot password?</a>
               </div>
               <button
                  onClick={handleSubmit}
                  type="button"
                  disabled={loading}
                  className="cursor-pointer w-full bg-linear-to-r from-cyan-500 to-sky-600 text-primary-foreground py-3 rounded-xl font-medium hover:from-cyan-500 hover:to-sky-600 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
               >
                  {loading ? 'Loading...' : 'Sign In'}
               </button>
               {error && (
               <div className='text-sm text-red-200'>{error}</div>
               )}
               </div>
            </div>
         </div>
         <div className="text-center mt-8 text-sm text-gray-500">
            <p>
               Dibangun oleh <a href='https://www.github.com/Rizkymocin'  className='text-sky-600'>Rizky Mohi</a> Dibawah bimbingan <span className='text-sky-600'>PT Universal Big Data</span> dalam kegiatan Magang
            </p>
         </div>
         </div>
      </div>
   );
}
