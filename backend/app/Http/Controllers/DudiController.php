<?php

namespace App\Http\Controllers;

use App\Models\Dudi;
use Illuminate\Http\Request;

class DudiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dudi = Dudi::with('magang.siswa')->get();
        $stat = [
            'totalDudi' => $totalDudi = $dudi->count(),
            'dudiWithMagang' => $dudi->filter(fn($d) => $d->magang->isNotEmpty())->count(),
            'rerataSiswaPerDudi' => $totalDudi ? round($dudi->sum(fn($d) => $d->magang->count()) / $totalDudi, 2) : 0,
        ];
        return response()->json([
            'status' => true,
            'message' => 'Berhasil Mengambil Data Dudi',
            'data' => ['dudi' => $dudi, 'stat' => $stat]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return response()->json([
            'status' => true,
            'message' => 'Berhasil Menambahkan Data Dudi',
            'data' => Dudi::create($request->all())
            // 'data' => $request->all()
        ]);
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
        $dudi = Dudi::find($id);
        if(!$dudi){
            return response()->json([
                'status' => false,
                'message' => 'Data Dudi Tidak Ditemukan',
            ], 404);
        }

        $dudi->update($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Berhasil Mengupdate Data Dudi',
            'data' => $dudi
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dudi = Dudi::find($id);
        if(!$dudi){
            return response()->json([
                'status' => false,
                'message' => 'Data Dudi Tidak Ditemukan',
            ], 404);
        }else{
            if($dudi->magang()->exists()){
                return response()->json([
                    'status' => false,
                    'message' => 'DUDI tidak dapat dihapus karena masih ada data magang yang terkait.',
                ], 200);
            }
        }

        $dudi->delete();
        return response()->json([
            'status' => true,
            'message' => 'Berhasil Menghapus Data Dudi',
        ]);
    }
}
