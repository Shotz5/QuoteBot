<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Image;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Image/Index', ['images' => Image::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Image/Upload');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $images = $request->validate([
            "images" => 'required|array',
            "images.*" => 'image',
        ]);

        foreach ($images["images"] as $image) {
            $path = Storage::put('public/images', $image);

            Image::create([
                'name' => basename($path),
                'posted' => 0,
            ]);
        }

        return redirect()->route('image.create')
            ->with('success', 'Images were uploaded');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return inertia('Image/Show', ['image' => Image::find($id)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $image = $request->validate([
            "posted" => "boolean"
        ]);

        Image::where('id', $id)->update( ['posted' => $image["posted"]] );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Image::find($id)->delete();

        return redirect()->route('image.index')
            ->with('success', 'Image was deleted');
    }
}
