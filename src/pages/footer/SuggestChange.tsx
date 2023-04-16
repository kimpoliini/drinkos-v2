import React from 'react'

const SuggestChange = () => {
  document.title = "Suggest a change" + " | Drinkos"

  return (
    <div>
      <h2>Suggest a change</h2>
      <p>
        Please email any suggestions you have to <a href="mailto: kim.hman@hotmail.com">kim.hman@hotmail.com</a>,
        with the subject being "Drinkos Suggestion - [your name]".
      </p>
    </div>
  )
}

export default SuggestChange