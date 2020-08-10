<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Todo;


class TodosController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }

    public function index()
    {
        return Todo::where('user_id', auth()->user()->id)->get();
    }

    public function show($id)
    {
        $todo = Todo::find($id);
        return response($todo, 200);
    }   

    public function store(Request $request)
    {
        $data = $this->validate($request, [
            'title' => 'required|string',
            'description' => 'string',
            'due_at' => 'date',
        ]);
        
        $todo = Todo::create([
            'user_id' => auth()->user()->id,
            'title' => $request->title,
            'description' => $request->description,
            'due_at' => $request->due_at,
        ]);
        return response($todo, 201);
    }   

    public function update(Request $request, $id)
    {
        $todo = Todo::find($id);

        if($todo->user_id !== auth()->user()->id){
            return response()->json('Unauthorized', 401);
        }
        
        $data = $this->validate($request, [
            'title' => 'string',
            'description' => 'string|nullable',
            'status' => 'string',
            'due_at' => 'date|nullable',
        ]);

        $todo->update($data);
   
        return response($todo, 200);
    }   

    public function destroy($id)
    {
        $todo = Todo::find($id);
        if($todo->user_id !== auth()->user()->id){
            return response()->json('Unauthorized', 401);
        }

        Todo::where('id', $id)->update(array('status' => 'Deleted'));

         return response("Todo Deleted", 200);
    }

    //
}
