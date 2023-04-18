import { HeaderContainer } from './styles'
import LogoImg from '../../assets/Logo.svg'
import { Timer, Scroll } from 'phosphor-react'
export function Header() {
  return (
    <HeaderContainer>
      <img src={LogoImg} alt="logo-ignite-timer " />
      <nav>
        <a href="">
          <Timer size={24} />
        </a>
        <a href="">
          <Scroll size={24} />
        </a>
      </nav>
    </HeaderContainer>
  )
}
