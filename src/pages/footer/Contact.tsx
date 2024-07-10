import { Link } from 'react-router-dom'
import { IconWithText } from '../../components'
import "./footerPage.css"

function Contact() {
  document.title = "Contact" + " | Drinkos"

  return (
    <div>
      <h2>Contact</h2>
      <p>
        Feel free to contact me if you would like to work together, or have any
        other type of inquiry. If you have suggestions or questions about the
        site itself, please consider <Link to={"/suggestchange"}>suggesting a change</Link>.
      </p>

      <IconWithText
        src={require("../../assets/icons/email.png")}
        text='Email - kim.hman@hotmail.com' />

      <IconWithText
        src={require("../../assets/icons/github.png")}
        link="https://github.com/kimpoliini"
        text='GitHub - kimpoliini' />

      <IconWithText
        src={require("../../assets/icons/website.png")}
        link="https://kimpoliini.github.io/portfolio/"
        text='Personal website/portfolio' />
      <IconWithText
        src={require("../../assets/icons/twitter.png")}
        link="https://twitter.com/kimpoliini"
        text='Twitter - kimpoliini' />
    </div>
  )
}

export default Contact