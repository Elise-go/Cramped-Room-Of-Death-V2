
import { _decorator, Animation } from 'cc';
import { EntityManager } from '../../Base/EntityManager';
import State from '../../Base/State';
import { getInitParamsTrigger, StateMachine } from '../../Base/StateMachine';
import { ENTITY_STATE_ENUM, PARAMS_NAME_ENUM } from '../../Enums';


const { ccclass, property } = _decorator;
const BASE_URL = 'texture/burst';

@ccclass('BurstStateMachine')
export class BurstStateMachine extends StateMachine {

    async init() { 
        this.animationComponent = this.node.addComponent(Animation);
        this.initParams();
        this.initStateMachines();
        await Promise.all(this.waitingList);
    }

    initParams() {
        this.params.set(PARAMS_NAME_ENUM.IDLE, getInitParamsTrigger());
        this.params.set(PARAMS_NAME_ENUM.ATTACK, getInitParamsTrigger());
        this.params.set(PARAMS_NAME_ENUM.DEATH, getInitParamsTrigger());
        
    }

    initStateMachines() {
        this.stateMachines.set(PARAMS_NAME_ENUM.IDLE, new State(this, `${BASE_URL}/idle`));
        this.stateMachines.set(PARAMS_NAME_ENUM.ATTACK, new State(this, `${BASE_URL}/attack`)); 
        this.stateMachines.set(PARAMS_NAME_ENUM.DEATH, new State(this, `${BASE_URL}/death`));        
    }


    run() {
        switch (this.currentState) {     
            case this.stateMachines.get(PARAMS_NAME_ENUM.IDLE):
            case this.stateMachines.get(PARAMS_NAME_ENUM.ATTACK):
            case this.stateMachines.get(PARAMS_NAME_ENUM.DEATH):

                if (this.params.get(PARAMS_NAME_ENUM.IDLE).value) {
                    this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE); 
                }else if(this.params.get(PARAMS_NAME_ENUM.ATTACK).value){
                    this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.ATTACK);
                }else if(this.params.get(PARAMS_NAME_ENUM.DEATH).value){
                    this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.DEATH);
                }
                break;
            default:
                this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE);
        }
    }

    

}



