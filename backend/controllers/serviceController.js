const ServiceService = require("../services/serviceService");
const asyncHandler = require("../middlewares/asyncMiddleware");

const ajouterService = asyncHandler(async (req, res, next) => {
  const { ser_nom, ser_code, chef_mat } = req.body;

  try {
    const service = await ServiceService.ajouterService(
      ser_nom,
      ser_code,
      chef_mat
    );
    res.status(200).json({
      _id: service._id,
      ser_nom: service.ser_nom,
      ser_code: service.ser_code,
      chef_mat: service.chef_mat,
      action: "Service Created",
    });
  } catch (error) {
    next(error);
  }
});
const getServices = asyncHandler(async (req, res, next) => {
  try {
    const services = await ServiceService.getServices();
    res.status(200).json({
      services: services,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = { ajouterService, getServices };
