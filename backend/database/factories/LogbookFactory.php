<?php

namespace Database\Factories;

use App\Models\Magang;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Logbook>
 */
class LogbookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'magang_id' => Magang::inRandomOrder()->first()?->id ?? Magang::factory(), // Set in Magang seeder
            'tanggal' => $this->faker->dateTimeBetween('-1 months', 'now')->format('Y-m-d'),
            'kegiatan' => $this->faker->sentence(9),
            'status_verifikasi' => $this->faker->randomElement(['pending', 'disetujui', 'ditolak']),
            'kendala' => $this->faker->sentence(10),
            'catatan_guru' => $this->faker->optional()->sentence(),
            'catatan_dudi' => $this->faker->optional()->sentence(),
        ];
    }
}
