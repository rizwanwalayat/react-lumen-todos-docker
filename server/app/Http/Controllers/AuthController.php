<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;



class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $this->validate($request, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);
        
        // return $data;
        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    }

    public function user()
    {
        return response()->json(auth()->user(), 200);
    }

    public function logout()
    {
        auth()->user()->tokens->each(function ($token, $key){
            $token->revoke();
        });

        return response()->json('Logged out successfully', 200);
    }
}
