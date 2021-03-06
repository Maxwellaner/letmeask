import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import illustrationImg from '../../../assets/images/illustration.svg';
import logoImg from '../../../assets/images/logo.svg';
import { Button } from '../../atoms/Button';

import { Container } from './styles';
import { useAuth } from '../../../hooks/useAuth';
import { database } from '../../../services/firebase';

export function NewRoom() {
  const history = useHistory();
  const { authContext } = useAuth();

  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: authContext?.id
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <Container>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h1>{authContext?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
          </div>
      </main>
    </Container>    
  );
}