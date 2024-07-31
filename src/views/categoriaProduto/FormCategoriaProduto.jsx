import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function FormCategoriaProduto() {
  const { state } = useLocation();
  const [idCategoriaProduto, setIdCategoriaProduto] = useState();

  const [descricao, setDescricao] = useState();

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/categoriaProduto/" + state.id)
        .then((response) => {
          setIdCategoriaProduto(response.data.categoriaProduto);
          setDescricao(response.data.descricao);
        });
    }
  }, [state]);

  function salvar() {
    let categoriaProdutoRequest = {
      descricao: descricao
    };

    if (idCategoriaProduto != null) { //Alteração:
      axios.put("http://localhost:8080/api/categoriaProduto/" + idCategoriaProduto, categoriaProdutoRequest)
        .then((response) => { console.log('Categoria de produto alterado com sucesso.') })
        .catch((error) => { console.log('Erro ao alterar uma categoria de produto.') })
    } else { //Cadastro:
      axios.post("http://localhost:8080/api/categoriaProduto", categoriaProdutoRequest)
        .then((response) => { console.log('Categoria de produto cadastrado com sucesso.') })
        .catch((error) => { console.log('Erro ao incluir o categoria de produto.') })
    }
  }

  return (
    <div>
      <MenuSistema />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idCategoriaProduto === undefined &&
            <h2> <span style={{ color: 'darkgray' }}> Categoria de Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
          }
          {idCategoriaProduto != undefined &&
            <h2> <span style={{ color: 'darkgray' }}> Categoria de Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
          }


          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Input
                required
                fluid
                label="Descricao"
                maxLength="100"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to={"/list-categoriaProduto"}>
                <Button
                  type="button"
                  inverted
                  circular
                  icon
                  labelPosition="left"
                  color="orange"
                >
                  <Icon name="reply" />
                  Voltar
                </Button>
              </Link>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
