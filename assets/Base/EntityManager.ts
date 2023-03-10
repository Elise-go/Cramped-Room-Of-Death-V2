

import { _decorator, Component, Sprite, UITransform } from 'cc';
import { DIRECTION_ENUM, DIRECTION_ORDER_ENUM, ENTITY_STATE_ENUM, ENTITY_TYPE_ENUM, PARAMS_NAME_ENUM } from '../Enums';
import { IEntity } from '../Levels';
import { randomByLen } from '../Utils';
import { TILE_HEIGHT, TILE_WIDTH } from '../Scripts/Tile/TileManager';
import { StateMachine } from './StateMachine';

const { ccclass, property } = _decorator;


@ccclass('EntityManager')
export class EntityManager extends Component {
    id: string = randomByLen(12);
    fsm!: StateMachine; //具体值待定

    x: number = 0
    y: number = 0
    type!: ENTITY_TYPE_ENUM;
    private _direction!: DIRECTION_ENUM;
    private _state!: ENTITY_STATE_ENUM


    get direction() {
        return this._direction;
    }

    set direction(newDirection: DIRECTION_ENUM) {
        this._direction = newDirection;
        this.fsm.setParamsValue(PARAMS_NAME_ENUM.DIRECTION, DIRECTION_ORDER_ENUM[this._direction]);
    }

    get state() {
        return this._state;
    }

    set state(newState: ENTITY_STATE_ENUM) { // UI-数据分离
        this._state = newState;
        this.fsm.run(this._state);
    }

    init(params: IEntity) {
        // 添加 Sprite组件并设置节点尺寸
        const sprite = this.node.addComponent(Sprite);
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        const transform = this.node.getComponent(UITransform);
        transform!.setContentSize(TILE_WIDTH * 4, TILE_HEIGHT * 4);

        this.x = params.x;
        this.y = params.y;
        this.direction = params.direction;//注意顺序：先给direction赋值后，再给state赋值
        this.state = params.state;
        this.type = params.type;

    }

    update() {
        // 每横向/纵向移动一个单位即移动一个瓦片的宽度/高度
        // setPosition 的作用是将虚拟坐标映射到 Map上的实际坐标
        // !!!注意: 为了Entity在地图里的纵坐标为正，这里的纵坐标取相反值
        this.node.setPosition(this.x * TILE_WIDTH - 1.5 * TILE_WIDTH, - this.y * TILE_HEIGHT + 1.5 * TILE_HEIGHT);

    }

    onDestroy() { }
} 