
$(() => {

    if ($('#header-content')[0].offsetWidth > document.documentElement.clientWidth) {

        $('#navigation')[0].style.display = 'none'

    } else {
        
        $('#navigation-hamburger')[0].style.display = 'none'
    }
})

$('#navigation-hamburger').on('click', () => {

    let list = $('#navigation-hamburger-list')[0]

    if (list.style.maxHeight) {

        list.style.maxHeight = null

    } else {

        list.style.maxHeight = `${list.scrollHeight}px`
    }
})