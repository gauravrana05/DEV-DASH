const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const App = require("../models/App");

const getAllApps = async (req, res) => {
  const apps = await App.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ apps });
};
const getApp = async (req, res) => {
  const {
    user: { userId },
    params: { id: appId },
  } = req;

  const app = await App.findOne({
    _id: appId,
    createdBy: userId,
  });
  if (!app) {
    throw new NotFoundError(`No job with id ${appId}`);
  }
  res.status(StatusCodes.OK).json({ app });
};

const createApp = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const app = await App.create(req.body);
  res.status(StatusCodes.CREATED).json({ app });
};

const updateApp = async (req, res) => {
  const {
    body: { appName, providers },
    user: { userId },
    params: { id: appId },
  } = req;

  if (appName === "" || providers.length === 0) {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }
  const app = await App.findByIdAndUpdate(
    { _id: appId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!app) {
    throw new NotFoundError(`No job with id ${appId}`);
  }
  res.status(StatusCodes.OK).json({ app });
};

const deleteApp = async (req, res) => {
  const {
    user: { userId },
    params: { id: appId },
  } = req;

  const app = await App.findByIdAndRemove({
    _id: appId,
    createdBy: userId,
  });
  if (!app) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  createApp,
  deleteApp,
  getAllApps,
  updateApp,
  getApp,
};
