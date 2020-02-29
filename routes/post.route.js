
const express =require('express')
const router=express.Router()
const postController=require('../controllers/post.controller')


router.route("/").post(postController.addPost)
                .get(postController.allPosts)

router.route("/:id").get(postController.singlePost)
router.route("/addMembersToPost").post(postController.addReadersToPost)
module.exports=router