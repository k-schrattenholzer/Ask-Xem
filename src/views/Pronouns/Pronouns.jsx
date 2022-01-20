import { getCardsbyCategory } from "../../services/cards"
import { useState, useEffect } from "react"
import Guide from "../../components/Guide/Guide.jsx"
import CardList from "../../components/Cards/CardList"
import { useDeck } from "../../context/DeckContext/DeckContext"
import renderRainbow from "../../utils/rainbow"

export default function Pronouns() {
  const [deck, setDeck] = useState('')
  const [loading, setLoading] = useState(true)
  const { pronSeen } = useDeck()

  const guideText = 'This is the Pronouns Deck'

  const rainbow = renderRainbow(pronSeen.length)

  useEffect(() => {
    const fetchDeck = async () => {
      setLoading(true)

      try {
        const response = await getCardsbyCategory('pronoun')
        setDeck(response)
        setLoading(false)
      } catch (error) {
       console.log(error.message) 
      }
    }
    fetchDeck()
  }, [])

  return (
    <main>
      {loading && <p>Loading...</p>}
      <CardList cards={deck} />
      {rainbow}
      <Guide text={guideText}/>
    </main>
  )
}


