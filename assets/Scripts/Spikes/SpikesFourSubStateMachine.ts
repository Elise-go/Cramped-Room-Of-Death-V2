
import State from "../../Base/State";
import { StateMachine } from "../../Base/StateMachine";
import { PARAMS_NAME_ENUM, SPIKES_SHOW_ORDER_ENUM, SPRIKES_ORDER_MAP_NUMBER_ENUM } from "../../Enums";
import SpritesSubStateMachine from "./SpikesSubStateMachine";

const BASE_URL = 'texture/spikes/spikesfour'

export default class SpikesFourSubStateMachine extends SpritesSubStateMachine {

    constructor(fsm:StateMachine){ 
      
        super(fsm);
        this.stateMachines.set(SPIKES_SHOW_ORDER_ENUM.ZERO, new State(fsm, `${BASE_URL}/zero`));
        this.stateMachines.set(SPIKES_SHOW_ORDER_ENUM.ONE, new State(fsm, `${BASE_URL}/one`));
        this.stateMachines.set(SPIKES_SHOW_ORDER_ENUM.TWO, new State(fsm, `${BASE_URL}/two`));
        this.stateMachines.set(SPIKES_SHOW_ORDER_ENUM.THREE, new State(fsm, `${BASE_URL}/three`));
        this.stateMachines.set(SPIKES_SHOW_ORDER_ENUM.FOUR, new State(fsm, `${BASE_URL}/four`));
        this.stateMachines.set(SPIKES_SHOW_ORDER_ENUM.FIVE, new State(fsm, `${BASE_URL}/five`));
    }

}