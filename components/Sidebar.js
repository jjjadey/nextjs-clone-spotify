import { HomeIcon, SearchIcon, LibraryIcon, RssIcon, HeartIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from "recoil";
import { playlistIdState } from '../atoms/playlistAtom';

const Sidebar = () => {
    const { data: session, status } = useSession();
    const spotifyApi = useSpotify();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    console.log('session', session);
    console.log('you picked playlist:', playlistId);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                console.log('my playlists:', data.body.items)
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi]);

    return (
        <div className="text-gray-500 p-5 text-xs lg:text-sm
        border-r border-gray-900 
        overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:maw-w=[15rem] hidden md:inline-flex">
            <div className="space-y-4">
                <button className="flex items-center space-x-4 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-4 hover:text-white">
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-4 hover:text-white">
                    <LibraryIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />

                <button className="flex items-center space-x-4 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create Playlist</p>
                </button>
                <button className="flex items-center space-x-4 hover:text-white">
                    <HeartIcon className="h-5 w-5" />
                    <p>Like Songs</p>
                </button>
                <button className="flex items-center space-x-4 hover:text-white">
                    <RssIcon className="h-5 w-5" />
                    <p>Your Episodes</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />

                {playlists.map((playlist) => (
                    <p key={playlist.id} className="cursor-pointer hover:text-white"
                        onClick={() => setPlaylistId(playlist.id)}
                    >
                        {playlist.name}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
