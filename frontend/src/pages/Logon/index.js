import React, {useState} from 'react';
import api from '../../services/api'
import {Link, useHistory} from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import './styles.css'
import herosImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Logon() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(e){
    e.preventDefault()
    try{
      const response = await api.post('session', {email, password})
      localStorage.setItem('ongName', response.data.name)
      localStorage.setItem('@behero-Token', response.data.token)
      localStorage.setItem('ongEmail', response.data.email)

      history.push('/profile')
    }catch(err){
        alert('Falha no login')
    }
  }

  return(
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>
          <input type="email" placeholder="E-mail" 
          value={email} onChange={e => setEmail(e.target.value)}/>
          <input type="password"  placeholder="Password"  
          value={password} onChange={e => setPassword(e.target.value, 10)} />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={herosImg} alt="Heros"/>
    </div>
  )
    
}
