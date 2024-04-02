const {Router} = require("express");

const multer = require("multer")
const uploadImage = require("../config/multer")
const upload = multer({storage : uploadImage.storage})
const {protect, authorize} = require("../middlewares/auth")

const router = Router();

const {createPost, allPosts, fetchSinglePost, updatePost, deletePost, updatePhoto} = require("../controller/PostController")




// router.post("/create-post", createPost)
router.post("/create-post",[protect,authorize("admin")], upload.single("photo"), createPost)
router.get("/all-posts", protect,allPosts)
router.get("/post/:id", fetchSinglePost)
router.put("/update-post/:id", updatePost )
router.delete("/delete-post/:id", deletePost)
router.patch("/update-photo/:id",upload.single("photo"), updatePhoto )

module.exports = router;