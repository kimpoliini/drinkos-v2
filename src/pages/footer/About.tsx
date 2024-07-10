import { Link } from 'react-router-dom'
import './footerPage.css'

const About = () => {
    document.title = "About" + " | Drinkos"

    return (
        <div>
            <h2>About Drinkos</h2>
            <h3>History</h3>
            <p>
                Drinkos started out as a school project
                (see <a href="https://kimpoliini.github.io/drinkos-legacy/">drinkos-legacy</a>)
                in 2020. I decided after my studies that I wanted to create a full website from that first draft,
                and set out to create this new version of Drinkos.
                <br /><br />
                Drinkos is made using React, using results from <a href="https://www.thecocktaildb.com/" rel='nofollow'>TheCocktailDB</a>.
            </p>
            <h3>Goal</h3>
            <p>
                The goal was to make a website that could
                easily be browsed to find recipes for new and known drinks,
                and to inspire people to try new and exciting recipes.
                <br />
                <br />
                If there is something you would like to see changed or improved,
                feel free to <Link to="/suggestchange">suggest a change.</Link>
            </p>
            {/* <h3>Measurement units</h3>
            <p>
                The drinks on this site are originally measured in imperial units, which can be
                a hassle to convert manually. So to make this site accesible
                and easy-to-use, I added the ability to easily convert
                from imperial to metric units, saving you, the aspiring drink-mixer,
                from the trouble. See the <Link to={"/unitconversions"}>conversion table</Link> for more information.
            </p> */}
            <h3>Donation</h3>
            <p id='donation'>
                This website is made entirely on my free time, and if you would like
                to support the ongoing development for Drinkos, I would be grateful if
                you decided to fund one of the many coffees I've had during the
                development!
                <br />
                <br />
                <a href='https://ko-fi.com/E1E1JWRE0' target='_blank' rel='nofollow'><img height='36' style={{ border: "0px;height:36px;", width: "auto" }} src='https://storage.ko-fi.com/cdn/kofi2.png?v=3' alt='Buy Me a Coffee at ko-fi.com' /></a>
                <br />
                If you want to be listed as a donator on this site, include it in the
                message on Ko-fi.
                <br />
                <br />
                Thank you for using Drinkos! {"<3"}
            </p>
        </div>
    )
}

export default About