
# [Jepretgram](http:/jepretgram.wahibhanii.xyz)

A photo sharing app
[jepretgram.wahibhanii.xyz](http:/jepretgram.wahibhanii.xyz)
____________________
## App Usage 

### Page
  - regular signup using email
  - regular login 
  - timeline: only shows post from yourserlf and people you follow
  - explore:
    - posts: see all posts 
    - users: see all users
  - Jepret: take and upload a picture
  - My Profile: shows user email, followed users and followers
## Feature
  - __Jepret!__: Post a picture ('Jepret') and send it to timeline, you can also modify and delete photos.
  - __caption__: shows caption of the photo, user's who own the post may edit this
  - __Like/unlike__: 
    - you can like and unlike post. 
    - Post you've liked will show pink thumb up icon, pink if you've unliked it. 
    - You can see who's liking a post by hovering it to the __likes count__ 
  - __comment__: yaou can see comment by clicking __more__ on the bottom right of the post/photo card. 
    - You can add comment byt typing onto the comment field and press enter.
    - you can also delete comment
  - __Follow Unfollow__: you can follow and unfollow people by navigating to `explore/users` page.
    - You will see posts from pople you follow on your timeline
    - you will see different button depend on whether you have followed a person

-------
# JEPRETGRAM API
## Users API
### List of Users API endpoint:
| Route                       | HTTP   | Description                         | 
| -------------------------   |:------ | ----------------------------------- |
| `/users/login`              | POST   | Regular Login, returns access token |
| `/users/`                   | GET    | Find All users                      |
| `/users/id`                 | GET    | Find one user by ID                 |
| `/users/`                   | POST   | Create new User / Signup            |
| `/users/:id`                | DELETE | Delete User                         |
| `/users/:id/`               | PUT    | Edit user                           |
| `/users/followunfollow/:id` | PUT    | Follow or unfollow user             |

### Endpoint Usage
- POST : `/users/login`
  - req.body.email: should contain user's email
  - req.bpdy.password: should contain user's password
- GET : `/users/`
- GET : `/users/:id` 
- POST : `/users/`
  - req.body.email: should contain user's email
  - req.body.userName: should contain user's username
  - req.bpdy.password: should contain user's password
- DELETE : `/users/:id`  
- PUT : `/users/:id/`
  - req.body.update: should contain updated filed and it's value (write in stringified JSON)
- PUT : `/users/followunfollow/:id`
  - req.params.id: id of the target user

## Post API
### List of Posts API endpoint:
| Route                   | HTTP   | Description              | 
| ----------------------- |:------ | -----------------------  |
| `/posts/`               | GET    | Get all posts            |
| `/posts/timeline`       | GET    | Get user timeline posts  |
| `/posts/`               | POST   | Create new post          |
| `/posts/:id`            | DELETE | Delete a post            |
| `/posts/:id/`           | PUT    | Edit a post              |
| `/posts/:id/editcaption`| PUT    | Edit post's caption      |
| `/posts/:id/likeunlike` | PUT    |like or unlike post       |
| `/posts/:id/comment`    | PUT    | add comment to post      |
| `/posts/:id/uncomment`  | PUT    | remove comment from post |

### Endpoint Usage
- GET : `/posts/` 
  - 
- GET : `/posts/timeline`
  - req.headers.token: contain token from login
- POST : `/posts/` 
  - req.headers.token: contain token from login
  - req.body.caption: contain caption
  - req.file: contain photo/image you want to post
- DELETE : `/posts/:id`  
  - req.headers.token: contain token from login
- PUT : `/posts/:id/`
  - req.headers.token: contain token from login
  - req.body.update: should contain updated field and it's value (write in stringified JSON)
- PUT : `/posts/:id/editcaption`
  - req.headers.token: contain token from login
  - req.body.caption: should contain caption and it's value (write in stringified JSON)
- PUT : `/posts/:id/likeunlike`
  - req.headers.token: contain token from login
  - req.params.id: target post's ID
- PUT : `/posts/:id/comment`
  - req.headers.token: contain token from login
  - req.body.comment: comment you want o send
  - req.params.id: target post's ID
- PUT : `/posts/:id/uncomment`
  - req.headers.token: contain token from login
  - req.params.id: target post's ID

## UserComment API
### List of UserComment API endpoint:
| Route                           | HTTP   | Description                       | 
| ---------------------------     |:------ | --------------------------------- |
| `/usercomments/:id/editcomment` | PUT    | Edit a comment *                  |
*this feature currently not being used

### Endpoint Usage
- PUT : `/usercomments/:id/editcomment` 
  - req.headers.token: contain token from login
  - req.body.update: should contain updated field and it's value (write in stringified JSON)

Access the website via [jepretgram.wahibhanii.xyz](http:/jepretgram.wahibhanii.xyz) or API via `http://35.192.12.158`
