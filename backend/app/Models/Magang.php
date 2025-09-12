<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Magang extends Model
{
    /** @use HasFactory<\Database\Factories\MagangFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'dudi_id',
        'guru_id',
        'status',
        'periode_mulai',
        'periode_selesai',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }

    public function dudi()
    {
        return $this->belongsTo(Dudi::class);
    }

    public function guru()
    {
        return $this->belongsTo(Guru::class, 'guru_id');
    }
}
