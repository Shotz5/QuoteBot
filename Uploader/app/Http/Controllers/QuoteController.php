<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Quote;

class QuoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Quote/Index', ['quotes' => Quote::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Quote/Upload');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        

        return redirect()->route('quote.create')
            ->with('success', 'Images were uploaded');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // ToDo
    }
}
