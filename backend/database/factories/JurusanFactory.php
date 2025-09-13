<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Jurusan>
 */
class JurusanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'jurusan' => fake()->unique()->randomElement(['Akuntansi','Perkantoran','Rekayasa Perangkat Lunak','Desain Komunikasi Visual','Teknik Komputer Jaringan']),
            'nama_kajur' => fake()->name(),
        ];
    }
}
