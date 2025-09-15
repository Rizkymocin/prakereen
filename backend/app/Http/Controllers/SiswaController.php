<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;

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
    public function showByUser(string $id)
    {
        $siswa = Siswa::with('magang.logbook','kelas.jurusan')->where('user_id', $id)->first();
        return response()->json([
            'status' => true,
            'message' => "Here is your data by user",
            'data' => $siswa
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
