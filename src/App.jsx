import { useState, useEffect } from 'react'

import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'

import styled from '@emotion/styled'
import ImagenCriptos from './img/imagen-criptos1.png'

/* 

  Para trabajar con styled components debemos instalar una depencia:
  - npm install @emotion/react @emotion/styled

  La ventaja de utilizar styled components es que podemos eliminar un modulo o componente y al hacerlo eliminamos ademas sus estilos. Tambien seguimos teniendo la ventaja de reutilizar codigo css.


*/


/* 

  En este proyecto la funcionalidad principal es el consumo de una API de criptomonedas Link:

  https://min-api.cryptocompare.com/documentation?key=Toplists&cat=TopTotalMktCapEndpointFull

  La definicion de API = application programming interface

  Son funciones, metodos que ofrece una libreria para ser utilizada por otro software como una capa de abstraccion.

  Una API se encargara de poner a disposicion recursos que estan alojados en otro servidor o base de datos

  Usualmente hay que enviar una peticion estructurada

  Al ser REACT una libreria que corre en el cliente, no puede consultar una base de datos, por lo tanto una API es la forma de obtener datos de un servidor

  La API puede ser creada en cualquier lenguaje o framework, lo importante es que retorne una respuesta tipo JSON
  
  Al ser Javascript podemos utilizar FETCH API y obtener los datos para mostrarlos en pantalla. Algunas APIS requieren un KEY y otras estan protegidas por CORS.

  Tambien es posible integrar una libreria externa como AXIOS

*/


const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media(min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }

`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;


`

const Heading = styled.h1`

    font-family: 'Lato', sans-serif;
    color: #fff;
    text-align: center;
    font-weight: 700;
    margin-top: 20px;
    margin-bottom: 50px;
    font-size: 34px; 

  @media(min-width:768px){
    margin-top: 80px;
  }
  

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #08fdd8;
    display: block;
    margin: 10px auto 0 auto;
  }
  

`


function App() {

  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)


  useEffect(() => {
    if(Object.keys(monedas).length > 0){
      
      const cotizarCripto = async () => {

        setCargando(true)
        setResultado({})

        const { moneda, criptomoneda } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setResultado(resultado.DISPLAY[criptomoneda][moneda])

        setCargando(false)


      }

      cotizarCripto()
    }
  }, [monedas])

  return (
    <Contenedor>
      <Imagen 
        src={ ImagenCriptos }
        alt = 'Imagen Criptomonedas'
      />
      <div> 
        <Heading>CriptoNeon</Heading>
        <Formulario 
          setMonedas={setMonedas} 
        />

        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado} /> }  {/*Debemos comprobar por la propiedad cuando es un objeto y no un booleano */}
        
      </div>
    </Contenedor>
  )
}

export default App
