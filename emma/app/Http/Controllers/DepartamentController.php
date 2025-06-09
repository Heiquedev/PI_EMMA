<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDepartamentRequest;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartamentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departament = Department::all();

        return response()->json([
            'success' => true,
            'msg' => 'Employees retrievly successfully',
            'dataCount' => $departament->count(),
            'data' => $departament->load('position')
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
    public function store(StoreDepartamentRequest $request)
    {
        try {
            $departament = Department::create($request->validated());
        } catch (\Exception $error) {
            return response()->json([
                'success' => false,
                'msg' => 'Error ocorred while sending departament',
                'error' => $error->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'msg' => 'Departament sent successfully',
            'data' => $departament
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $departament)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $departament)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreDepartamentRequest $request, string $id)
    {
        try {
            $departament = Department::findOrFail($id);
            $departament->update($request->all());
        } catch (\Exception $error) {
            return response()->json([
                'success' => false,
                'msg' => 'Error ocorred while updating departament',
                'error' => $error->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'msg' => 'Departament updated successfully',
            'data' => $departament
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $departament = Department::findOrFail($id);
            $departament->delete();
        } catch (\Exception $error) {
            return response()->json([
                'success' => false,
                'msg' => 'Error while deleting departament'
            ]);
        }

        return response()->json([
            'success' => false,
            'msg' => 'Departament deleted successfully',
        ]);
    }
}
