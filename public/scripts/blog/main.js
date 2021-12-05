
$('button').on('click', () => {

    $.get('/blog/posts/fetchpost', (result) => {

        $('body').append(result)
    })
})