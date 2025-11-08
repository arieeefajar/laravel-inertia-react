<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index()
    {
        return Inertia::render('Todo');
    }

    public function store(Request $request)
    {
        $data  = $request->validate([
            'name' => 'required',
            'is_complete' => 'boolean'
        ]);

        Todo::create($data);

        return back()->with('message', 'Todo berhasil disimpan');
    }
}
