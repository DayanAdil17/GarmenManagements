<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Log;
use Exception;
use App\Models\Employee;

class OrderController extends Controller
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
        $user = DB::table('gmp_user')->get();
        $orderList = DB::table('gm_order')->get();
        $orderCustomer = DB::table('gm_customer')->get();
        $orderCombined = DB::table('gm_customer')->join('gm_order', 'gm_customer.order_orid', '=', 'gm_order.order_orid')->select(
            'gm_customer.cs_id', 'gm_customer.order_orid', 'gm_customer.cs_name', 'gm_customer.cs_number', 'gm_customer.cs_email',
            'gm_customer.cs_address', 'gm_order.order_id', 'gm_order.order_ordate', 'gm_order.order_ortype', 'gm_order.order_intype',
            'gm_order.order_toitem', 'gm_order.order_iprice', 'gm_order.order_tprice', 'gm_order.order_finest', 'gm_order.order_dp1',
            'gm_order.order_dp1', 'gm_order.order_dp2', 'gm_order.order_dupay'
        )->get();
          // $kpk = Session::get('kpk');
          // $cekUser = Account::where('user_position' , $grupID)->first();
          // $userStatus = DB::table('proddev.pd_grup')->where('grp_ID',$cekUser->grp_ID)->first();
          
          return view('Order.Order' , compact('year', 'user', 'orderList', 'orderCustomer', 'orderCombined'));
    }
    public function addOrder(Request $request){
        $orderDate = $request -> orderDate;
        $order_orid = $request -> order_orid;
        $customerName = $request -> customerName;
        $customerNumber = $request -> customerNumber;
        $customerEmail = $request -> customerEmail;
        $customerAddress = $request -> customerAddress;
        $orderType = $request -> orderType;
        $orderIngredient = $request -> orderIngredient;
        $totalItem = $request -> totalItem;
        $totalPrice = $request -> totalPrice;
        $finishEstimation = $request -> finishEstimation;
        $pricePerItem = $request -> pricePerItem;
        $dp1 = $request -> dp1;
        $dp2 =$request -> dp2;
        $paymentDue = $request -> paymentDue;

        DB::insert('insert into gm_order (order_ordate, order_orid, order_csname, order_csnumb, order_csemail, order_csaddr, order_ortype, order_intype, order_toitem, order_iprice,
        order_tprice, order_finest, order_dp1, order_dp2, order_dupay) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [$orderDate, $order_orid, $customerName, $customerNumber, $customerEmail, $customerAddress, $orderType, $orderIngredient, $totalItem, $pricePerItem, $totalPrice, $finishEstimation,
        $dp1, $dp2, $paymentDue]);
    }
    public function saveOrder(Request $request){
        $orderDate = $request -> orderDate;
        $id = $request -> id;
        $finest = $request -> finest;
        $order_orid = $request -> order_orid;
        $order_ordate = $request -> order_ordate;
        $customerName = $request -> customerName;
        $customerNumber = $request -> customerNumber;
        $customerEmail = $request -> customerEmail;
        $customerAddress = $request -> customerAddress;
        $orderType = $request -> orderType;
        $orderIngredient = $request -> orderIngredient;
        $totalItem = $request -> totalItem;
        $totalSub = $request -> totalSub;
        $totalPrice = $request -> totalPrice;
        $tprice = $request -> tprice;
        $finishEstimation = $request -> finishEstimation;
        $pricePerItem = $request -> pricePerItem;
        $dp1 = $request -> dp1;
        $thedp1 = $request -> thedp1;
        $dp2 =$request -> dp2;
        $thedp2 =$request -> thedp2;
        $paymentDue = $request -> paymentDue;
        $dupay = $request -> dupay;

        DB::insert('insert into gm_customer (order_orid, cs_name, cs_number, cs_email, cs_address, order_tprice, order_dp1, order_dp2, order_dupay, order_finest)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [$id, $customerName, $customerNumber, $customerEmail, $customerAddress, $tprice, $thedp1, $thedp2, $dupay, $finest]);

        // DB::insert('insert into gm_order (order_ordate, order_orid, order_csname, order_csnumb, order_csemail, order_csaddr, order_ortype, order_intype, order_toitem, order_iprice,
        // order_tprice, order_finest, order_dp1, order_dp2, order_dupay) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        // [$orderDate, $order_orid, $customerName, $customerNumber, $customerEmail, $customerAddress, $orderType, $orderIngredient, $totalItem, $pricePerItem, $totalPrice, $finishEstimation,
        // $dp1, $dp2, $paymentDue]);
        for ($i=0; $i < count($order_orid); $i++) { 
            DB::insert('insert into gm_order (order_orid, order_ordate, order_ortype, order_intype,
             order_toitem, order_iprice, order_sprice, order_tprice, order_finest, order_dp1, order_dp2, order_dupay)
            values (?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?)', [$order_orid[$i],
             $order_ordate[$i],
              $orderType[$i], 
            $orderIngredient[$i], $totalItem[$i], $pricePerItem[$i], $totalSub[$i],$totalPrice[$i], $finishEstimation[$i],
            $dp1[$i], $dp2[$i], $paymentDue[$i] ]);
            # code...
        }
    }
    public function updateDp2(Request $request){
        $id = $request -> id;
        $dp1 = $request -> dp1;
        $dp2 = $request -> dp2;
        $paymentDue = $request -> paymentDue;

        DB::table('gm_order')->where('order_orid', $id)->update(['order_dp1'=>$dp1, 'order_dp2'=>$dp2, 'order_dupay'=>$paymentDue]);
        DB::table('gm_customer')->where('order_orid', $id)->update(['order_dp1' => $dp1, 'order_dp2'=>$dp2, 'order_dupay'=>$paymentDue]);
    }
    public function deleteOrder(Request $request){
        $id = $request -> id;
        
        DB::table('gm_order')->where('order_orid', $id)->delete();
        DB::table('gm_customer')->where('order_orid', $id)->delete();
    }
    public function editOrder(Request $request){
        $id = $request -> id;
        $orderDate = $request -> orderDate;
        $customerName = $request -> customerName;
        $customerNumber = $request -> customerNumber;
        $customerEmail = $request -> customerEmail;
        $customerAddress = $request -> customerAddress;
        $orderType = $request -> orderType;
        $orderIngredient = $request -> orderIngredient;
        $totalItem = $request -> totalItem;
        $totalPrice = $request -> totalPrice;
        $finishEstimation = $request -> finishEstimation;
        $pricePerItem = $request -> pricePerItem;        
        $dp1 = $request -> dp1;
        $dp2 = $request -> dp2;
        $paymentDue = $request -> paymentDue;        

        DB::table('gm_order')->where('order_orid', $id)->update(['order_ordate' => $orderDate, 'order_csname' => $customerName,
        'order_csnumb' => $customerNumber,'order_csemail' => $customerEmail,'order_csaddr' => $customerAddress,
        'order_ortype' => $orderType, 'order_intype' => $orderIngredient, 'order_toitem' => $totalItem, 
        'order_iprice' => $pricePerItem, 'order_tprice' => $totalPrice, 'order_finest' => $finishEstimation, 
        'order_dp1'=>$dp1, 'order_dp2'=>$dp2, 'order_dupay'=>$paymentDue]);
    }
    public function editOrders(Request $request){
        $id = $request -> id;       
        $idd = $request -> idd;       
        $orderType = $request -> orderType;
        $orderIngredient = $request -> orderIngredient;
        $totalItem = $request -> totalItem;
        $subtotal = $request -> subtotal;
        $totalPrice = $request -> totalPrice;        
        $pricePerItem = $request -> pricePerItem;             
        $paymentDue = $request -> paymentDue;        

        DB::table('gm_order')->where('order_id', $id)->update([
        'order_ortype' => $orderType, 'order_intype' => $orderIngredient, 'order_toitem' => $totalItem, 
        'order_iprice' => $pricePerItem, 'order_tprice' => $totalPrice, 'order_sprice' => $subtotal,
        'order_dupay'=>$paymentDue]);
        DB::table('gm_order')->where('order_orid', $idd)->update([
             'order_tprice' => $totalPrice,
            'order_dupay'=>$paymentDue]);
        DB::table('gm_customer')->where('order_orid', $idd)->update([
            'order_tprice' => $totalPrice,
            'order_dupay'=>$paymentDue]);
    }
}
