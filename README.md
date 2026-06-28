# Planner API

API REST para planejamento de estudos com testes automatizados em Robot Framework e pipeline de integração contínua com GitHub Actions.

## Projeto

Este repositório contém uma API em Node.js/Express para gerenciamento de plano de estudos, disciplinas, tópicos e progresso.

## Tecnologias

- Node.js
- Express
- Swagger/OpenAPI
- Python
- Robot Framework
- RequestsLibrary
- GitHub Actions

## Estrutura

```text
src/
  app.js
  server.js
  controllers/
  data/
  docs/
  middlewares/
  routes/
  services/
  utils/

libraries/
  custom_library.py

resources/
  fixtures/
  keywords/
  payloads/
  variables/

tests/
  disciplines/
  study_plans/
  topics/

.github/workflows/
  ci.yml
```

## API

Com a aplicação em execução local, a documentação Swagger fica disponível em:

- `http://localhost:3000/api-docs`

## Instalação

```bash
npm install
pip install -r requirements.txt
```

## Execução da API

```bash
npm start
```

## Execução dos testes

```bash
robot -d reports/robot tests
```

## Pipeline de CI

O workflow de CI está em [.github/workflows/ci.yml](.github/workflows/ci.yml).

### Gatilhos

- push nas branches `main` e `master`
- execução manual com `workflow_dispatch`
- execução agendada diariamente às `18:30` UTC

### Etapas

1. Checkout do repositório.
2. Setup do Node.js e do Python.
3. Instalação das dependências.
4. Subida da API.
5. Aguardo da disponibilidade da API.
6. Execução dos testes Robot.
7. Upload do relatório como artifact `robot-reports`.

### Relatório

A pipeline armazena o diretório `reports/robot` como artifact. Esse diretório inclui os arquivos gerados pelo Robot Framework, como `log.html`, `report.html` e `output.xml`.

## Entrega

Para a entrega da atividade, utilizar:

1. URL do repositório GitHub com a solução.
2. Evidência de uma execução bem-sucedida da pipeline no GitHub Actions.
