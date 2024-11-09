const fakeData = {
    users: [
        { id: 1, username: 'user1' },
        { id: 2, username: 'user2' }
    ],
    communities: [
        {
            id: 1,
            name: 'Community One',
            posts: [
                { id: 1, title: 'First Post', body: 'This is the first post.', user_id: 1, community_id: 1 },
                { id: 2, title: 'Second Post', body: 'This is the second post.', user_id: 2, community_id: 1 }
            ]
        },
        {
            id: 2,
            name: 'Community Two',
            posts: [
                { id: 3, title: 'Third Post', body: 'This is the third post.', user_id: 1, community_id: 2 }
            ]
        }
    ]
};

export default fakeData;