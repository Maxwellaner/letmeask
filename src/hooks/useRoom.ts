import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>;
}>;

export type QuestionModel = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

export function useRoom(roomId: string) {
  const history = useHistory();
  const { authContext } = useAuth();
  const [title, setTitle] = useState();
  const [questions, setQuestions] = useState<QuestionModel[]>([]);

  useEffect(() => {
    const roomRef = database.ref(`/rooms/${roomId}`);

    // TODO: ver eventos do firebase de change do valor ou adição ou remoção
    // para não ter que atualizar todos os valores sempre
    roomRef.on('value', room => {
      if (room.val().endedAt) {
        history.push("/")
        alert('Room already closed.');
      }
      
      const parsedQuestions = room.val().questions ? Object.entries(
        room.val().questions as FirebaseQuestions
      ).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === authContext?.id)?.[0]
        };
      }) : [];

      setTitle(room.val().title);
      setQuestions(parsedQuestions.reverse());
    });

    return () => roomRef.off('value');
  }, [roomId, authContext?.id, history]);

  return {
    questions,
    title
  }
}