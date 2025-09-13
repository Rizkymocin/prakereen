<?php

namespace App\Http\Controllers;

use App\Models\Magang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MagangController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $guru = $user->guru;

        $magang = Magang::with('siswa.user', 'dudi','siswa.kelas.jurusan')->where('guru_id', $guru->id)->get();
        $stat = [
            'totalSiswa' => $magang->count(),
            'totalAktifMagang' => $magang->where('status', 'aktif')->count(),
            'totalSelesaiMagang' => $magang->where('status', 'selesai')->count(),
            'totalPendingMagang' => $magang->where('status', 'pending')->count(),
        ];
        return response()->json([
            'status' => true,
            'message' => 'Berhasil Mengambil Data Magang',
            'data' => ['magang' => $magang, 'stat' => $stat]
        ]);
    }
}
