module.exports = function (func) {
    return async function (req, res, next) {
       try {
           await func(req,res)
       }catch (err) {
           console.log(err)
           next(err)
       }
    }
}
