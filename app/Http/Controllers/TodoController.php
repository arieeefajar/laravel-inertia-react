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

    public function edit(Todo $todo)
    {
        return Inertia::render('Edit', [
            'todo' => $todo
        ]);
    }

    public function update(Request $request, Todo $todo)
    {
        $data = $request->validate([
            'name' => 'required'
        ]);

        $todo->update($data);

        return redirect()->route('todo.index')->with('message', 'Todo berhasil diupdate');
    }

    public function updateComplete(Request $request, Todo $todo)
    {
        $data = $request->validate([
            'is_completed' => 'boolean'
        ]);

        $todo->update($data);

        return redirect()->back()->with('message', 'Todo berhasil diupdate');
    }
}
