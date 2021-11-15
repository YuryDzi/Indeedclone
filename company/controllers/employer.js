/* eslint-disable no-underscore-dangle */
const { validationResult } = require('express-validator');
const { getPagination, errors } = require('u-server-utils');
const { Employer } = require('../model');
const { makeRequest } = require('../util/kafka/client');

const getAllEmployers = async (req, res) => {
  const { limit, offset } = getPagination(req.query.page, req.query.limit);

  const employersCount = await Employer.count().skip(offset).limit(limit);

  const employerList = await Employer.find({}).skip(offset).limit(limit);

  // TODO: get company object in response

  res.status(200).json({ total: employersCount, nodes: employerList });
};

const getEmployerById = async (req, res) => {
  const { id } = req.params;

  const employer = await Employer.findById(id);
  if (!employer) {
    res.status(404).json(errors.notFound);
    return;
  }

  // TODO: get company object in response

  res.status(200).json(employer);
};

const createEmployer = async (req, res) => {
  const { user } = req.headers;
  if (user !== req.body.id) {
    res.status(400).json({
      ...errors.badRequest,
      message: 'employer.id in body should be same as logged in user',
    });
    return;
  }

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  const employer = req.body;
  employer._id = employer.id;

  makeRequest('employer.create', employer, (err, resp) => {
    if (err || !resp) {
      console.log(err);
      res.status(500).json(errors.serverError);
      return;
    }

    res.status(201).json(resp);
  });
};

const updateEmployer = async (req, res) => {};

const deleteEmployer = async (req, res) => {};

module.exports = {
  getAllEmployers,
  getEmployerById,
  createEmployer,
  updateEmployer,
  deleteEmployer,
};
