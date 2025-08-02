const aboutSchema = require('../models/aboutModels');

exports.getAbout = async(req, res) => {
    //res.send('Hello from get about');
    //using asynch await method
//    try {
//     const about = await aboutSchema.find();
//     //console.log("about:::", about);
//     res.json(about);
//    } catch (error) {
//     res.status(500).json({msg: 'Oops! Server Error'});
//    }



   //using promise method
   aboutSchema.find()
   .then(about => res.json(about))
   .catch(err => res.status(400).json({msg:err}));
}

exports.addAbout = async(req, res) => {
    // res.send('Hello from add About');
    const {about} = req.body;
    //using asynch await method
    // try {
    //     const newAbout = new aboutSchema({about});
    //     await newAbout.save();
    //     res.json(newAbout);
    // } catch (error) {
    //     res.status(500).json({msg: 'Oops! Server Error'});
    // }

    //using promise method
    const newAbout = new aboutSchema({about});
    newAbout.save()
    .then(about => res.json(about))
    .catch(err => res.status(400).json({msg: err}));
}

exports.getAboutById = async (req, res) => {
    // res.send('Hello from get about  by id');
    //using asynch await method
    // try {
    //     const about = await aboutSchema.findById(req.params.id)
    //     res.json(about)
    // } catch (error) {
    //     res.status(500).json({msg: 'server error'})
    // }


    //using promise method
    aboutSchema.findById(req.params.id)
    .then(about => res.json(about))
    .catch(err => res.status(400).json({msg: err}));
}

exports.updateAboutById = async(req, res) => {
    // res.send('Hello from update about  by id');
    const {about} = req.body;
    //using async await method
    // try {
    //     const newAbout = await aboutSchema.findByIdAndUpdate(req.params.id, {about});
    //     let results = await newAbout.save();
    //     await results;
    //     res.json({msg: 'about is Updated!'})
    // } catch (error) {
    //     res.status(500).json({msg: 'server error'});
    // }


    //using promise method
    aboutSchema.findByIdAndUpdate(req.params.id, {about})
    .then(about => {
        if(!about) return res.status(400).status({msg: 'about not found'})
        return about.save();
    })
    .then(() => res.json({msg: 'about is updated!'}))
    .catch((err) => res.status(400).json({msg: err}))
}

exports.deleteAbout = async (req, res) => {
    // res.send('Hello from delete about ');

    // using async await method
    // try {
    //     const about = await aboutSchema.findByIdAndDelete(req.params.id)
    //     res.json({msg: 'about Deleted!'})
    // } catch (error) {
    //     res.status(500).json({msg:'server error'})
    // }

    // using promise method
    aboutSchema.findByIdAndDelete(req.params.id)
    .then(() => res.json({msg: 'about Deleted!'}))
    .catch(err => res.json({msg:err}))
}
