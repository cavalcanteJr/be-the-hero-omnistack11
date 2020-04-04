import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import {Link, useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css'
import logoImg from '../../assets/logo.svg'


export default function NewIncident() {
  const history = useHistory()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')
  const ongEmail = localStorage.getItem('ongEmail')

  useEffect(() => {
    api.get('profile', {
        headers: {
            email: ongEmail
        }
    }).catch(response =>{
        if(response.response.status === 401)
            history.push('/')
            console.log(response.response.status)
    })
}, 
[ongEmail,history])

  async function handleNewIncident(e){
    e.preventDefault()
    const data = {title, description, value}
    const ongEmail = localStorage.getItem('ongEmail')

    try{
      await api.post('incidents', data, {
        headers: {
          email: ongEmail
        }
      })

      history.push('/profile')
    }catch{
      alert("Erro ao cadastrar")
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastrar novo caso</h1>
          <p>Descreve o caso detalhadamente para encontrar um herói para revolver isso.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para Home
          </Link>
          </section>
          <form onSubmit={handleNewIncident}>
            <input 
             placeholder="Título do caso" 
             value={title} onChange={e => setTitle(e.target.value) }
             />
            <textarea 
             placeholder="Descrição" 
             value={description} onChange={e => setDescription(e.target.value) }
             />
            <input 
             placeholder="Valor em reais" 
             value={value} onChange={e => setValue(e.target.value) }
             />
            
            <button className="button" type="submit">Cadastrar</button>
          </form>
        
      </div>
    </div>
  );
}
