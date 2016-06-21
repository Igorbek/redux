import {Dispatch, Action} from "../../index.d.ts";

type ThunkAction<S, D extends Dispatch, R> = (dispatch: D & ThunkDispatch<S, D>, getState: () => S) => R;
interface ThunkDispatch<S, D extends Dispatch> {
    <R>(action: ThunkAction<S, D, R>): R;
}

declare const dispatch: Dispatch & ThunkDispatch<any, Dispatch>;

const dispatchResult = dispatch({type: 'TYPE', value: 10});
var value: number = dispatchResult.value;

const dispatchThunkResult: number = dispatch(() => 42);
const dispatchedTimerId: number = dispatch(d => setTimeout(() => d({type: 'TYPE'}), 1000));
