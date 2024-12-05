document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const agradecimento = document.getElementById('agradecimento');
    const nomeInput = document.getElementById('nome');
    const whatsappLink = document.getElementById('whatsappLink');
    const whatsappNumber = "5522988225546"; // Substitua pelo número do WhatsApp sem símbolos.
    const selectedNumbers = new Set();
    const selectedNumbersList = document.getElementById('selectedNumbersList'); // Referência ao local onde a lista será exibida

    // Verificar se há números escolhidos no localStorage e atualizá-los
    Object.keys(localStorage).forEach(key => {
        if (key !== 'name' && key !== 'whatsapp') {
            const button = document.querySelector(`button[data-number="${key}"]`);
            if (button) {
                button.style.backgroundColor = '#FF6347'; // Cor para bolinha escolhida
                button.disabled = true; // Desabilitar bolinha escolhida
                addNumberToFooter(key); // Adicionar número ao rodapé
            }
        }
    });

    // Criar botões de 1 a 100 e configurar suas cores
    for (let i = 1; i <= 100; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.dataset.number = i;

        // Verificar se o número já foi escolhido e definir a cor
        if (localStorage.getItem(i)) {
            button.style.backgroundColor = '#FF6347'; // Cor fixa para números já escolhidos
            button.disabled = true; // Desabilitar o botão se já foi escolhido
            addNumberToFooter(i); // Adicionar número ao rodapé
        }

        button.addEventListener('click', () => {
            // Se o número já foi escolhido, não faz nada
            if (localStorage.getItem(i)) {
                return;
            }

            // Se o número não foi selecionado, marcar e mudar a cor
            selectedNumbers.add(i);
            button.style.backgroundColor = '#BC8F8F'; // Cor ao selecionar

            // Adicionar o número à lista no rodapé
            addNumberToFooter(i);
        });

        grid.appendChild(button);
    }

    // Função para adicionar números ao rodapé
    function addNumberToFooter(number) {
        const numberElement = document.createElement('span');
        numberElement.textContent = number;
        selectedNumbersList.appendChild(numberElement);
    }

    // Botão "Confirmar Escolha"
    document.getElementById('submit').addEventListener('click', () => {
        const nome = nomeInput.value.trim();
        if (selectedNumbers.size > 0 && nome !== '') {
            const numeros = [...selectedNumbers].join(', ');
            const mensagem = `Obrigado por participar! Você escolheu os números: ${numeros}.`;
            agradecimento.textContent = mensagem;

            // Salvar os números escolhidos no LocalStorage para não serem reescolhidos
            selectedNumbers.forEach(number => {
                localStorage.setItem(number, true);  // Salva no localStorage
            });

            // Bloquear os números escolhidos após a confirmação
            const buttons = document.querySelectorAll('.grid button');
            buttons.forEach(button => {
                const number = parseInt(button.textContent);
                if (selectedNumbers.has(number)) {
                    button.disabled = true; // Bloquear o botão
                    button.style.backgroundColor = '#FF6347'; // Cor fixa para números já escolhidos
                }
            });

            // Criar a mensagem para o WhatsApp
            const whatsappMessage = `Olá! Meu nome é ${nome}. Eu escolhi os seguintes números na Chá Rifa do Heitor: ${numeros}.`;
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;

            // Atualizar o link do WhatsApp e mostrá-lo
            whatsappLink.href = whatsappUrl;
            whatsappLink.style.display = 'block';
            whatsappLink.textContent = 'Clique aqui para enviar a mensagem no WhatsApp com seu nome e números escolhidos';
        } else {
            agradecimento.textContent = 'Por favor, escolha pelo menos um número e preencha seu nome.';
        }
    });

    // Botão "Efetuar Pagamento"
    document.getElementById('pay').addEventListener('click', () => {
        window.open('https://linkpix.pro/Elenilson_Alves_Da_Costa/Nova_Friburgo/+5522992274907/3000/charifaheitor/1322', '_blank');
    });
});
