import { useHistory, useParams } from 'react-router-dom';
import { Header } from '../../atoms/Header';
import { Question } from '../../../atomic/templates/Question';
import { QuestionModel, useRoom } from '../../../hooks/useRoom';
import { database } from '../../../services/firebase';
import { Container } from './styles';
import deleteImg from '../../../assets/images/delete.svg';
import checkImg from '../../../assets/images/check.svg';
import answerImg from '../../../assets/images/answer.svg';
import { useToogleTheme } from '../../../hooks/useToogleTheme';
import { RoomTitle } from '../../atoms/RoomTitle';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory();
  const { toogleTheme } = useToogleTheme();
  const params = useParams<RoomParams>();
  const roomId = params?.id;

  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`/rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja exluir esta pergunta?')) {
      await database.ref(`/rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(question: QuestionModel) {
    const isAnswered = question.isAnswered;
    await database.ref(`/rooms/${roomId}/questions/${question.id}`).update({
      isAnswered: !isAnswered,
    });
  }

  async function handleHighlightQuestion(question: QuestionModel) {
    const isHighlighted = question.isHighlighted;
    await database.ref(`/rooms/${roomId}/questions/${question.id}`).update({
      isHighlighted: !isHighlighted,
    });
  }

  return (
    <Container>
      <Header toogleTheme={toogleTheme} isAdmin roomId={roomId} handleEndRoom={handleEndRoom} />
      <main>
        <RoomTitle title={title} questionsCount={questions.length} />
        <div className="question-list">
          {questions.map(question => {
            return (
              <Question 
                key={question.id} 
                content={question.content} 
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question)}
                    >
                      <img src={answerImg} alt="Dar destaque" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Deletar pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </Container>
  );
}