$(() => {
    $('#title').focus();

    $('input').on('keydown', (e) => {
        const keyCode = e.which;
        const $target = $(e.target);
        if (actions.hasOwnProperty(keyCode)) {
            actions[keyCode]($target);
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
    13: ($target) => {
        const command = $target.val();
        if (command.trim().toLowerCase() === 'generate --stardate') {
            const now = Date.now();
            $('#command-history').append(
                `<p> Star Date for ${Date(now)} is ${now}</p>`
            );
        } else if (command.trim().toLowerCase() === 'help') {
            $('#command-history').append(
                `<p>generate {--stardate}</p><p>This command will create today's stardate the AIMLESS way.</p>`
            );
        } else {
            const command = $target.val();
            $('#command-history').append(
                `<p>Command ${command} was not found. Try running 'help'</p>`
            );
        }

        $target.val('');
    },
};
