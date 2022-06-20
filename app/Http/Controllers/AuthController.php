<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;
use Exception;
use App\Models\Employee;

class AuthController extends Controller
{
    // Get Employee List from Database    
    public function index(){
        $year = date('Y');
          // $kpk = Session::get('kpk');
          // $cekUser = Account::where('user_position' , $grupID)->first();
          // $userStatus = DB::table('proddev.pd_grup')->where('grp_ID',$cekUser->grp_ID)->first();
          
          return view('Order.Order' , compact('year'));
      }
}
