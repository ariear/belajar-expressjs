const User = require('../model/user')

//  penulisan controller
module.exports = {
    index: async (request , response) => {
        let keyword = {}
        
        if (request.query.keyword) {
            keyword = { nama : {
                $regex : request.query.keyword,
                $options: 'i'
            }}
        }

        response.render('users/index',{
            siswa : await User.find(keyword)
        })
    },
    detail: async (request , response) => {
        const anjim = await User.find({_id : request.params.id})
        response.render('users/detail',{
            detaildata: anjim
        })
    },
    post: (request , response) => {
        const user = new User({
            nama: request.body.nama,
            kelas: request.body.kelas,
            email: request.body.email,
            password: request.body.password
        })

        user.save(function (err , data) {
            if (err) return handleError(err);
            
            console.log(data);
          })

        response.redirect('/users')
    },
    edit: async (request , response) => {
        const data = await User.find({_id : request.params.id})

        response.render('users/update',{
            datasiswa: data
        })
    },
    put: async (request , response) => {
        const dataupdate = await User.updateOne({_id : request.params.id},{
            nama : request.body.nama,
            kelas: request.body.kelas,
            email: request.body.email,
            password: request.body.password
        })
        dataupdate.matchedCount; // Number of documents matched
        dataupdate.modifiedCount; // Number of documents modified
        dataupdate.acknowledged; // Boolean indicating everything went smoothly.
        dataupdate.upsertedId; // null or an id containing a document that had to be upserted.
        dataupdate.upsertedCount    

        response.redirect('/users')
    },
    create: (request , response) => {
        response.render('users/create')
    },
    delete: async (request , response) => {
        await User.deleteOne({_id : request.params.id})

        response.redirect('/users')
    }
}