<?php

namespace Database\Factories;

use App\Models\Jurusan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kelas>
 */
class KelasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tingkat' => fake()->randomElement(['X','XI','XII']),
            'jurusan_id' => Jurusan::inRandomOrder()->first()?->id ?? Jurusan::factory(),
            'rombel' => fake()->numberBetween(1,4),
        ];
    }
}
