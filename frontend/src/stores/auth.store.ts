import {create} from 'zustand'
import { persist } from 'zustand/middleware';
import { api } from '@/lib/api';
import { LoginData } from '@/types';

interface User {
   id: number;
   name: string;
   email: string;
   role_names: string[]; // Menyimpan array role names
}

interface AuthState {
   // states
   user: User | null;
   token: string | null;
   loading: boolean;
   error: string | null;

   // actions
   login: (loginData: Pick<LoginData, 'email' | 'password'>) => Promise<void>;
   register: (name: string, email: string, password: string, password_confirmation: string) => Promise<boolean>;
   logout: () => void;
   verifyToken: () => Promise<boolean>;
   fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
   persist(
      (set, get) => ({
         user: null,
         token: null,
         loading: false,
         error: null, 

         login: async (loginData) => {            
            try {
               set({loading: true, error: null});
               const res = await api.post('/login', loginData);
               const data = res.data;

               if (!data.status) {
                  throw new Error(data.message || 'Login failed');
               }

               // simpan token + user
               set({
                  token: data.access_token,
                  user: data.user ?? null,
                  loading: false
               });            
            } catch (err: any) {
               set({error: err.message || 'Login failed', loading: false});
               throw err;
            }
         },
         register: async (name, email, password, password_confirmation) => {
            try {
               set({loading: true, error: null});
               const res = await api.post('/register', {name, email, password, password_confirmation}); 
               const data = res.data;
               if(!data.status) throw new Error(data.message || 'Registration failed');
               set({loading: false});
               return true;
            } catch (err: any) {
               set({error: err.message, loading: false});
               return false;
            }
         },
         logout: () => {
            set({user: null, token: null});
            localStorage.removeItem('persist:auth-storage'); // Hapus data yang dipersist
         },

         verifyToken: async (): Promise<boolean> => {
            try {
               const authStorage = localStorage.getItem('auth-storage');
               const authStorageParsed = authStorage ? JSON.parse(authStorage) : null;
               if(authStorageParsed.state.token === null){
                  return false;
               }else{
                  api.defaults.headers.common['Authorization'] = `Bearer ${authStorageParsed.state.token}`;
                  const response = await api.post('/verify-token');
                  if (!response.data.status) {
                     localStorage.removeItem('auth-storage');
                     return false;
                  }else{
                     return true;
                  }
               }
            } catch (error) {
               localStorage.removeItem('auth-storage');
               return false;
            }
         },
         fetchUser: async () => {
            const res = await api.get('/user');
            if(!res.data.status) {
               localStorage.removeItem('persist:auth-storage');
               set({user: null, token: null});
               throw new Error('Fetch user failed');
            }
            set({user: res.data.user});// Set user dari response
            return;
         }
      }), {
         name: 'auth-storage', // nama item di localStorage
      }
   )
)