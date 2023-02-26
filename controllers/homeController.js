const asyncHandler = require("../middlewares/errorHandler")
const HomeInfo = require("../models/HomeModel")

const homeInfo = async (req, res, next) => {
  try {
    if (req.session.loggedin) {
      let id = 1;
      let IMAGEURL = process.env.IMAGEURL + 'uploads/homeInfo/';
      
      let results = await HomeInfo.findOne({ id: id });
      res.render('homeInfo/edit', {
        result: results,
        data: 'Homepage Management',
        IMAGEURL: IMAGEURL,
      });
    } else {
      res.redirect('/');
    }
  } catch (error) {
    res.send('Error' + error);
  }
};
const updateHomeInfo = async (req, res, next) => {
    
  try {
    const id =  req.body.userId;
    console.log(id)
    const params = {
      title: req.body.title_name,
      name: req.body.name,
      description: req.body.description,
    };
    if (req.files != null) {
      try {
        let profile_image = req.files.profile_image;
        let filename2 = Date.now() + profile_image.name;
        filename2 = filename2.replace(/\s/g, '_');
        let UpladStatus = profile_image.mv(
          './public/uploads/homeInfo/' + filename2
        );
        if (UpladStatus) {
          params.image = filename2;
        }
        
      } catch (err) {
        return res.send('File upload failed');
      }
      
    }

    try {
      //const updatedResult = await HomeInfo.create(params);
      const updatedResult = await HomeInfo.findByIdAndUpdate(id,{$set:params},{new:true})
      if(updatedResult){
          res.send('Record Updated');
      }
      
    } catch (err) {
      res.send('Something went wrong' + err);
    }
  } catch (err) {
    res.send('Something went wrong' + err);
  }
};

module.exports = {
  homeInfo,
  updateHomeInfo,
};
