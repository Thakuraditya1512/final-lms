import { UserMemberContext } from '@/app/_context/UserMemberContext';
import Image from 'next/image';
import React, { useContext } from 'react';

function Sources({ courseInfo }) {
    const optionsList = [
        {
            id: 1,
            name: 'Source Code',
            icon: '/open-source.png',
            url: 'sourceCode'
        },
        {
            id: 2,
            name: 'App Demo',
            icon: '/web-design.png',
            url: 'demoUrl'
        },
        {
            id: 3,
            name: 'Youtube',
            icon: '/youtube.png',
            url: 'youtubeUrl'
        },
    ];

    const { isMember, setIsMember } = useContext(UserMemberContext);

    const handleOptionClick = (url) => {
        if (!isMember) {
            // Redirect to upgrade page if not a member
            router.push('/Upgradetopro');
        } else {
            // Open the provided URL
            window.open(courseInfo[url]);
        }
    };

    return (
        <div className='flex flex-col items-center gap-3'>
            {optionsList.map((option, index) => (
                <div key={index} className='p-3 border rounded-lg flex items-center cursor-pointer bg-white mb-3'
                    onClick={() => handleOptionClick(option.url)}>
                    <div className='mr-3'>
                        <Image src={option.icon} width={30} height={30} alt='icons' />
                    </div>
                    <h2 className='text-sm text-gray-700'>{option.name}</h2>
                </div>
            ))}
        </div>
    );
}

export default Sources;
