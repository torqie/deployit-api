const db = require('../../database/models');

exports.all = ((req, res) => {
  db.User.find().then(users => {
    return res.status(200).json({
      success: true,
      data: users
    });
  });
});

exports.find = ((req, res) => {
  db.User.findById(req.params.id).select('-password').then(user => {

    return res.status(200).json({
      success: true,
      data: user
    });
  });
})