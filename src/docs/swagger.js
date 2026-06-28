const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Planner API',
      version: '1.0.0',
      description: 'API REST para gerenciamento de planos de estudo, disciplinas e progresso diario/semanal/mensal.'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ],
    tags: [
      { name: 'Plans', description: 'Gestao de planos de estudo' },
      { name: 'Subjects', description: 'Gestao de disciplinas por plano' },
      { name: 'Progress', description: 'Lancamento e consulta de progresso' }
    ],
    components: {
      schemas: {
        ErrorResponse: {
          type: 'object',
          properties: {
            status: { type: 'number', example: 400 },
            error: { type: 'string', example: 'Bad Request' },
            message: { type: 'string', example: 'name is required' }
          }
        },
        Plan: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'plan_1' },
            name: { type: 'string', example: 'Plano ENEM 2026' },
            totalHoursStudied: { type: 'number', example: 12.5 },
            subjects: {
              type: 'array',
              items: { $ref: '#/components/schemas/Subject' }
            }
          }
        },
        Subject: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'subject_1' },
            name: { type: 'string', example: 'Matematica' },
            topics: {
              type: 'array',
              items: { type: 'string' },
              example: ['Equacoes', 'Funcoes']
            },
            topicsCount: { type: 'number', example: 2 },
            questionsSolved: { type: 'number', example: 45 }
          }
        },
        Session: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'session_1' },
            date: { type: 'string', format: 'date', example: '2026-06-24' },
            durationHours: { type: 'number', example: 2.5 },
            subjectId: { type: 'string', nullable: true, example: 'subject_1' },
            notes: { type: 'string', example: 'Revisao de exercicios' }
          }
        },
        CreatePlanInput: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', example: 'Plano ENEM 2026' }
          }
        },
        UpdatePlanInput: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Plano ENEM 2026 - Atualizado' }
          }
        },
        CreateSubjectInput: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', example: 'Historia' },
            topics: {
              type: 'array',
              items: { type: 'string' },
              example: ['Brasil Colonia', 'Republica Velha']
            },
            questionsSolved: { type: 'number', example: 10 }
          }
        },
        UpdateSubjectInput: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Historia Geral' },
            topics: {
              type: 'array',
              items: { type: 'string' },
              example: ['Idade Media']
            },
            questionsSolved: { type: 'number', example: 25 }
          }
        },
        CreateSessionInput: {
          type: 'object',
          required: ['date', 'durationHours'],
          properties: {
            date: { type: 'string', format: 'date', example: '2026-06-24' },
            durationHours: { type: 'number', example: 1.5 },
            subjectId: { type: 'string', example: 'subject_1' },
            notes: { type: 'string', example: 'Estudo focado em funcoes' }
          }
        },
        ProgressSummary: {
          type: 'object',
          properties: {
            period: { type: 'string', example: 'weekly' },
            referenceDate: { type: 'string', format: 'date', example: '2026-06-24' },
            totalHoursStudied: { type: 'number', example: 8 },
            sessionsCount: { type: 'number', example: 4 },
            sessions: {
              type: 'array',
              items: { $ref: '#/components/schemas/Session' }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec };
