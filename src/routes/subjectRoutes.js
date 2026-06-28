const express = require('express');
const subjectController = require('../controllers/subjectController');

const router = express.Router();

/**
 * @swagger
 * /api/plans/{planId}/subjects:
 *   get:
 *     tags: [Subjects]
 *     summary: Lista disciplinas de um plano
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de disciplinas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subject'
 *       404:
 *         description: Plano nao encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:planId/subjects', subjectController.listSubjects);

/**
 * @swagger
 * /api/plans/{planId}/subjects:
 *   post:
 *     tags: [Subjects]
 *     summary: Adiciona disciplina a um plano
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
 *             $ref: '#/components/schemas/CreateSubjectInput'
 *     responses:
 *       201:
 *         description: Disciplina criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
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
router.post('/:planId/subjects', subjectController.createSubject);

/**
 * @swagger
 * /api/plans/{planId}/subjects/{subjectId}:
 *   get:
 *     tags: [Subjects]
 *     summary: Exibe detalhes de uma disciplina
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes da disciplina
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 *       404:
 *         description: Plano ou disciplina nao encontrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:planId/subjects/:subjectId', subjectController.getSubjectDetails);

/**
 * @swagger
 * /api/plans/{planId}/subjects/{subjectId}:
 *   put:
 *     tags: [Subjects]
 *     summary: Atualiza uma disciplina
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSubjectInput'
 *     responses:
 *       200:
 *         description: Disciplina atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
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
router.put('/:planId/subjects/:subjectId', subjectController.updateSubject);

/**
 * @swagger
 * /api/plans/{planId}/subjects/{subjectId}:
 *   delete:
 *     tags: [Subjects]
 *     summary: Remove uma disciplina
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Disciplina removida com sucesso
 *       404:
 *         description: Plano ou disciplina nao encontrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:planId/subjects/:subjectId', subjectController.deleteSubject);

module.exports = router;
