const Service = require("../models/Service");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

const ajouterService = async (ser_nom, ser_code, chef_mat) => {
  const serviceByCode = await Service.findOne({ ser_code });
  if (serviceByCode) {
    throw new ErrorResponse("Service Already Exist", 401);
  }

  const user = await User.findOne({ matricule: chef_mat });
  if (!user) {
    throw new ErrorResponse("User Not Found", 404);
  }
  if (user.ischef) {
    throw new ErrorResponse("User Already Chef", 401);
  }

  const service = await Service.create({
    ser_nom,
    ser_code,
    chef_mat,
  });

  if (!service) {
    throw new ErrorResponse("Couldn't create Service", 402);
  }

  user.ischef = true;
  const updatedUser = await user.save();

  if (!updatedUser) {
    throw new ErrorResponse("Couldn't Update User", 402);
  }

  return service;
};
const getServices = async () => {
  const services = await Service.find();
  return services;
};
module.exports = {
  ajouterService,
  getServices,
};
