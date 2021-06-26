import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likeCount: number; 
    likeId: string | undefined;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likes: Record<string, {
        authorId: string
    }>
}> 


export function useRoom(roomId: string) {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);
        /*  
            doc firebase 
            ouvir evento mais de uma vez == on
            ouvir evento uma unica vez == once

            Object.entries == transforma um objeto em um array com
            os valores daquele objeto em "subarrays"
        */
        // roomRef.once('value', room => {
            roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,    
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                }
            });
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        });

        return () => {
            roomRef.off('value');    
        }
    }, [roomId, user?.id]);
    /* toda vez que o id da sala mudar eu executo 
       o código do useEffect de novo.  
    */

    return { questions, title };
}