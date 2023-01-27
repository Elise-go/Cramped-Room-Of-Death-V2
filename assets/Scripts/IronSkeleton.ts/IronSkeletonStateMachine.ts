
import { _decorator, Animation } from 'cc';
import { EntityManager } from '../../Base/EntityManager';
import { getInitParamsNumber, getInitParamsTrigger, StateMachine } from '../../Base/StateMachine';
import { ENTITY_STATE_ENUM, PARAMS_NAME_ENUM } from '../../Enums';
import DeathSubStateMachine from './DeathSubStateMachine';
import IdleSubStateMachine from './IdleSubStateMachine';


const { ccclass, property } = _decorator;


@ccclass('IronSkeletonStateMachine')
export class IronSkeletonStateMachine extends StateMachine {

    async init() { 
        this.animationComponent = this.node.addComponent(Animation);
        this.initParams();
        this.initStateMachines();
        await Promise.all(this.waitingList);
    }

    initParams() {
        this.params.set(PARAMS_NAME_ENUM.DIRECTION, getInitParamsNumber());
        this.params.set(PARAMS_NAME_ENUM.IDLE, getInitParamsTrigger());
        this.params.set(PARAMS_NAME_ENUM.DEATH, getInitParamsTrigger());
        
    }

    initStateMachines() {
        this.stateMachines.set(PARAMS_NAME_ENUM.IDLE, new IdleSubStateMachine(this));
        this.stateMachines.set(PARAMS_NAME_ENUM.DEATH, new DeathSubStateMachine(this));        
    }

    run() {
        switch (this.currentState) {     
            case this.stateMachines.get(PARAMS_NAME_ENUM.IDLE):
            case this.stateMachines.get(PARAMS_NAME_ENUM.DEATH):

                if (this.params.get(PARAMS_NAME_ENUM.IDLE).value) {
                    this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE); 
                }else if(this.params.get(PARAMS_NAME_ENUM.DEATH).value){
                    this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.DEATH);
                }else{
                    // 当不需要通过改变state来改变direction时，
                    // 转换不同dirction时（此时 Trigger都为 false），需要此句去触发run()函数
                    this.currentState = this.currentState;
                }
                break;
            default:
                this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE);
        }
    }

    

}




