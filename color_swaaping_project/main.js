const buttons = document.querySelectorAll('.button');
const body = document.querySelector('body');

buttons.forEach(function (button) {
    console.log(button);
    button.addEventListener('click', function (ironman) {
        console.log(ironman);
        console.log(ironman.target);

        switch (ironman.target.id) {
            case 'grey':
                body.style.backgroundColor = 'grey';
                break;
                case 'white':
                    body.style.backgroundColor = 'white';
                    break;
            case 'red':
                body.style.backgroundColor = 'red';
                break;
            case 'gold' :
                body.style.backgroundColor = 'gold';
                break ;
            case 'blue':
                body.style.backgroundColor = 'blue';
                break;
            default:
                body.style.backgroundColor = 'yellow';
        }
    });
});
