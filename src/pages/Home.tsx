import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { Button } from '../components/Button';
import { database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import "../styles/auth.scss";

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if(!user) {
            await signInWithGoogle();
        }  
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event:FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()) {
            alert('Room does not exists.');
            return;
        }

        if(roomRef.val().endedAt) {
            alert('Room already closed.');
            return;
        }

        history.push(`/rooms/${roomCode}`);
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="illustration-img"/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="logo-letmeask"/>
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="icon-google"/>
                        Crie sua conta com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala" 
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    );
}

/* 
O elemento HTML <aside> representa uma seção de uma página que consiste de conteúdo que é 
tangencialmente relacionado ao conteúdo do seu entorno, que poderia ser considerado separado 
do conteúdo. Essas seções são, muitas vezes, representadas como barras laterais. Elas muitas
vezes contem explicações laterais, como a definição de um glossário; conteúdo vagamente
relacionado, como avisos; a biografia do autor; ou, em aplicações web, informações de perfil
ou links de blogs relacionados.
*/