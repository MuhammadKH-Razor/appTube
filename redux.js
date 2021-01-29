const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    age: 66,
    value: 0
}

// reducer
const rootReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'ADD_AGE':
            return {
                ...state,
                age: state.age + 1
            }
        case 'ADD_VALUE':
            return {
                ...state,
                value: 'huda'
            }
    }
}

// store
const store = createStore(rootReducer);
console.log(store.getState());

// subscription
store.subscribe = () =>{

}

// dispatch Action
store.dispatch({ type: 'ADD_AGE' });
store.dispatch({ type: 'ADD_VALUE' });
console.log(store.getState());
