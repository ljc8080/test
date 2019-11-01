<?php

namespace app\seckill\model;

use think\Model;

class SeckillGoods extends Model
{
    protected $table = 'pyg_seckill_goods';

    public function goods(){
        return $this->hasMany('goods','id','goods_id');
    }
}
