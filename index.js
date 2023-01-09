$(() => {
    $('#title').focus();

    $('input').on('keydown', (e) => {
        const keyCode = e.which;
        if (actions.hasOwnProperty(keyCode)) {
            actions[keyCode](e);
        }
    });

    $('#login-button').on('click', (e) => {
        const username = $('#username').val();
        const password = $('#password').val();
        const stickyNoteText = $('.password-manager').text().trim();

        if (
            username.toLowerCase() === 'paul2@theaamgroup.com' &&
            password === stickyNoteText
        ) {
            $('#login').addClass('hidden');
            $('#interface').removeClass('hidden');
        } else {
            $('.dev-oops').removeClass('hidden');
        }
    });

    $('#logout-button').on('click', (e) => {
        $('#login').removeClass('hidden');
        $('#interface').addClass('hidden');
    });
});

const actions = {
    13: (e) => {
        console.log(e);
    },
};
