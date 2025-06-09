<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePositionRequest;
use App\Models\Position;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $position = Position::all();

        return response()->json([
            'success' => true,
            'msg' => 'Positions retrievly successfully',
            'dataCount' => $position->count(),
            'data' => $position->load('departament')
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
    public function store(StorePositionRequest $request)
    {
        try {
            $position = Position::create($request->validated());
        } catch (\Exception $error) {
            return response()->json([
                'success' => false,
                'msg' => 'Erro ocorred while sending position',
                'error' => $error->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'msg' => 'Position sent successfully',
            'data' => $position->load('departament')
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(position $position)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(position $position)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, position $position)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(position $position)
    {
        //
    }
}
