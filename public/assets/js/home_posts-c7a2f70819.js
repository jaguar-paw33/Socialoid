{function createPost(){let t=$("#new-post-form");t.submit((function(e){e.preventDefault();$.ajax({type:"post",url:"/posts/create",data:t.serialize(),success:function(t){let e=$("#posts-list");post=function(t){return $(`\n                        <li id='post-${t._id}'>\n                        \n                        <p>\n                        \n                            <a class='delete-post-button' href="/posts/destroy/${t._id}">X</a>\n                               <small> ${t.content} </small>\n                        </p>\n                        <p>${t.user.name}</p>\n                    \n                        <p><a class='toggle-like-button' data-likes ='0' href="/likes/toggle?id=${t._id}&type=Post">0</a></p>\n                    \n                        <div>\n                    \n                            <form class='new-comment-form' action="/comments/create" method="POST">\n                                <input type="text" name='content' placeholder="Type Here to Comment" required>\n                                <input type="hidden" name='post_id' value=${t._id}>\n                                <input type="submit" value='Comment'>\n                            </form>\n                            \n                    \n                            <h4><em> Comments - </em></h4>\n                                <ul class='comments-list' id='post-${t._id}-comments-list'>\n                                \n                                </ul>\n                        </div>\n                    </li>\n                `)}(t.data.post),e.prepend(post),deletePost($(".delete-post-button",post)),new Comment(e),new toggleLike($(".toggle-like-button",post)),new Noty({theme:"relax",type:"success",text:"Posted Successfully",layout:"topRight",timeout:1e3}).show()},error:function(t){console.log("Error",t)}})}))}function deletePost(t){t.click((function(t){t.preventDefault();let e=$(this).prop("href");$.ajax({type:"get",url:e,success:function(t){$("#post-"+t.data.post_id).remove(),new Noty({theme:"relax",type:"success",text:"Deleted Successfully",layout:"topRight",timeout:1e3}).show()},error:function(t){console.log("Error",t)}})}))}function convertToAjax(){$("#posts-list").each((function(){deletePost($("li  .delete-post-button",$(this))),new Comment($(this))}))}convertToAjax(),createPost()}