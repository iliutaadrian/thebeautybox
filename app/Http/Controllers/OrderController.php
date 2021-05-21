<?php

namespace Colorize\Http\Controllers;

use Colorize\Order;
use Colorize\Post;
use Colorize\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller
{
    public function get(){
        $orders = Order::all();

        foreach ($orders as $order) {
            $order['product'] = Post::where('id', $order->product_id)->first();
            $order['user'] = User::where('id', $order->user_id)->first();
        }

        return response()->json($orders);
    }

    public function find($id){
        return response()->json(Order::where('id', '=', $id)->get());
    }

    public function create(Request $request){
        $request->validate([
            'user_id' => 'required|integer',
            'product_id' => 'required|integer'
        ]);

        $obj = new Order([
            'user_id' => $request->user_id,
            'product_id' => $request->product_id,
            'status' => 0
        ]);

        $obj->save();

        return response()->json([
            'message' => 'Order added!',
            'id' => $obj->id
        ]);
    }

    public function delete($id){
        $user = Order::where('id', $id)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Order not found!'
            ], 404);
        }

        $user->delete();

        return response()->json(
            ['message'=>'Order deleted']
        );
    }

    public function status(Request $request){
        $post = Order::find($request['id']);
        $post->status = $request['status'];
        $post->save();

        return response()->json('Status changed!');
    }
}
