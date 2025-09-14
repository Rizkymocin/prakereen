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

        $magang = Magang::with('siswa.user', 'dudi','siswa.kelas.jurusan')
                    ->where('guru_id', $guru->id)
                    ->orderByDesc('created_at')
                    ->get();
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

    public function store(Request $request)
    {
        $user = Auth::user();
        $guru = $user->guru;

        $data = $request->all();
        $data['guru_id'] = $guru->id;
        $data['status'] = 'pending'; // Set status default ke 'pending'

        return response()->json([
            'status' => true,
            'message' => 'Berhasil Menambahkan Data Magang',
            'data' => Magang::create($data)
        ]);
    }   
}
