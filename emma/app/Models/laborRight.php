<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LaborRight extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'fgts',
        'inss',
        'decimo_terceiro',
        'ferias',
        'vale_transporte',
        'vale_refeicao',
        'vale_alimentacao',
        'observacoes',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}