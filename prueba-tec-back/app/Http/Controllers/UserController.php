<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\IdentificationType;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all('id', 'name', 'last_name', 'username', 'identification', 'birth_date', 'type_identification_id');
        foreach ($users as $user) {
            $user->type_identification_id = IdentificationType::find($user->type_identification_id);
        }
        return $users;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        try {

            $validate =  User::where('identification', $request['identification'])->get();
            if (empty($validate)) {
                return ("Numero de identificación existente, verificar la iformación");
            } else {
                $user = new User();
                $password = Hash::make($request['password']);
                $date = new \DateTime($request['birth_date']);

                $user->name = $request['name'];
                $user->last_name = $request['last_name'];
                $user->type_identification_id = $request['type_identification_id'];
                $user->identification = $request['identification'];
                $user->birth_date = $date;
                $user->username = $request['username'];
                $user->password = $password;
                $user->save();

                return $user;
            }
        } catch (\Exception $e) {
            return ($e);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->type_identification_id = IdentificationType::find($user->type_identification_id);
            return $user;
        } catch (\Exception $e) {
            return ('Ocurrió un error al consular el usuario');
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        try {
            $user = User::find($id);
            $password = Hash::make($request['password']);
            //$date = new \DateTime($request['birth_date']);

            $user->name = $request['name'];
            $user->last_name = $request['last_name'];
            $user->type_identification_id = $request['type_identification_id'];
            $user->identification = $request['identification'];
            $user->birth_date = $request['birth_date'];
            $user->username = $request['username'];
            $user->password = $password;
            $user->save();

            return $user;
        } catch (\Exception $e) {
            return ($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::destroy($id);
        return $user;
    }

    public function login(Request $request)
    {

        $usuario =  User::where('username', $request['username'])->get();
        if (!empty($usuario)) {
            if (Hash::check($request['password'], $usuario[0]->password)) {

                $apiToken = Str::random(50);
                $usuario[0]->token = $apiToken;
                $data = $usuario[0];
                return $data;
            } else {
                return ("Contraseña incorrecta, verificar la iformación");
            }
        } else {
            return ("Usuario incorrecto, verificar la iformación");
        }
    }
}
