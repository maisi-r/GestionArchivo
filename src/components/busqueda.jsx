import React, {useState, useEffect} from 'react'

const busqueda = () => {

    //Setear los hooks useStates
    const [users,setUsers] =useState([])
    const [search,setSearch]=useState("")

    //Funcion para traer los datos de la API
    const URL = 'http://138.117.77.156:3007/api/file/'

    const showData = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        console.log(data)
    }
    showData()

    
    //funcion de busqueda
     const searcher = (e) => {
      setSearch (e.target.value)
    }

    //metodo de filtrado
    const tipodocumento = !search ? tipodocumento : tipodocumento.filter( (item) => 
    item.name.toLowerCase().includes(search.toLocaleLoerCase()))

    //renderizamos la vista


  return (
    <div>
        <input value={search} onChange={searcher} type="text" placeholder='Buscar' className='form-control' />
    </div>
    
  )
}

export default busqueda