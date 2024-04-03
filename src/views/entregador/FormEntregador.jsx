import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from "react-router-dom";

const ufs = [
  { key: 'PE', value: 'PE', text: 'Pernambuco' },
  { key: 'BA', value: 'BA', text: 'Bahia' },
  { key: 'RJ', value: 'RJ', text: 'Rio de Janeiro' },
]

export default function FormEntregador() {
  const { state } = useLocation();
  const [idEntregador, setIdEntregador] = useState();

  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [rg, setRg] = useState();
  const [dataNascimento, setDataNascimento] = useState();
  const [foneCelular, setFoneCelular] = useState();
  const [foneFixo, setFoneFixo] = useState();
  const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
  const [valorFrete, setValorFrete] = useState();
  const [enderecoRua, setEnderecoRua] = useState();
  const [enderecoNumero, setEnderecoNumero] = useState();
  const [enderecoBairro, setEnderecoBairro] = useState();
  const [enderecoCidade, setEnderecoCidade] = useState();
  const [enderecoCep, setEnderecoCep] = useState();
  const [enderecoUf, setEnderecoUf] = useState();
  const [enderecoComplemento, setEnderecoComplemento] = useState();
  const [ativo, setAtivo] = useState();

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/entregador/" + state.id)
        .then((response) => {
          setIdEntregador(response.data.id);
          setNome(response.data.nome);
          setCpf(response.data.cpf);
          setDataNascimento(formatarData(response.data.dataNascimento));
          setFoneCelular(response.data.foneCelular);
          setQtdEntregasRealizadas(response.data.qtdEntregasRealizadas);
          setEnderecoCidade(response.data.enderecoCidade);
          setAtivo(response.data.ativo);
        });
    }
  }, [state]);

  function formatarData(dataParam) {

    if (dataParam === null || dataParam === '' || dataParam === undefined) {
        return ''
    }

    let arrayData = dataParam.split('-');
    return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
}

  function salvar() {
    let entregadorRequest = {
      nome: nome,
      cpf: cpf,
      rg: rg,
      dataNascimento: dataNascimento,
      foneCelular: foneCelular,
      foneFixo: foneFixo,
      qtdEntregasRealizadas : qtdEntregasRealizadas,
      valorFrete: valorFrete,
      enderecoRua: enderecoRua,
      enderecoNumero: enderecoNumero,
      enderecoBairro: enderecoBairro,
      enderecoCidade: enderecoCidade,
      enderecoCep: enderecoCep,
      enderecoUf: enderecoUf,
      enderecoComplemento: enderecoComplemento,
      ativo: ativo
    };

    if (idEntregador != null) { //Alteração:
      axios.put("http://localhost:8080/api/entregador/" + idEntregador, entregadorRequest)
      .then((response) => { console.log('Entregador alterado com sucesso.') })
      .catch((error) => { console.log('Erro ao alterar um entregador.') })
  } else { //Cadastro:
      axios.post("http://localhost:8080/api/entregador", entregadorRequest)
      .then((response) => { console.log('Entregador cadastrado com sucesso.') })
      .catch((error) => { console.log('Erro ao incluir o entregador.') })
  }

    axios
      .post("http://localhost:8080/api/entregador", entregadorRequest)
      .then((response) => {
        console.log("Entregador cadastrado com sucesso.");
      })
      .catch((error) => {
        console.log("Erro ao incluir o entregador.");
      });
  }

  return (
    <div>

    <MenuSistema />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
        { idEntregador === undefined &&
    <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
}
{ idEntregador != undefined &&
    <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
}


          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Nome"
                  maxLength="100"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <Form.Input required fluid label="CPF">
                  <InputMask
                    required
                    mask="999.999.999-99"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="RG"
                value={rg}
                onChange={(e) => setRg(e.target.value)}>
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input
                fluid label="DT Nascimento"
                width={6}>
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                required fluid label="Fone Celular"
                width={6}>
                  <InputMask
                    mask="(99) 9999.9999"
                    value={foneCelular}
                    onChange={(e) => setFoneCelular(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                fluid label="Fone Fixo"
                width={6}>
                  <InputMask
                    mask="(99) 9999.9999"
                    value={foneFixo}
                    onChange={(e) => setFoneFixo(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                  fluid
                  label="QTD Entregas Realizadas"
                  width={6}
                  value={qtdEntregasRealizadas}
                  onChange={(e) => setQtdEntregasRealizadas(e.target.value)}
                ></Form.Input>

                <Form.Input
                  fluid
                  label="Valor Por Frete"
                  width={6}
                  value={valorFrete}
                  onChange={(e) => setValorFrete(e.target.value)}
                ></Form.Input>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Rua"
                  maxLength="100"
                  value={enderecoRua}
                  onChange={(e) => setEnderecoRua(e.target.value)}
                />

                <Form.Input fluid label="Número"
                value={enderecoNumero}
                onChange={(e) => setEnderecoNumero(e.target.value)}>
                </Form.Input>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Bairro"
                  maxLength="100"
                  value={enderecoBairro}
                  onChange={(e) => setEnderecoBairro(e.target.value)}
                />

                <Form.Input
                fluid label="Cidade"
                value={enderecoCidade}
                onChange={(e) => setEnderecoCidade(e.target.value)}
                >

                </Form.Input>

                <Form.Input fluid label="CEP">
                  <InputMask
                    mask="99999-999"
                    value={enderecoCep}
                    onChange={(e) => setEnderecoCep(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group widths="equal">
              <Form.Select
                    fluid
                    label='UF'
                    options={ufs}
                    placeholder='Selecione'
                    value={enderecoUf}
                    onChange={(e,{value}) => {setEnderecoUf(value)}}
              />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Complemento"
                  maxLength="100"
                  checked={enderecoComplemento}
                  onChange={(e) => setEnderecoComplemento(e.target.value)}
                />
              </Form.Group>

              <Form.Group inline>

                <label>Ativo: </label>

              <Form.Radio
                label='Sim'
                checked={ativo}
                onChange={e => setAtivo(true)}
              />

              <Form.Radio
                label='Não'
                checked={!ativo}
                onChange={e => setAtivo(false)}
              />

              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
            <Link to={"/list-entregador"}>
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
