<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class LoginController extends Controller
{

    /** 
     * Show the login page
    */
    public function login() {
        return inertia("Login");
    }

    /**
     * Handle an auth attempt
     */
    public function authenticate(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            "email" => "required|email",
            "password" => "required",
            "remember" => "required|boolean",
        ]);

        if (Auth::attempt([
            "email" => $credentials["email"],
            "password" => $credentials["password"],
        ], $credentials["remember"])) {
            $request->session()->regenerate();

            return redirect()->intended('/');
        }

        return back()->withErrors([
            "email" => "The provided credentials do not match our records.",
        ])->onlyInput("email");
    }

    /**
     * Logout
     */
    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect("/");
    }

    /**
     * Show forgot page
     */
    public function forgot()
    {
        return inertia('Forgot');
    }

    /**
     * Forgot post route
     */
    public function sendForgot(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            "email" => "required|email"
        ]);

        $status = Password::sendResetLink([ 
            "email" => $validated["email"]
        ]);

        return $status === Password::RESET_LINK_SENT
            ? back()->with('success', __($status))
            : back()->withErrors(['status' => __($status)]);
    }

    /**
     * Reset password page
     */
    public function reset(Request $request)
    {
	return inertia('Reset', [
            'token' => $request->token,
            'email' => $request->email,
        ]);
    }

    /**
     * Reset password post
     */
    public function sendReset(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            "token" => "required",
            "email" => "required|email",
            "password" => "required|min:8|confirmed"
        ]);

        $status = Password::reset([
            "email" => $validated["email"],
            "password" => $validated["password"],
            "token" => $validated["token"],
        ], function (User $user, string $password) {
            $user->forceFill([
                "password" => Hash::make($password)
            ])->setRememberToken(Str::random(60));

            $user->save();

            event(new PasswordReset($user));
        });

        return $status === Password::PASSWORD_RESET
            ? redirect()->route('login')->with("success", __($status))
            : back()->withErrors(["password" => __($status)]);
    }
}
