const Beach = require('../models/beach');


exports.getBeachByName = async (req, res) => {
  try {
    const beachName = decodeURIComponent(req.params.name); 

    const beach = await Beach.findOne({ name: beachName });

    if (beach) {
      res.json(beach);
    } else {
      res.status(404).json({ message: 'Beach not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
