# Requisitos

## Funcionais

- **Cadastro de Carros**: Deve ser possível cadastrar um novo carro
- **Listagem de Carros**: Deve ser possível realizar a listagem dos carros disponíveis
- **Cadastro de especificações do carro**: Deve ser possível cadastrar uma especificação para um carro
- **Cadastro de especificações do carro**: Deve ser possível listar todas especificações 
- **Cadastro de especificações do carro**: Deve ser possível listar todos os carros 
- **Cadastro de Imagens do Carro**: Deve ser possível cadastrar a imagem de carro
- **Cadastro de Imagens do Carro**: Deve ser possível listar todos os carros
- **Aluguel de carros**: Deve ser possível cadastrar um aluguel

## Não funcionais

- **Cadastro de Imagens do Carro**: Deve ser utilizado o mutler para realizar upload

## Regra de Negócio

- **Cadastro de Carros**: Não deve ser possível cadastrar um carro uma placa já existente
- **Cadastro de Carros**: Não deve ser possível alterar a placa de um carro já cadastrado
- **Cadastro de Carros**: O carro deve ser cadastrado como disponível por padrão
- **Cadastro de Carros**: Apenas um usuário admnistrador deve ser responsável por realizar o cadastro
- **Listagem de Carros**: Para realizar a listagem não é necessário que o usuário esteja logado
- **Cadastro de especificações do carro**: Não deve ser possível cadastrar uma especificação para um carro não cadastrado
- **Cadastro de especificações do carro**: Não deve ser possível cadastrar uma especificação já existente em um mesmo carro
- **Cadastro de especificações do carro**: Apenas um usuário administrador deve ser responsável por realizar o cadastro
- **Cadastro de Imagens do Carro**: O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- **Cadastro de Imagens do Carro**: Apenas um usuário administrador deve ser responsável por realizar o cadastro
- **Aluguel de carros**: Um aluguel deve ter a duração miníma de doze horas
- **Aluguel de carros**: Um alguem só pode ser realizado caso o usuário não possua nenhum alguel em andamento
- **Aluguel de carros**: Um alguem só pode ser realizado caso o carro esteja disponível pa locação
- **Aluguel de carros**: O carro alugado deverá ser marcado como indisponível