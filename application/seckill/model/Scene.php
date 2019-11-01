<?php

namespace app\seckill\model;

use think\Model;

class Scene extends Model
{
    protected $table = 'pyg_seckill_scene';

    public function scene(){
        return $this->hasMany('seckill_goods','seckill_id','id');
    }
}
