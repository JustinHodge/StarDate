$(() => {
    $('input').first().focus();

    $('#interface').on('keydown', (e) => {
        const keyCode = e.which;
        const $target = $(e.target);
        if (interfaceActions.hasOwnProperty(keyCode)) {
            interfaceActions[keyCode]($target);
        }
    });

    $('#login').on('keydown', (e) => {
        const keyCode = e.which;
        const $target = $(e.target);

        if (loginActions.hasOwnProperty(keyCode)) {
            loginActions[keyCode]($target);
        }
    });

    $('.terminal-button.power').on('click', (e) => {
        attemptLogout();
        togglePower();
    });

    $('.terminal-button.reset').on('click', (e) => {
        attemptLogout();
        togglePower();

        setTimeout(() => {
            togglePower();
        }, 1000);
    });

    $('#login-button').on('click', attemptLogin);

    $('#logout-button').on('click', attemptLogout);
});

const togglePower = () => {
    $('.scanline').toggleClass('power-off');
    $('.overlay').toggleClass('power-off');
    $('.wrapper').toggleClass('power-off');
    $('.scanline').toggleClass('power-up');
    $('.overlay').toggleClass('power-up');
    $('.wrapper').toggleClass('power-up');
    $('.power-led').toggleClass('power-on');
};

const attemptLogout = () => {
    $('#login').removeClass('hidden');
    $('#interface').addClass('hidden');
    $('#login-button').removeClass('hidden');
    $('#logout-button').addClass('hidden');
    $('#login').find('input').first().focus();
    $('.dev-oops').addClass('hidden');
    $('#command-history').empty();
};

const attemptLogin = () => {
    const username = $('#username').val();
    const password = $('#password').val();
    const stickyNoteText = $('.password-manager').text().trim();

    if (
        username.toLowerCase() === 'paul2@theaamgroup.com' &&
        password === stickyNoteText
    ) {
        $('#login').addClass('hidden');
        $('#interface').removeClass('hidden');
        $('#login-button').addClass('hidden');
        $('#logout-button').removeClass('hidden');
        $('#interface').find('input').first().focus();
    } else {
        $('.dev-oops').removeClass('hidden');
    }

    $('#password').val('');
};

const interfaceActions = {
    13: ($target) => {
        const command = $target.val();
        if (command.trim().toLowerCase() === 'generate') {
            const now = Date.now();
            const stardate = generateStardate(now);
            $('#command-history').append(
                `<p> Star Date for ${Date(now)} is ${stardate}</p>`
            );
        } else if (command.trim().toLowerCase() === 'help') {
            $('#command-history').append(
                `<p>generate</p><p>This command will create today's stardate the AIMLESS way.</p>`
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

const loginActions = {
    13: ($target) => {
        const $userInput = $('#username');
        const $passwordInput = $('#password');

        if ($userInput.val().length && $passwordInput.val().length) {
            attemptLogin();
            return;
        }

        if ($userInput.val().length) {
            $passwordInput.focus();
        }

        if ($passwordInput.val().length) {
            $userInput.focus();
        }
    },
};

const generateStardate = (now) => {
    if (now % 100 === 42) {
        return 'Obviously 42 is the answer';
    }

    parts = [];

    for (let i = 0; i <= now.toString().length; i++) {
        if (Math.random() < 0.5) {
            parts.push((Math.random() + 1).toString(36).substring(2, 3));
        } else {
            parts.push(now.toString().charAt(i));
        }
        if (i === now.length - 1) {
            continue;
        }

        if (Math.random() < 0.15) {
            parts.push('.');
        } else if (Math.random() < 0.05) {
            parts.push('/');
        }
    }

    return parts.join('');
};
