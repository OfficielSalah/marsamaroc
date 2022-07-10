const Service = require("../models/Service");
const asyncHandler = require("../middlewares/asyncMiddleware");

const ajouterService = asyncHandler(async (req, res) => {
  const { ser_nom, ser_code, chef_id } = req.body;

  const serviceExist = await Service.findOne({ ser_code });
  if (serviceExist) {
    res.status(403);
    throw new Error("Service Already Exist");
  }
  const service = new Service({ ser_code, ser_nom, chef_id });
  const createdService = await service.save();

  if (createdService) {
    res.json({
      ser_nom: createdService.ser_nom,
      ser_code: createdService.ser_code,
      chef_id: createdService.chef_id,
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});
const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find();
  res.json({ services });
});

module.exports = { ajouterService, getServices };
