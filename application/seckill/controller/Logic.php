<?php

namespace app\seckill\controller;

use app\seckill\model\Goods;
use think\model\Collection;

class Logic extends Common
{
    public function start($id){
        $redis = new \Redis();
        $redis->connect('localhost','6379');
        $redis->auth('1q2w3e');
        $key = 'goodsseckill'.$id;
        // if(!$redis->exists($key)){
        //     $data = Goods::find($id)->field('goods_number,status');
        //     if($data['stock']<=0||$data['status']==0){
        //         die('商品售罄');
        //     }
        //     for($i = 1;$i<=$data['stock'];$i++){
        //         $redis->rPush($key,$i);
        //     }
        // }  
              
        if(!$redis->lPop($key)){
            db('seckill_goods')->where('goods_id',$id)->setField('status','0');
            die('商品售罄');
        }
        //开启事务
        //更新订单表
        //修改库存
        //支付
    }
}
