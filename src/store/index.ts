import { combineReducers, createStore } from 'redux';
const rootReducer = combineReducers({
    friends: FriendListReducer
});
export default createStore(rootReducer);
function FriendListReducer(state = {friends : []}, action: { type: any; payload: { friend: any; }; }) {
    switch (action.type) {
        case 'ADD_FRIEND':
            return [
                { friends : action.payload.friend }, ...state.friends
            ]
        default:
            return state;
    }
    return state;
}
