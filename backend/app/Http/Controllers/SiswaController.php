<?php

namespace App\Http\Controllers;

use App\Models\Magang;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $siswa = Siswa::with('user', 'kelas.jurusan')->get();
        return response()->json([
            'status' => true,
            'message' => 'List Siswa',
            'data' => $siswa
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
    public function getByUser(string $id)
    {
        $siswa = Siswa::with('magang','magang.dudi','magang.logbook','kelas.jurusan')->where('user_id', $id)->first();
        return response()->json([
            'status' => true,
            'message' => "Here is your data by user",
            'data' => $siswa
        ]);
    }

    public function getMagang(){
        $user = Auth::user();
        $siswa = Siswa::where('user_id', $user->id)->first();
        $magang = Magang::where('siswa_id', $siswa->id)->get();

        return response()->json([
            'status' => true,
            'message' => 'Fetch : Data Magang Siswa',
            'data' => $magang
        ]);
    }

    public function daftarDudi(Request $request){
        $user = Auth::user();
        $siswa = Siswa::where('user_id', $user->id)->first();

        $magang = Magang::create([
            'siswa_id' => $siswa->id,
            'dudi_id' => $request->company_id,
            'status' => 'pending',
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Siswa berhasil mendaftar di DUDI',
            'data' => $magang
        ]);
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
