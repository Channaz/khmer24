<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Trait\CustomFunction;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    use CustomFunction;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // 1. Validate the incoming request data.
            // Using a more specific ValidationException catch for better error handling.
            $validatedData = $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'phone_number' => 'required|string|min:10|max:12', // Changed to string as phone numbers can start with 0
                'email' => 'nullable|string|email|max:255|unique:tbl_user', // Assumed conventional table name
                'password' => 'required|string|min:6',
            ]);
        } catch (ValidationException $e) {
            // Return validation errors with a 422 Unprocessable Entity status code.
            // The `errors()` method on the exception provides the specific validation failures.
            return response()->json([
                'error' => 'Validation failed',
                'details' => $e->errors()
            ], 422);
        }

        // 2. Hash the password securely using Laravel's built-in Hash facade.
        // This is the most critical security improvement.
        $hashedPhoneNumber = $this->hash($validatedData['phone_number'], true);
        $hashedPassword = $this->hash($validatedData['password'], false);

        // 3. Create the user using the validated data and the secure hashed password.
        // We do not hash the phone number as it is not a secret.
        $user = User::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'phone_number' => $hashedPhoneNumber,
            'email' => $validatedData['email'] ?? null,
            'password' => $hashedPassword,
            'auth_token' => md5(md5(md5($validatedData['phone_number'] . $validatedData['password']))), // Simple token generation
        ]);

        // 4. Return the newly created user as a JSON response with a 201 Created status code.
        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $user = User::findOrFail($id);
        return response()->json($user);
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
        //
    }
}
