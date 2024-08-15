import carProfileReducer, {addPostActionCreator, deletePost} from "./car-profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: 'My name is Mikhailo', likesCount: 20},
        {id: 3, message: 'Hey', likesCount: 1},
        {id: 4, message: 'Yo', likesCount: 10},
    ]
}

test('new post should be added', () => {
    let action = addPostActionCreator("it-kamasutra")
    let newState = carProfileReducer(state, action)
    expect(newState.posts.length).toBe(5)
});

test('after deleting length of message should be decrement', () => {
    let action = deletePost(1)
    let newState = carProfileReducer(state, action)
    expect(newState.posts.length).toBe(3)
});
