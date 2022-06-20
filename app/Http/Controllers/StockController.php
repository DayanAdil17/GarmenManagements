<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;
use Exception;
use App\Models\Employee;

class StockController extends Controller
{
    // Get Employee List from Database
    public function getEmployeeList(){
        try{
            $employees = Employee::orderBy('id', 'DESC')->get();
            return response()->json($employees);
        }catch(Exception $e){
            Log::error($e);
        }
    }
    public function index(){
        $year = date('Y');
          // $kpk = Session::get('kpk');
          // $cekUser = Account::where('user_position' , $grupID)->first();
          // $userStatus = DB::table('proddev.pd_grup')->where('grp_ID',$cekUser->grp_ID)->first();
          
          return view('Stock.Stock' , compact('year'));
      }
}
