function createStore() {
    //the store should have four parts
    // the store
    //get the store
    //listen to state change
    //update the state
    let state
    let listeners = [];

    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }


    }

    return {
        getState,
        subscribe
    }

}
const store = createStore();
store.subscribe(() => {
    console.log('the new Store is ' + store.getState())
})
const unsubscribe = store.subscribe(() => {
    console.log('the store has changed.')
})