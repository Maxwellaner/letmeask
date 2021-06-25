import { useContext } from "react";
import { RoomCode } from "../RoomCode/RoomCode";
import Switch from 'react-switch';
import logoImg from '../../../assets/images/logo.svg';
import { ThemeContext } from "styled-components";
import { Header as HeaderComponent } from './styles';
import { Button } from "../Button";

type HeaderProps = {
  roomId: string;
  toogleTheme: () => void;
  isAdmin?: boolean;
  handleEndRoom?: () => Promise<void>;
}

export function Header({ toogleTheme, isAdmin = false, roomId, handleEndRoom }: HeaderProps) {
  const { colors, title } = useContext(ThemeContext);
  console.log(title);
  return (
    <HeaderComponent>
      <div className="content">
        <img src={logoImg} alt="letmeask" />
        <div>
          <Switch 
            onChange={toogleTheme}
            checked={title === 'dark'}
            checkedIcon={false}
            uncheckedIcon={false}
            height={12}
            width={40}
            handleDiameter={20}
            onColor={colors.secondary}
            offColor={colors.primary}
          />
          <RoomCode code={roomId} />
          {isAdmin && (
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          )}
        </div>
      </div>
    </HeaderComponent>
  );
}