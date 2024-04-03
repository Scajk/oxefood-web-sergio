import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Form, Icon, TextArea } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from "react-router-dom";

export default function FormProduto () {
    const { state } = useLocation();
    const [idProduto, setIdProduto] = useState();

    const [codigo, setCodigo] = useState();
    const [titulo, setTitulo] = useState();
    const [descricao, setDescricao] = useState();
    const [valorUnitario, setValorUnitario] = useState();
    const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
    const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
          axios
            .get("http://localhost:8080/api/produto/" + state.id)
            .then((response) => {
              setIdProduto(response.data.id);
              setCodigo(response.data.codigo);
              setTitulo(response.data.titulo);
              setDescricao(response.data.descricao);
              setValorUnitario(response.data.valorUnitario);
              setTempoEntregaMinimo(response.data.tempoEntregaMinimo);
              setTempoEntregaMaximo(response.data.tempoEntregaMaximo);
            });
        }
      }, [state]);

    function salvar() {

        let produtoRequest = {
             codigo: codigo,
             titulo: titulo,
             descricao: descricao,
             valorUnitario: valorUnitario,
             tempoEntregaMinimo: tempoEntregaMinimo,
             tempoEntregaMaximo: tempoEntregaMaximo
        }
    
        if (idProduto != null) { //Alteração:
            axios.put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
            .then((response) => { console.log('Produto alterado com sucesso.') })
            .catch((error) => { console.log('Erro ao alter um produto.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/produto", produtoRequest)
            .then((response) => { console.log('Produto cadastrado com sucesso.') })
            .catch((error) => { console.log('Erro ao incluir o produto.') })
        }
 

        axios.post("http://localhost:8080/api/produto", produtoRequest)
        .then((response) => {
             console.log('Produto cadastrado com sucesso.')
        })
        .catch((error) => {
             console.log('Erro ao incluir o produto.')
        })
    }

    return (

        <div>

    <MenuSistema />

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                { idProduto === undefined &&
    <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
}
{ idProduto != undefined &&
    <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
}


                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    placeholder='Informe o título do produto'
                                    width={6}
                                    value={titulo}
			                        onChange={e => setTitulo(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Código do Produto'
                                    placeholder='Informe o código do produto'
                                    maxLength="100"
                                    width={1}
                                    value={codigo}
			                        onChange={e => setCodigo(e.target.value)}>
                                </Form.Input>

                            </Form.Group>

                            <TextArea placeholder='Informe a descrição do produto' style={{ minHeight: 100 }} />
                            
                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Descrição'
                                    maxLength="100"
                                    placeholder="Informe a descrição do produto"
                                    width={6}
                                    value={descricao}
			                        onChange={e => setDescricao(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Unitário'
                                    width={6}
                                    value={valorUnitario}
			                        onChange={e => setValorUnitario(e.target.value)}>
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Mínimo em Minutos'
                                    width={6}
                                    placeholder="30"
                                    value={tempoEntregaMinimo}
			                        onChange={e => setTempoEntregaMinimo(e.target.value)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máximo em Minutos'
                                    width={6}
                                    placeholder="40"
                                    value={tempoEntregaMaximo}
			                        onChange={e => setTempoEntregaMaximo(e.target.value)}
                                >
                                </Form.Input>

                            </Form.Group>
                        
                        </Form>
                        
                        <div style={{marginTop: '4%'}}>
                        <Link to={"/list-produto"}>
                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                Listar
                            </Button>
                            </Link>
                                
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={ () => salvar() }
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>
                    
                </Container>
            </div>
        </div>

    );

}