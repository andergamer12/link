<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Turista;
use App\Models\Pais;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function showLoginForm() {
        return view('login');
    }

    public function showRegisterForm() {
        $paises = Pais::all();
        return view('register', ['paises' => $paises]);
    }
    
    public function register(Request $request){
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'conf_password' => 'required|same:password',
            'dni' => 'required',
            'tel' => 'required',
            'pais' => 'required',
        ], [
            'conf_password.same' => 'Las contraseñas no coinciden',
        ]);
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        $turista = new Turista();
        $turista->id = $user->id;
        $turista->dni = $request->dni;
        $turista->tel = $request->tel;
        $turista->CodPais = $request->pais;
        $turista->save();

        Auth::login($user);
        return redirect(route('index'));
    }
    
    public function login(Request $request){
        $credentials = [
            "email" => $request->email,
            "password" => $request->password
        ];
        $remember = ($request->has('remember') ? true : false);
        if(Auth::attempt($credentials, $remember)){
            $request->session()->regenerate();
            return redirect()->intended('index');
        }else{
            return redirect()->back()->withErrors(['email' => 'Las credenciales proporcionadas no coinciden con nuestros registros.']);
        }
    }

    public function logout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect(route('login'));
    }
}
