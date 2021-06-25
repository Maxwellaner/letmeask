import { useState, useEffect } from "react";
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

type Question = {
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
  const { authContext } = useAuth();
  const [title, setTitle] = useState();
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const roomRef = database.ref(`/rooms/${roomId}`);

    // TODO: ver eventos do firebase de change do valor ou adição ou remoção
    // para não ter que atualizar todos os valores sempre
    roomRef.on('value', room => {
      const parsedQuestions = Object.entries(
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
      });

      setTitle(room.val().title);
      setQuestions(parsedQuestions);
    });

    return () => roomRef.off('value');
  }, [roomId, authContext?.id]);

  return {
    questions,
    title
  }
}