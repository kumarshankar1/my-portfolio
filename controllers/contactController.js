const Sequelize = require('sequelize');
const Contact = require('../config/db').contactme;
const sequelize = require('../config/db').sequelize;

const contactme = async (req, res, next) => {
    try {
      if (req.session.loggedin) {
        let id = req.query.id;
        let IMAGEURL = process.env.IMAGEURL + 'uploads/contact/';
        
        let results = await Contact.findOne({ where: { id: id } });
        res.render('contact/edit', {
          contact: results,
          data: 'Edit Contact',
          IMAGEURL: IMAGEURL,
        });
      } else {
        res.redirect('/admin');
      }
    } catch (error) {
      res.send('Error' + error);
    }
  };

const updateContactMe = async(req, res, next) => {
    try {
        if (req.session.loggedin) {
            let info = {
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
            }
            let id = req.body.userId;
            if (req.files != null) {
                try {
                  let image = req.files.image;
                  let filename = Date.now() + image.name;
                  filename = filename.replace(/\s/g, '_');
                  let UpladStatus = image.mv(
                    './public/uploads/contact/' + filename
                  );
                  if (UpladStatus) {
                    info.resume = filename;
                  }
                  
                } catch (err) {
                  return res.send('File upload failed');
                }
                
              }
            const results = await Contact.update(info, { where: { id: id } })
            res.send('Record Updated');
        } else {
            res.redirect('/');
        }
    } catch (error) {
        res.send('Error' + error)
    }

}


module.exports = {
    contactme,
    updateContactMe
    
};