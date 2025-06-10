<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDocumentRequest extends FormRequest
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
            'employee_id' => ['required', Rule::exists('employees', 'id')],
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:255'],
            'path' => ['required', 'string']
        ];
    }

    public function messages()
    {
        return [
            'employee_id.required' => 'The document needs to be linked to an employee',
            'name.required' => 'Name is required',
            'name.max:255' => 'Max length: 255',
            'type.required' => 'Type is required',
            'type.max:255' => 'Max length: 255',
            'path.required' => 'Path is required'
        ];
    }
}
