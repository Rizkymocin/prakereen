<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dudi extends Model
{
    /** @use HasFactory<\Database\Factories\DudiFactory> */
    use HasFactory;

    protected $fillable = [
        'nama_perusahaan',
        'alamat',
        'kuota',
        'bidang_usaha',
        'telepon',
        'email',
        'penanggung_jawab',
        'deskripsi'
    ];

    public function magang(){{
        return $this->hasMany(Magang::class);
    }}

}
