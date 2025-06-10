<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAbsenceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_id' => ['required', 'string'],
            'date' => ['required', 'date'],
            'reason' => ['required', 'string', 'max:255'],
            'observation' => ['nullable', 'string']
        ];
    }

    public function messages()
    {
        return [
            'employee_id.required' => 'Absence needs to be linked to an employee',
            'date.required' => 'Date is required',
            'reason.required' => 'Reason is required',
            'reason.max:255' => 'Max length: 255'
        ];
    }
}
