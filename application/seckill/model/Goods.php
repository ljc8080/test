<?php

namespace app\seckill\model;

use think\Model;
class Goods extends Model
{
    public function specgoods(){
        return $this->hasMany('spec_goods','goods_id','id');
    }
}
