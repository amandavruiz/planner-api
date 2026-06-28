const express = require('express');
const planController = require('../controllers/planController');

const router = express.Router();

/**
 * @swagger
 * /api/plans:
 *   get:
 *     tags: [Plans]
 *     summary: Lista todos os planos de estudo
 *     responses:
 *       200:
 *         description: Lista de planos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plan'
 */
router.get('/', planController.listPlans);

/**
 * @swagger
 * /api/plans:
 *   post:
 *     tags: [Plans]
 *     summary: Cria um novo plano de estudo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePlanInput'
 *     responses:
 *       201:
 *         description: Plano criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plan'
 *       400:
 *         description: Erro de validacao
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', planController.createPlan);

/**
 * @swagger
 * /api/plans/{planId}:
 *   get:
 *     tags: [Plans]
 *     summary: Exibe detalhes de um plano de estudo
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes do plano
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plan'
 *       404:
 *         description: Plano nao encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:planId', planController.getPlanDetails);

/**
 * @swagger
 * /api/plans/{planId}:
 *   put:
 *     tags: [Plans]
 *     summary: Atualiza um plano de estudo
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
 *             $ref: '#/components/schemas/UpdatePlanInput'
 *     responses:
 *       200:
 *         description: Plano atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plan'
 *       400:
 *         description: Erro de validacao
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
router.put('/:planId', planController.updatePlan);

/**
 * @swagger
 * /api/plans/{planId}:
 *   delete:
 *     tags: [Plans]
 *     summary: Remove um plano de estudo
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Plano removido com sucesso
 *       404:
 *         description: Plano nao encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:planId', planController.deletePlan);

module.exports = router;
