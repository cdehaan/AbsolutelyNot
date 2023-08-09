import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (serverUrl: string) => {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        socketRef.current = io(serverUrl);

        socketRef.current.on('connect', () => {
            if(socketRef.current === null) {
                console.log('Connected to server, but socketRef.current is null');
                return
            }

            console.log('Connected to server');

            socketRef.current.on('message', (msg) => {
                console.log(msg);
            });

            socketRef.current.on('game created', (msg) => {
                console.log(msg);
            });

            socketRef.current.emit('create game', { playerName: 'Player1' });
            //socketRef.current.emit('message', "React hi");
            //socketRef.current.emit('join game', { gameCode: 'ABCDEF' });
        });

        // Disconnect when the component unmounts
        return () => { socketRef.current && socketRef.current.disconnect(); };
    }, []);



    const createGame = (playerName: string) => {
        socketRef.current?.emit('create game', { playerName });
    };

    socketRef.current?.on('game created', (data) => {
        console.log('Game created:', data);
        // handle any other logic or state updates here
    });



    const joinGame = (gameCode: string, playerName: string) => {
        socketRef.current?.emit('join game', { gameCode, playerName });
    };

    socketRef.current?.on('game joined', (data) => {
        console.log('Game joined:', data);
        // handle any other logic or state updates here
    });



    const rejoinGame = (playerId: string, gameCode: string) => {
        socketRef.current?.emit('rejoin game', { playerId, gameCode });
    };

    socketRef.current?.on('game rejoined', (data) => {
        console.log('Game rejoined:', data);
        // handle any other logic or state updates here
    });

    return {socket: socketRef.current, createGame, joinGame, rejoinGame}
};

export default useSocket;
