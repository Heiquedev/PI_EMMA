<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tag extends Model
{
    use HasFactory;

    protected $fillable = ['employee_id', 'color', 'content'];

    public function employee() 
    {
        return $this->belongsTo(Employee::class);
    }
}
