import {
  Middleware, MiddlewareAPI,
  applyMiddleware, createStore, Dispatch, Reducer, Action,
  StoreEnhancerStoreCreator
} from "../../index.d.ts";

type ThunkAction<S, D extends Dispatch, R> = (dispatch: D & ThunkDispatch<S, D>, getState: () => S) => R;
interface ThunkDispatch<S, D extends Dispatch> {
    <R>(action: ThunkAction<S, D, R>): R;
}
type ThunkStoreEnhancer = <S, D extends Dispatch>(next: StoreEnhancerStoreCreator<S, D>) => StoreEnhancerStoreCreator<S, D & ThunkDispatch<S, D>>;
type ThunkMiddleware<S, D extends Dispatch> = Middleware<ThunkDispatch<S, D>>

const thunkMiddleware =
  <S, D extends Dispatch>({dispatch, getState}: MiddlewareAPI<S, D>) =>
    (next: D): D & ThunkDispatch<S, D> =>
      (<A extends Action, B>(action: A | ThunkAction<S, D, B>): B|Action =>
        typeof action === 'function' ?
          (<ThunkAction<S, D, B>>action)(dispatch, getState) :
          next(<A>action)) as any;

const loggerMiddleware: Middleware<{}> =
  <S, D extends Dispatch>({getState}: MiddlewareAPI<S, D>) =>
    (next: D) =>
      (action: any): any => {
        console.log('will dispatch', action)

        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action)

        console.log('state after dispatch', getState())

        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue
      }



type State = {
  todos: string[];
}

const reducer: Reducer<State> = (state: State, action: Action): State => {
  return state;
}

const thunkEnhancer = applyMiddleware(thunkMiddleware as ThunkMiddleware<State, Dispatch>); 
const storeWithThunkMiddleware = createStore(reducer, thunkEnhancer);

const storeWithLoggerMiddleware = createStore(
  reducer,
  applyMiddleware(loggerMiddleware)
);

storeWithThunkMiddleware.dispatch(
  (dispatch, getState) => {
    const todos: string[] = getState().todos;
    dispatch({type: 'ADD_TODO'})
  }
)

const storeWithMultipleMiddleware = createStore(
  reducer,
  applyMiddleware(loggerMiddleware, thunkMiddleware as ThunkMiddleware<State, Dispatch>)
)
