<?php

namespace App\Http\Controllers;

use App\Models\Dudi;
use App\Models\Logbook;
use App\Models\Magang;
use App\Models\Siswa;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(){
        $user = Auth::user();
        $guru = $user->guru;
        $siswa = Siswa::all();
        $dudi = Dudi::all();
        $magang = Magang::with('guru','siswa','dudi')->get();
        $logbook = Logbook::all();

        $totalSiswa = $siswa->count();
        $totalDudi = $dudi->count();

        $today = Carbon::today();
        $magangInProgress = $magang->where('periode_mulai', '<=', $today)
                            ->where('periode_selesai', '>=', $today)
                            ->count();
        $logbookToday = $logbook->where('tanggal', $today->toDateString())->count();

        $recentMagang = $magang->where('status', 'aktif')
                            ->where('guru_id', $user->guru?->id) // Pastikan user memiliki relasi guru  
                            ->sortByDesc('created_at')
                            ->take(5);
        
        $recentLogbook = Logbook::with('magang.guru', 'magang.siswa')
            ->whereHas('magang', function ($query) use ($guru) {
                $query->where('guru_id', $guru->id);
            })
            ->take(5)
            ->get();

        $activeDudi = Dudi::whereHas('magang', function ($q) use ($user) {
            $q->where('status', 'aktif')
            ->whereHas('guru', function ($q2) use ($user) {
                $q2->where('user_id', $user->id);
            });
        })
        ->withCount(['magang as total_siswa_aktif' => function ($q) use ($user) {
            $q->where('status', 'aktif')
            ->whereHas('guru', function ($q2) use ($user) {
                $q2->where('user_id', $user->id);
            });
        }])
        ->get();

        $siswaAktifMagang = Siswa::whereIn('id', function ($query) use ($user) {
            $query->select('siswa_id')
                ->from('magangs')
                ->where('status', 'aktif');
        })->count();

        $logbookToday = $logbook->where('tanggal', $today->toDateString())->count();


        return response()->json([
            'totalSiswa' => $totalSiswa,
            'totalDudi' => $totalDudi,
            'magangInProgress' => $magangInProgress,
            'totalLogbook' => $totalLogbook = $logbook->count(),
            'recentMagang' => $recentMagang->values(),
            'recentLogbook' => $recentLogbook->values(),
            'activeDudi' => $activeDudi->values(),
            'siswaAktifMagang' => $siswaAktifMagang,
            'logbookToday' => $logbookToday,
        ]);

    }
}
