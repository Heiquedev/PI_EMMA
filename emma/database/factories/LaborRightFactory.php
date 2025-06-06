<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LaborRight>
 */
class LaborRightFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employee_id' => Employee::factory(),
            'fgts' => true,
            'inss' => true,
            'decimo_terceiro' => true,
            'ferias' => true,
            'vale_transporte' => $this->faker->boolean,
            'vale_refeicao' => $this->faker->boolean,
            'vale_alimentacao' => $this->faker->boolean,
            'observacoes' => $this->faker->optional()->sentence,
        ];
    }
}
