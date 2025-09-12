<?php

namespace Database\Factories;

use App\Models\Dudi;
use App\Models\Guru;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Magang>
 */
class MagangFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $mulai = $this->faker->dateTimeBetween('-2 months', 'now');
        $selesai = (clone $mulai)->modify('+3 months');

        return [
            'siswa_id' => Siswa::inRandomOrder()->first()?->id ?? Siswa::factory(), // ✅ ambil siswa existing
            'dudi_id'  => Dudi::inRandomOrder()->first()?->id ?? Dudi::factory(),   // ✅ ambil dudi existing
            'guru_id'  => Guru::inRandomOrder()->first()?->id ?? Guru::factory(),
            'status'   => $this->faker->randomElement(['pending', 'aktif', 'selesai']),
            'periode_mulai' => $mulai->format('Y-m-d'),
            'periode_selesai' => $selesai->format('Y-m-d'),
        ];
    }
}
