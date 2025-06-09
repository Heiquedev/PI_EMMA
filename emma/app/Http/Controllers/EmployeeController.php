<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEmployeeRequest;
use App\Models\employee;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employee = Employee::all();

        return response()->json([
            'success' => true,
            'msg' => 'Employees retrievly successfully',
            'dataCount' => $employee->count(),
            'data' => $employee->load('tag', 'position')
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        try {
            $employee = Employee::create($request->validated());
        } catch (\Exception $error) {
            return response()->json([
                'success' => false,
                'msg' => 'Erro ocorred while sending employee',
                'error' => $error->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'msg' => 'Employee sent successfully',
            'data' => $employee->load('position')
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(employee $employee)
    {
        //
    }
}
