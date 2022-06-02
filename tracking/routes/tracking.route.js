/* eslint-disable newline-per-chained-call */
const express = require('express');
const { body } = require('express-validator');
const {
  getTracking,
  createTracking,
  getTrackingById,
  updateTracking,
  deleteTracking,
} = require('../controllers/tracking');

const router = express.Router();

/**
 * @typedef Tracking
 * @property {string} jobId.required
 * @property {string} userId.required
 * @property {string} resume.required
 * @property {string} coverLetter.required
 * @property {object} answers.required
 */

const bodyValidators = () => [
  body('jobId').exists().isString(),
  body('userId').exists().isString(),
  body('resume').exists().isString(),
  body('coverLetter').exists().isString(),
  body('answers').isObject(),
];

const updateValidators = () => [
  body('resume').optional().isString(),
  body('coverLetter').optional().isString(),
  body('answers').optional().isObject(),
  body('status').optional().isString(),
];

/**
 * Get list of Tracking
 * @route GET /tracking
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} userId.query
 * @param {string} jobIds.query
 * @group Tracking
 * @security JWT
 * @returns {Array.<Tracking>} 200 - List of Tracking info
 */
router.get('/', getTracking);

/**
 * Create a Tracking
 * @route POST /tracking
 * @group Tracking
 * @security JWT 
 * @param {Tracking.model} Tracking.body.require
 * @returns {Tracking.model} 201 - Created Tracking
 */
router.post('/', ...bodyValidators(), createTracking);

/**
 * Get Tracking by ID
 * @route GET /Tracking/{id}
 * @group Tracking
 * @security JWT
 * @param {string} id.path.require
 * @returns {Tracking.model} 200 - Tracking for given ID
 */
router.get('/:id', getTrackingById);

// /**
//  * Update Tracking by ID
//  * @route PUT /Tracking/{id}
//  * @group Tracking
//  * @security JWT
//  * @param {string} id.path.require
//  * @param {Tracking.model} Tracking.body.require
//  * @returns {Tracking.model} 200 - Updated Tracking
//  */
// router.put('/:id', ...updateValidators(), updateTracking);

// /**
//  * Delete Tracking by ID
//  * @route DELETE /Tracking/{id}
//  * @group Tracking
//  * @security JWT
//  * @param {string} id.path.require
//  * @returns {null} 200 - Delete Tracking
//  */
// router.delete('/:id', deleteTracking);

module.exports = router;
