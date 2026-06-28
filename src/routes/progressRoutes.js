const express = require('express');
const progressController = require('../controllers/progressController');

const router = express.Router();

/**
 * @swagger
 * /api/plans/{planId}/progress/sessions:
 *   post:
 *     tags: [Progress]
 *     summary: Registra uma sessao de estudo em um plano
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSessionInput'
 *     responses:
 *       201:
 *         description: Sessao registrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       400:
 *         description: Erro de validacao
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Plano ou disciplina nao encontrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/:planId/progress/sessions', progressController.createSession);

/**
 * @swagger
 * /api/plans/{planId}/progress:
 *   get:
 *     tags: [Progress]
 *     summary: Consulta progresso diario, semanal ou mensal de um plano
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly]
 *         example: weekly
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         example: '2026-06-24'
 *     responses:
 *       200:
 *         description: Resumo de progresso retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProgressSummary'
 *       400:
 *         description: Erro de validacao nos parametros
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Plano nao encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:planId/progress', progressController.getProgress);

module.exports = router;
