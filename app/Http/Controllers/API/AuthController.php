<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Trait\FuncAssets;
use Illuminate\Http\Request;
use App\Trait\CustomFunction;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    //
    use FuncAssets;
    public function login(Request $request, Response $response)
    {
        // $auth_token = $request->cookie('AUTH-TOKEN');
        $auth_token = CustomFunction::getCookie($request, 'AUTH-TOKEN');

        $user = User::where('auth_token', $auth_token)
            ->first();
        if ($user) {
            return response([
                'message' => 'អ្នកបានចូលក្នុងប្រព័ន្ធដោយជោគជ័យ។',
                'user' => $user
            ])->setStatusCode(200);
        }

        $request->validate([
            'phone_number' => 'required',
            'password' => 'required',
        ]);

        $phoneHash = $this->customHash($request->phone_number, true);
        $passwordHash = $this->customHash($request->password, false);

        $user = User::where('phone_number', $phoneHash)->first();
        // dd($user);
        if (!$user) {
            throw ValidationException::withMessages([
                'message' => 'លេខទូរស័ព្ទគ្មានក្នុងប្រព័ន្ធ។',
            ]);
        }

        if ($user->is_active === 0) {
            throw ValidationException::withMessages([
                'message' => 'គណនីប្រើប្រាស់ត្រូវបានបិទ។',
            ]);
        }

        if ($user->password !== $passwordHash) {
            throw ValidationException::withMessages([
                'message' => 'ពាក្យសម្ងាត់មិនត្រឹមត្រូវ។',
            ]);
        }

        // Always create a remember token for the user (forever)
        $token = md5(md5(md5($phoneHash . $passwordHash . time())));
        $expiry = 60 * 60 * 24 * 365 * 10; // 10 years (effectively forever)

        // Update user's remember token and expiry
        $user->rem_token = $token;
        $user->rem_expiry = $expiry + time();
        $user->save();

        // Set the remember token cookie with very long expiry
        // CustomFunction::setCookie($response, 'REM-TOKEN', $user->rem_token, $expiry / 60, '/');

        CustomFunction::setCookie($response, 'AUTH-TOKEN', $user->auth_token, $expiry / 60, '/');
        return $response->setContent([
            'message' => 'អ្នកបានចូលក្នុងប្រព័ន្ធដោយជោគជ័យ។',
            'user' => $user,
        ])->setStatusCode(200);
    }

    public function logout()
    {
        return response(['message' => 'អ្នកបានចេញពីប្រព័ន្ធដោយជោគជ័យ។'])
            ->cookie('REM-TOKEN', 'deleted', -1, '/')
            ->cookie('AUTH-TOKEN', 'deleted', -1, '/');
    }

    public function verify(Request $request, Response $response)
    {
        // $auth_token = $request->cookie('AUTH-TOKEN');
        $auth_token = CustomFunction::getCookie($request, 'AUTH-TOKEN');
        $user = User::where('auth_token', $auth_token)
            ->first();
        if ($user) {
            return response(
                [
                    'message' => 'អ្នកបានចូលក្នុងប្រព័ន្ធដោយជោគជ័យ។',
                ],
                200,
            );
        }
        $rem_token = $request->cookie('REM-TOKEN');
        $auth_token_expiry = CustomFunction::getCookie($request, 'AUTH-TOKEN');
        $user = User::where('auth_token', $auth_token_expiry)
            ->first();
        if ($user && $user->rem_token != null && $user->rem_expiry != null && $user->rem_expiry - time() > 0) {
            // return response(
            //     [
            //         'message' => 'អ្នកបានចូលក្នុងប្រព័ន្ធដោយជោគជ័យ។',
            //         'user' => $user->makeVisible(['act_status', 'acc_status']),
            //     ],
            //     200,
            // )->cookie('AUTH-TOKEN', $user->auth_token, 0, '/');

            CustomFunction::setCookie($response, 'AUTH-TOKEN', $user->auth_token, 0, '/');
            return $response->setContent([
                'message' => 'អ្នកបានចូលក្នុងប្រព័ន្ធដោយជោគជ័យ។',
                'user' => $user,
            ])->setStatusCode(200);
        }
        return response(['error' => 'អ្នកគ្មានសិទ្ធក្នុងការចូលក្នុងប្រព័ន្ធទេ។'], 401);
    }
}
