<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = \App\Models\User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole('siswa');

        Siswa::create([
            'user_id' => $user->id,
            'nama' => $user->name,
            'nis' => '',
            'kelas' => '',
            'jurusan' => '',
            'alamat' => '',
            'telepon' => '',
        ]);


        return response()->json([
            'status' => true,
            'message' => 'User registered successfully',
            'data' => $user
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = \App\Models\User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => false,
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        $role = $user->getRoleNames()[0];
        return response()->json([
            'status' => true,
            'message' => 'User logged in successfully',
            'access_token' => $token,
            'user' => $user,
            'role' => $role,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => true,
            'message' => 'User logged out successfully'
        ]);
    }

    public function verifyToken(Request $request){
        $user = $request->user()->currentAccessToken();
        if(!$user){
            return response()->json([
                'status' => false,
                'message' => 'Token tidak valid',
            ], 401);
        }

        return response()->json([
            'status' => true,
            'message' => 'Token Valid'
        ]);
    }
}
