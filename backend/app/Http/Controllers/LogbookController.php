<?php

namespace App\Http\Controllers;

use App\Models\Logbook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogbookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $guru = $user->guru;
        $logbooks = Logbook::whereHas('magang', function ($query) use ($guru) {
            $query->where('guru_id', $guru->id);
        })->with('magang.siswa')
        ->orderBy('tanggal', 'ASC')
        ->get();

        $stat = [
            'totalLogbook' => $logbooks->count(),
            'totalVerified' => $logbooks->where('status_verifikasi', 'disetujui')->count(),
            'totalPending' => $logbooks->where('status_verifikasi', 'pending')->count(),
            'totalRejected' => $logbooks->where('status_verifikasi', 'ditolak')->count(),
        ];

        return response()->json([
            'status' => true,
            'message' => 'Data logbook retrieved successfully',
            'data' => ['logbooks' => $logbooks, 'stat' => $stat]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
