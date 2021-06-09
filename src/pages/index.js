import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { FaQuoteRight } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import data from './data'

export default function Home() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length -1;
    if(index < 0) {
      setIndex(lastIndex)
    }
    if(index > lastIndex) {
      setIndex(0)
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1)
    },3000);
    return () => clearInterval(slider);
  }, [index])

  return (
    <section className='section'>
      <div className='title'>
        <h2>
          <span>/</span>avaliações
        </h2>
      </div>
      <div className='section-center'>
        {people.map((person, personIndex) => {
          let position = 'nextSlider';
          if(personIndex === index) {
            position = 'activeSlide'
          }
          if(personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)) {
            position = 'lastIndex';
          }

          return (
            <article className={position} key={person.id}>
              <img src={person.image} alt={person.name} className='person-img' />
              <h4>{person.name}</h4>
              <p className='title'>{person.title}</p>
              <p className='text'>{person.quote}</p>
              <FaQuoteRight className='icon' />
            </article>
          )
        })}
        <button className='prev' onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className='next' onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  )
}