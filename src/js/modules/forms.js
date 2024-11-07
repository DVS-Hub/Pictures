// import checkNumInputs from "./checkNumInputs";

const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          textAreas = document.querySelectorAll('textarea'),
          upload = document.querySelectorAll('[name=upload]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! мы с Вами свяжемся',
        failure: 'Что-то пошло не так',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    }

    // checkNumInputs('input[name="user_phone"]');

    const postData = async (url, data) => {
        let response = await fetch(url, {
            method: 'POST',
            body: data
        });
        return await response.text();
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            let dots;
            const arr = item.files[0].name.split('.');
            arr[0].length > 6 ? dots = "..." : dots = ".";
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        });
    })


    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status'); 
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);
            
            const formData = new FormData(item);
            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;debugger
                })
                .catch(() => {
                    textMessage.textContent = message.failure;
                    statusImg.setAttribute('src', message.fail);
                })
                .finally(() => {
                    inputs.forEach(item => {
                        item.value = '';
                    });
                    textAreas.forEach(item => {
                        item.value = '';
                    });
                    upload.forEach(item => {
                        item.previousElementSibling.textContent = "Файл не выбран";
                    });
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.add('fadeInUp');
                        item.classList.remove('fadeOutUp');
                    },5000);
                });
        });
    });
}

export default forms;