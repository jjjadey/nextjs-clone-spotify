import React from 'react';
import { useRecoilState } from 'recoil';
import useSpotify from '../hooks/useSpotify';
import { millisToMinutesAndSeconds } from '../lib/time';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';

const Song = ({ order, track }) => {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const playSong = () => {
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        // console.info('uri', track.track.uri)
        spotifyApi.getMyDevices()
            .then(function (data) {
                let availableDevices = data.body.devices;
                // console.log('all devices:', availableDevices);
                const activeDevice = availableDevices.filter((device) => {
                    return device.is_active === true
                })
                // console.log('activeDevice: ', activeDevice);

                if (activeDevice.length !== 0 && activeDevice[0].is_active) {
                    spotifyApi.play({
                        device: activeDevice[0].id,
                        uris: [track.track.uri],
                    })
                }
                else {
                    console.error('Not found active device. Please open spotify web or app and play')
                }
            })
    }

    return (
        <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
            onClick={playSong}>
            <div className="flex items-center space-x-4">
                <p>{order + 1}</p>
                <img
                    src={track.track.album.images[0].url}
                    className="h-10 w-10"
                    alt="" />
                <div>
                    <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
                    <p className="w-40">{track.track.artists[0].name}</p>
                </div>
            </div>

            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="w-40 hidden md:inline">{track.track.album.name}</p>
                <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song