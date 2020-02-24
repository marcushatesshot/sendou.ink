import React, { useContext } from "react"
import { RouteComponentProps } from "@reach/router"
import { Heading, Link } from "@chakra-ui/core"
import MyThemeContext from "../../themeContext"
import { Helmet } from "react-helmet-async"

const About: React.FC<RouteComponentProps> = () => {
  const { themeColorWithShade } = useContext(MyThemeContext)
  return (
    <>
      <Helmet>
        <title>About | sendou.ink</title>
      </Helmet>
      <div style={{ marginTop: "1em" }}>
        <Heading size="lg" mb="0.5em">
          Help
        </Heading>
        If you need help using the site don't hesitate to ask on our Discord.
        Bug reports are also useful:{" "}
        <Link
          href="https://discord.gg/J6NqUvt"
          isExternal
          color={themeColorWithShade}
        >
          https://discord.gg/J6NqUvt
        </Link>
      </div>
      <div style={{ marginTop: "1em" }}>
        <Heading size="lg">Thanks to</Heading>
        <ul style={{ marginLeft: "1.2em", marginTop: "0.5em" }}>
          <li>
            <a href="https://twitter.com/LeanYoshi">Lean</a> (provided the Top
            500 X Rank data)
          </li>
          <li>
            <a href="https://twitter.com/zorg_z0rg_z0r8">zorg</a> (provided
            background pictures for the map planner)
          </li>
          <li>
            <a href="https://twitter.com/ganbawoomy">ganbawoomy</a> (provided
            the data for tournament browser)
          </li>
          <li>
            <a href="https://twitter.com/noaim_brn">NoAim™bUrn</a> (gave plenty
            of useful feedback)
          </li>
        </ul>
      </div>
    </>
  )
}

export default About
