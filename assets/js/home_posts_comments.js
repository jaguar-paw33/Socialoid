class Comment{
    constructor(postsContainer)
    {
        this.postsContainer = postsContainer
        this.commentForm = $('.new-comment-form', postsContainer);

        this.createComment();
        
        let self = this;

        $('.delete-comment-button',postsContainer).each(function(){
            self.deleteComment($(this));
        })
            
        
    }

    createComment(){
        let self = this;
        this.commentForm.submit(function(e){
           
            e.preventDefault();

            let newComment = function(comment){
           
                return $(`
                <li id='comment-${comment._id}'>
                <p>
                    <a class='delete-comment-button' href="/comments/destroy/${comment._id}">DEL</a>
                    ${comment.content}
                </p>
                <p>${comment.user.name}</p>
              
                    <p><a data-likes = 0 href="/likes/toggle?id=${comment._id}&type=Comment">0</a></p>
                 
                </li>
                `)
            }

            $.ajax({
                type:'post',
                url:'/comments/create',
                data: self.commentForm.serialize(),
                success:function(data){
                  
                   let comment = newComment(data.data.comment);
                   let postsContainer = $('.comments-list', self.postsContainer);
                   postsContainer.prepend(comment);
                   let deleteButton= $('.delete-comment-button', comment);
                   self.deleteComment(deleteButton);
                   return;
                
                },error:function(err){
                    console.log('Error', err);
                    
                }
            })
        })
    }

    deleteComment(deleteButton){
        
        deleteButton.click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:deleteButton.prop('href'),
                success:function(data){
                   
                    $(`#comment-${data.data.comment_id}`).remove();
                    return;
                },error:function(err){
                    console.log('Error', err);
                    return;
                }
            })
        })
    }

}