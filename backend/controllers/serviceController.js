import asyncHandler from '../middleware/asyncHandler.js';
import Service from '../models/serviceModel.js';

// @desc    Fetch all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Service.countDocuments({ ...keyword });
  const services = await Service.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ services, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single service
// @route   GET /api/services/:id
// @access  Public
const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (service) {
    return res.json(service);
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
const createService = asyncHandler(async (req, res) => {
  const service = new Service({
    name: 'Sample Service',
    price: 0,
    type: 'service',
    available: true,
    user: req.user._id,
    image: '/images/services/sample.jpg',
    category: 'Sample Category',
    numReviews: 0,
    description: 'Sample Service Description',
  });

  const createdService = await service.save();
  res.status(201).json(createdService);
});

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = asyncHandler(async (req, res) => {
  const { name, price, description, image, available, category } = req.body;

  const service = await Service.findById(req.params.id);

  if (service) {
    service.name = name;
    service.price = price;
    service.description = description;
    service.image = image;
    service.category = category;
    service.available = available;

    const updatedService = await service.save();
    res.json(updatedService);
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service) {
    await Service.deleteOne({ _id: service._id });
    res.json({ message: 'Service removed' });
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});


// @desc    Create new review
// @route   POST /api/services/:id/reviews
// @access  Private
const createServiceReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
  
    const service = await Service.findById(req.params.id);
  
    if (service) {
      const alreadyReviewed = service.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
  
      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Service already reviewed');
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
  
      service.reviews.push(review);
  
      service.numReviews = service.reviews.length;
  
      service.rating =
        service.reviews.reduce((acc, item) => item.rating + acc, 0) /
        service.reviews.length;
  
      await service.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Service not found');
    }
  });
  
  // @desc    Get top rated services
  // @route   GET /api/services/top
  // @access  Public
  const getTopServices = asyncHandler(async (req, res) => {
    const services = await Service.find({}).sort({ rating: -1 }).limit(3);
  
    res.json(services);
  });

export {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  createServiceReview,
  getTopServices
};
