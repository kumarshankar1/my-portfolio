const asyncHandler = require("../middlewares/errorHandler")
const Project = require("../models/ProjectModel")

const getProject = async(req, res, next) => {
    try {
        if (req.session.loggedin) {
            let results = await Project.find();
            let IMAGEURL = process.env.IMAGEURL + 'uploads/project/';
            
            res.render('projects/index', { project: results,IMAGEURL:IMAGEURL, data: 'Project List' });

        } else {
            res.redirect('/');
        }

    } catch (err) {
        res.send('Error' + err);
    }
}
const addProject = (req, res, next) => {
    try {
        if (req.session.loggedin) {
            res.render('projects/add',{data: 'Add Project'});
        } else {
            res.redirect('/'); 
        }
    } catch (err) {
        res.send('Error' + err);
    }
}
const createProject = async(req, res, next) => {
    try {
        if (req.session.loggedin) {
            let info = {
                title: req.body.name,
                site_url: req.body.site_url,
                description: req.body.description,
            }
            if (req.files != null) {
                try {
                  let image = req.files.image;
                  let filename = Date.now() + image.name;
                  filename = filename.replace(/\s/g, '_');
                  let UpladStatus = image.mv(
                    './public/uploads/project/' + filename
                  );
                  if (UpladStatus) {
                    info.image = filename;
                  }
                  
                } catch (err) {
                  return res.send('File upload failed');
                }
                
              }
          
            const results = await Project.create(info)
            res.send("Record Added");

        } else {
            res.redirect('/');
        }
    } catch (err) {
        res.send('Error' + err);
    }
}

const editProject = async(req, res, next) => {
    try {
        if (req.session.loggedin) {
            let id = req.query.id;
            let results = await Project.findById({ _id: id } );
            let IMAGEURL = process.env.IMAGEURL + 'uploads/project/';
            res.render('projects/edit', { project: results, data: 'Edit Project', IMAGEURL:IMAGEURL });

        } else {
            res.redirect('/');
        }
    } catch (error) {
        res.send('Error' + error)
    }
}
const updateProject = async(req, res, next) => {
    try {
        if (req.session.loggedin) {
            let info = {
                title: req.body.name,
                site_url: req.body.site_url,
                description: req.body.description,
            }
            let id = req.body.userId;
            if (req.files != null) {
                try {
                  let image = req.files.image;
                  let filename = Date.now() + image.name;
                  filename = filename.replace(/\s/g, '_');
                  let UpladStatus = image.mv(
                    './public/uploads/project/' + filename
                  );
                  if (UpladStatus) {
                    info.image = filename;
                  }
                  
                } catch (err) {
                  return res.send('File upload failed');
                }
                
              }
            const results = await Project.findByIdAndUpdate(id,{$set:info},{new:true})
            res.send('Record Updated');
        } else {
            res.redirect('/');
        }
    } catch (error) {
        res.send('Error' + error)
    }

}
const deleteData = async(req, res, next) => {
    try {
        if (req.session.loggedin) {
            let id = req.body.id;
            let results = await Project.findByIdAndDelete({_id:id})
            res.send('Deleted');

        } else {
            res.redirect('/');
        }
    } catch (err) {
        res.send('Error' + err);
    }
}
const updateStatusData = async(req, res, next) => {
    try {
        if (req.session.loggedin) {
            let id = req.body.id;
            let updatInfo = {
                status:req.body.status,
            }
            const results = await Project.findByIdAndUpdate(id,{$set:updatInfo})
            res.send('Record Updated');
        } else {
            res.redirect('/');
        }
    } catch (err) {
        res.send('Error' + err);
    }
}

module.exports = {
    getProject,
    addProject,
    createProject,
    editProject,
    updateProject,
    deleteData,
    updateStatusData,
};