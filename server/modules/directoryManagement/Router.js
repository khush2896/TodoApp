import { createDirectory, findAllDirectories } from "./Handler";

export default router => {


  router.post('/create_directories', (req, res, next) => {


    let directory = {
      dir_type: req.body.dir_type,
      dir_name: req.body.dir_name,
      path: req.body.path
    }
    return createDirectory(directory)
      .then(data => {

        return res.status(data.statusCode).json({
          success: true,
          message: data.message,
          data: data.data
        });
      })

      .catch(err => {
        return res.status(err.statusCode).json({
          success: true,
          message: err.message || "INTERNAL SERVER ERROR",

        });
      })
  })

  router.post('/listall_data', (req, res, next) => {
    let path = req.body.path;
    return findAllDirectories(path)
      .then(data => {

        return res.status(data.statusCode).json({
          success: true,
          message: data.message,
          data: data.data
        });
      })
      .catch(err => {
        return res.status(err.statusCode).json({
          success: true,
          message: err.message || "INTERNAL SERVER ERROR",

        });
      })

  })


}