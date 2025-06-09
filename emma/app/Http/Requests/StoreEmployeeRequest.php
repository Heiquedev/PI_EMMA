<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEmployeeRequest extends FormRequest
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
            'first_name' => ['required', 'string', 'max:50'],
            'last_name' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'max:255', 'unique:employees,email'],
            'cpf' => ['required', 'string', 'max:15'],
            'city' => ['nullable', 'string', 'max:50'],
            'birth_date' => ['required', 'date', 'before:today'],
            'hire_date' => ['required', 'date', 'before_or_equals:today'],
            'phone' => ['nullable', 'string', 'max:20', 'regex:/^\+?[0-9\s\-()]+$/'],
            'status' => ['required', Rule::in(['active', 'inactive', 'suspended'])],
            'position_id' => ['required', Rule::exists('positions', 'id')],
        ];
    }

    public function messages()
    {
        return [
            'first_name.required' => 'First name is required',
            'last_name.required' => 'Last name is required',
            'email.required' => 'E-mail is required',
            'email.email' => 'Please enter a valid email address',
            'email.unique' => 'This email is already registered',
            'phone.regex' => 'The phone number must contain only numbers, spaces, "+" and dashes',
            'birth_date.before' => 'Date of birth must be before today',
            'position_id.required' => 'Position is required',
            'position_id.exists' => 'The selected position does not exist',
            'hired_at.before_or_equal' => 'The hiring date cannot be in the future',
            'status.in' => 'The status must be: active, inactive or suspended',
        ];
    }
}
