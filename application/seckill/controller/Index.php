<?php
namespace app\seckill\controller;

use app\seckill\model\Scene;
use app\seckill\model\SeckillGoods;
use think\model\Collection;

class Index extends Common
{
    public function index()
    { 
       $data =  SeckillGoods::with('goods')->select();
       $data = (new Collection($data))->toArray();
       $scene = db('seckill_scene')->where('status','<>',2)->select();
       $arr = [];
       foreach($data as $v){
        $arr[$v['seckill_id']] = $v;
       }
      // dump($scene);die;
       $this->assign(compact('data','scene'));
       return view();
    }

}
