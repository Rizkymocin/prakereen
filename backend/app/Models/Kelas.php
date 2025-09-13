<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    use HasFactory;

    protected $fillable = [
        'tingkat',
        'jurusan_id',
        'rombel'
    ];

    public function jurusan() {
        return $this->belongsTo(Jurusan::class);
    }

    public function siswa() {
        return $this->hasMany(Siswa::class);
    }
}
