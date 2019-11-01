use pyg;
DROP TABLE IF EXISTS pyg_seckill_scene;
create table pyg_seckill_scene(
    id bigint unsigned PRIMARY key auto_increment,
    start_time int unsigned not null comment '开始时间',
    end_time int unsigned not null comment '结束时间',
    create_time int unsigned not null comment '结束时间',
    status enum('0','1','2') not null DEFAULT '0' comment '状态：0未开始，1进行中，2已结束',
    KEY(start_time),
    KEY(end_time)
)ENGINE=innodb DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS pyg_seckill_goods;
create table pyg_seckill_goods(
    id int unsigned PRIMARY key auto_increment,
    seckill_id bigint unsigned not null,
    goods_id int unsigned not null,
    user_id int unsigned not null,
    status enum('0','1','2','3') not null default '0' comment '0无效,1秒杀成功未付款,2已付款,3取消订单4退款',
    create_time int unsigned not null
   
)ENGINE=innodb DEFAULT CHARSET=utf8mb4;
