import { Container } from './styles';

type RoomTitleProps = {
  title: string | undefined;
  questionsCount: number;
}

export function RoomTitle({ title, questionsCount }: RoomTitleProps) {
  return (
    <Container>
      <h1>Sala - {title}</h1>
      { questionsCount > 0 && <span>{questionsCount} pergunta(s)</span>}
    </Container>
  );
}