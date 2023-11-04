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
        return inertia('Quote/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $quote = $request->validate([
            "quote" => 'required|string|max:2048',
        ]);

        Quote::create([
            'quote' => $quote["quote"],
            'posted' => 0,
        ]);

        return redirect()->route('quote.create')
            ->with('success', 'Quote was uploaded');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return inertia('Quote/Show', ['quote' => Quote::find($id)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $quote = $request->validate([
            "posted" => "boolean"
        ]);

        Quote::where('id', $id)->update( ['posted' => $quote["posted"]] );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Quote::find($id)->delete();

        return redirect()->route('quote.index')
            ->with('success', 'Quote was deleted');
    }
}
