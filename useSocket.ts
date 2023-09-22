import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

//const useSocket = (serverUrl: string) => {
const useSocket = () => {
    const socketRef = useRef<Socket | null>(null);
    const serverUrl = 'http://absolutelynot.app:2525/'

    useEffect(() => {

        // Create a socket if it doesn't exist
        if (!socketRef.current) { socketRef.current = io(serverUrl); }

        function OnConnect() {
            if(socketRef.current === null) {
                console.log('Connected to server, but socketRef.current is null');
                return
            }
            console.log('Connected to server');
        }

        function OnMessage(msg: any) {
            console.log('Message: ', msg);
        }

        function OnGameCreated(msg: any) {
            console.log('Game created: ', msg);
        }

        function OnGameJoined(msg: any) {
            console.log('Game joined:', msg);
        }

        function OnGameRejoined(msg: any) {
            console.log('Game rejoined:', msg);
        }

        function onConnectError(error: any) {
            console.log('Connection Error: ', error);
        }

        function onError(error: any) {
            console.log('Socket.IO Error: ', error);
        }

        function onDisconnect(reason: any) {
            console.log("Disconnected from server due to: ", reason);
        }

        socketRef.current.on('connect',       OnConnect);
        socketRef.current.on('message',       OnMessage);
        socketRef.current.on('game created',  OnGameCreated);
        socketRef.current.on('game joined',   OnGameJoined);
        socketRef.current.on('game rejoined', OnGameRejoined);

        socketRef.current.on('connect_error', onConnectError);
        socketRef.current.on('error',         onError);
        socketRef.current.on('disconnect',    onDisconnect);

    

        // Remove Event listeners and disconnect when closed
        return () => {
            if(socketRef.current) {
                socketRef.current.off('connect',       OnConnect);
                socketRef.current.off('message',       OnMessage);
                socketRef.current.off('game created',  OnGameCreated);
                socketRef.current.off('game joined',   OnGameJoined);
                socketRef.current.off('game rejoined', OnGameRejoined);

                socketRef.current.off('connect_error', onConnectError);
                socketRef.current.off('error',         onError);
                socketRef.current.off('disconnect',    onDisconnect);

                socketRef.current.disconnect();
            }            
        };
    }, []);



    const sendMessage = (message: string) => {
        socketRef.current?.emit('message', message);
    };

    const createGame = (playerName: string) => {
        socketRef.current?.emit('create game', { playerName: playerName });
    };

    const joinGame = (gameCode: string, playerName: string) => {
        socketRef.current?.emit('join game', { gameCode: gameCode, playerName: playerName });
    };

    const rejoinGame = (playerId: string, gameCode: string) => {
        socketRef.current?.emit('rejoin game', { playerId: playerId, gameCode: gameCode });
    };

    return {socket: socketRef.current, sendMessage, createGame, joinGame, rejoinGame}
};

export default useSocket;
