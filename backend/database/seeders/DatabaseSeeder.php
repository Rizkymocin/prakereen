<?php

namespace Database\Seeders;

use App\Models\Dudi;
use App\Models\Logbook;
use App\Models\Magang;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolePermissionSeeder::class);
        User::factory()->count(50)->withRole('siswa')->create();
        User::factory()->count(2)->withRole('guru')->create();
        Dudi::factory()->count(10)->create();
        Magang::factory()->count(20)->create();
        Logbook::factory()->count(30)->create(); // Pindah ke MagangSeeder
    }
}
