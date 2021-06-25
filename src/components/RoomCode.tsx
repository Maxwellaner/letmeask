import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type RoomCopeProps = {
  code: string;
}

export function RoomCode(props: RoomCopeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}