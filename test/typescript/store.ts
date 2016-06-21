import {
  Store, Dispatch, createStore, Reducer, Action, StoreEnhancer, GenericStoreEnhancer,
  StoreCreator, StoreEnhancerStoreCreator, Unsubscribe
} from "../../index.d.ts";


type State = {
  todos: string[];
}

const reducer: Reducer<State> = (state: State, action: Action): State => {
  return state;
}


/* createStore */

const store = createStore<State>(reducer);

const storeWithPreloadedState: Store<State, Dispatch> = createStore(reducer, {
  todos: []
});

const genericEnhancer: GenericStoreEnhancer<{}> = <S>(next: StoreEnhancerStoreCreator<S, Dispatch>) => next;
const specificEnhencer: StoreEnhancer<State, Dispatch, Dispatch> = next => next;

const storeWithGenericEnhancer: Store<State, Dispatch> = createStore(reducer, genericEnhancer);
const storeWithSpecificEnhancer: Store<State, Dispatch> = createStore(reducer, specificEnhencer);

const storeWithPreloadedStateAndEnhancer: Store<State, Dispatch> = createStore(reducer, {
  todos: []
}, genericEnhancer);


/* dispatch */

store.dispatch({
  type: 'ADD_TODO',
  text: 'test'
})


/* getState */

const state: State = store.getState();


/* subscribe / unsubscribe */

const unsubscribe: Unsubscribe = store.subscribe(() => {
  console.log('Current state:', store.getState())
})

unsubscribe();


/* replaceReducer */

const newReducer: Reducer<State> = (state: State, action: Action): State => {
  return state;
}

store.replaceReducer(newReducer);
