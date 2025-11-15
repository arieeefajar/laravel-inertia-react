<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index()
    {
        $todos = Todo::latest()->paginate(2);
        return Inertia::render('Todo', [
            'todos' => $todos
        ]);
    }

    public function store(Request $request)
    {
        $data  = $request->validate([
            'name' => 'required',
            'is_complete' => 'boolean'
        ], [
            'name.required' => 'Nama todo harus diisi',
        ]);

        Todo::create($data);

        return back()->with('message', 'Todo berhasil disimpan');
    }
}
