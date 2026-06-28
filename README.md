# Planner API - CI com GitHub Actions e Robot Framework

## Contexto do trabalho

Este repositório foi utilizado para implementar uma pipeline de Integracao Continua (CI) com GitHub Actions em um projeto ja desenvolvido anteriormente, contendo testes automatizados com Robot Framework para a API de planner de estudos.

## Objetivo da solucao

Atender aos requisitos da atividade:

- Execucao por push.
- Execucao manual.
- Execucao agendada (schedule).
- Geracao de relatorio de testes.
- Armazenamento/publicacao do relatorio na pipeline.
- Documentacao da solucao e conceitos utilizados.

## Tecnologias utilizadas

- Node.js + Express (API REST)
- Swagger/OpenAPI (documentacao)
- Python + Robot Framework (automacao de testes)
- RequestsLibrary (testes HTTP)
- Allure Robot Framework Listener (resultado bruto Allure)
- GitHub Actions (pipeline CI)

## Pipeline de CI

Arquivo da pipeline:

- `.github/workflows/ci.yml`

### Gatilhos configurados

- `push` nas branches `main` e `master`
- `workflow_dispatch` (execucao manual)
- `schedule` diario (`0 3 * * *`, horario UTC)
- `pull_request` em `main` e `master` (mantido para validacao adicional)

### Etapas da pipeline

1. Checkout do codigo.
2. Setup do Node.js (com cache de dependencias npm).
3. Setup do Python.
4. Instalacao de dependencias (`npm ci` e `pip install -r requirements.txt`).
5. Validacao de sintaxe JavaScript (`node --check`).
6. Inicializacao da API.
7. Espera ativa da disponibilidade da API.
8. Smoke tests (`/` e `/api-docs`).
9. Execucao dos testes Robot com geracao de `xunit.xml`.
10. Publicacao do resultado dos testes no resumo de Checks da execucao.
11. Upload dos artefatos de relatorio.

## Relatorios e publicacao na pipeline

Durante a execucao, sao gerados e publicados:

- Relatorio nativo do Robot em `reports/robot`:
  - `report.html`
  - `log.html`
  - `output.xml`
  - `xunit.xml`
- Resultado bruto do Allure em `reports/allure-results`

No GitHub Actions, esses arquivos sao armazenados como artifacts:

- `robot-reports`
- `allure-results`

Os resultados de teste tambem sao publicados na interface de Checks da execucao.

## Como executar localmente

### Pre-requisitos

- Node.js 20+
- Python 3.12+

### Instalacao

```bash
npm install
pip install -r requirements.txt
```

### Subir a API

```bash
npm start
```

### Rodar os testes Robot

```bash
robot -d reports/robot tests
```

## Evidencias para entrega

Para a entrega da atividade, informar:

1. URL do repositorio GitHub com esta solucao.
2. Evidencia de pelo menos uma execucao bem-sucedida da pipeline, contendo:
   - status `Success` da run;
   - job concluido;
   - artifacts `robot-reports` e `allure-results` disponiveis para download.

## Conceitos aplicados

- Integracao Continua orientada a eventos (`push`, manual e agendado).
- Automacao de validacao de codigo e de API antes dos testes funcionais.
- Testes de API com particionamento de equivalencia e cenarios positivos/negativos.
- Publicacao e retencao de evidencias de execucao (artifacts e checks).
- Rastreabilidade da qualidade via relatorios automatizados por pipeline.
