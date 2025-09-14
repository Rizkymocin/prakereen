<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dudi>
 */
class DudiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $bidang_usaha = [
            'Teknologi Informasi',
            'Digital Marketing',
            'Software Development',
            'Hardare & Networking',
            'E-Commerce',
            'Konsultan IT',
            'Instansi Pemerintahan',
            'Toko Komputer',
        ];

        return [
            'nama_perusahaan' => $this->faker->company,
            'bidang_usaha' => fake()->randomElement($bidang_usaha),
            'kuota' => $kuota = fake()->numberBetween(1,25),
            'terisi' => fake()->numberBetween(0, $kuota),
            'alamat' => $this->faker->address,
            'telepon' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'penanggung_jawab' => $this->faker->name,
            'deskripsi' => fake()->sentence(10, true),
        ];
    }
}
