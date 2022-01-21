import { useState, useEffect } from "react"
import { getCardsByCategory } from "../../services/cards"
import CardList from "../../components/Cards/CardList"
import DeckComplete from "../../components/DeckComplete/DeckComplete.jsx"
import { useDeck } from "../../context/DeckContext/DeckContext"
import renderRainbow from "../../utils/rainbow"
import Guide from "../../components/Guide/Guide.jsx"



export default function Gender() {
  const [deck, setDeck] = useState('')
  const [loading, setLoading] =useState(true)
  const [rainbow, setRainbow] = useState('')
  
  const { genSeen } = useDeck()

  const guideText = 'This is the Gender Deck - click on a card to see the definition!'

  useEffect(() => {
    const fetchDeck = async () => {
      setLoading(true)

      try {
        const response = await getCardsByCategory('gender')
        setDeck(response)
        setLoading(false)
      } catch (error) {
       console.log(error.message) 
      }
    }
    fetchDeck()
  }, [])

  useEffect(() => {
    const showRainbow = () => {
      const rainbow = renderRainbow(genSeen.length)
      setRainbow(rainbow)
    }
    showRainbow()
  }, [genSeen])

  return (
    <main>
      {loading && <p>Loading...</p>}
      <CardList cards={deck} rainbow={rainbow} />
      {rainbow}
      <Guide text={guideText} />
      { (genSeen.length === 8) && <DeckComplete deckCategory={'gender'}/>}
    </main>
  )
}