import React from 'react';
import { useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import Song from './Song';

const Songs = () => {
    const playlist = useRecoilValue(playlistState);
    console.log('aaaa', playlist)
    return (
        <div className="text-white px-8 flex flex-col pb-28">
            {playlist?.tracks.items.map((track, i) => (
                <Song key={track.track.id} track={track} order={i} />
            ))}
        </div>
    )
}

export default Songs