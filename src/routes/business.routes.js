const { Router } = require('express');
const { getBusinesses, getBusinessById, createBusiness, deleteBusiness } = require('../controllers/business.controller');
const router = new Router();

/* Admin */
router.get('/', getBusinesses);
router.post('/', createBusiness);
router.get('/:bid', getBusinessById);
router.delete('/:bid', deleteBusiness);

module.exports = router;