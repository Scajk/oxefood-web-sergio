import { Segment } from 'semantic-ui-react';
import './App.css';
import Home from './views/home/Home';
import FormCliente from './views/cliente/FormCliente';
import FormProduto from './views/produto/FormProduto';

function App() {

  return (

    
    <div className="App">
      
      <FormProduto />

      <div style={{marginTop: '6%'}}>
        <Segment vertical color='grey' size='tiny' textAlign='center'>
          &copy; 2024 - Projeto WEB III Sérgio de Castro - IFPE Jaboatão dos Guararapes
        </Segment>
      </div>

    </div>
  );
}

export default App;
