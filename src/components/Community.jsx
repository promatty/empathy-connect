import { useState } from 'react';

export default function Community(){
    const [communityData, setCommunityData] = useState([
        { id: 1, name: 'Community One' },
        { id: 2, name: 'Community Two' }
    ]);

    return (
        <div>
            {communityData.map(community => (
                <div key={community.id}>
                    <h2>{community.name}</h2>
                </div>
            ))}
        </div>
    );
}