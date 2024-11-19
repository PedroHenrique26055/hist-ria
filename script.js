document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const params = new URLSearchParams(window.location.search);
    const currentStep = params.get('step') || 'inicio';
    const lastStep = localStorage.getItem('lastStep') || 'inicio';

    const story = {
        inicio: {
            title: 'O Guerreiro e o Dragão',
            text: 'Você é um guerreiro em busca de tesouros ancestrais. Você ouve boatos sobre um dragão guardando um grande tesouro. O que você faz?',
            options: [
                { text: 'Investigar os boatos', step: 'investigar' },
                { text: 'Ignorar e seguir em frente', step: 'ignorar' }
            ]
        },
        investigar: {
            title: 'Investigando os Boatos',
            text: 'Você decide investigar os boatos e descobre que o dragão realmente existe. Você se prepara para enfrentá-lo. O que você faz?',
            options: [
                { text: 'Enfrentar o dragão', step: 'enfrentar' },
                { text: 'Fugir', step: 'fugir' }
            ]
        },
        ignorar: {
            title: 'Seguindo em Frente',
            text: 'Você decide ignorar os boatos e seguir em frente. No caminho, você encontra um mercador que oferece uma espada mágica. O que você faz?',
            options: [
                { text: 'Comprar a espada', step: 'comprar_espada' },
                { text: 'Recusar a oferta', step: 'recusar_espada' }
            ]
        },
        enfrentar: {
            title: 'Enfrentando o Dragão',
            text: 'Você enfrenta o dragão em uma batalha épica. Após uma luta intensa, você consegue derrotá-lo e encontra o tesouro. Parabéns, você venceu!',
            options: [
                { text: 'Recomeçar a aventura', step: 'inicio' }
            ]
        },
        fugir: {
            title: 'Fugindo do Dragão',
            text: 'Você decide fugir do dragão. No caminho, você encontra uma caverna misteriosa. O que você faz?',
            options: [
                { text: 'Entrar na caverna', step: 'caverna' },
                { text: 'Continuar fugindo', step: 'continuar_fugindo' }
            ]
        },
        comprar_espada: {
            title: 'Comprando a Espada',
            text: 'Você compra a espada mágica do mercador. Com a nova arma, você se sente mais confiante para enfrentar o dragão. O que você faz?',
            options: [
                { text: 'Voltar e enfrentar o dragão', step: 'enfrentar' },
                { text: 'Continuar sua jornada', step: 'continuar_jornada' }
            ]
        },
        recusar_espada: {
            title: 'Recusando a Espada',
            text: 'Você recusa a oferta do mercador e continua sua jornada. No caminho, você encontra um grupo de bandidos. O que você faz?',
            options: [
                { text: 'Lutar contra os bandidos', step: 'lutar_bandidos' },
                { text: 'Fugir dos bandidos', step: 'fugir_bandidos' }
            ]
        },
        caverna: {
            title: 'Dentro da Caverna',
            text: 'Você entra na caverna e encontra um artefato mágico que aumenta sua força. O que você faz?',
            options: [
                { text: 'Usar o artefato e enfrentar o dragão', step: 'enfrentar' },
                { text: 'Guardar o artefato e continuar fugindo', step: 'continuar_fugindo' }
            ]
        },
        continuar_fugindo: {
            title: 'Continuando a Fuga',
            text: 'Você continua fugindo e eventualmente encontra um vilarejo seguro. Você decide viver uma vida tranquila longe de aventuras. Fim.',
            options: [
                { text: 'Recomeçar a aventura', step: 'inicio' }
            ]
        },
        continuar_jornada: {
            title: 'Continuando a Jornada',
            text: 'Você continua sua jornada e encontra um reino em perigo. O rei pede sua ajuda para derrotar um exército invasor. O que você faz?',
            options: [
                { text: 'Ajudar o rei', step: 'ajudar_rei' },
                { text: 'Recusar e seguir em frente', step: 'seguir_em_frente' }
            ]
        },
        lutar_bandidos: {
            title: 'Lutando contra os Bandidos',
            text: 'Você luta bravamente contra os bandidos e consegue derrotá-los. Você encontra um mapa do tesouro entre os pertences dos bandidos. O que você faz?',
            options: [
                { text: 'Seguir o mapa do tesouro', step: 'seguir_mapa' },
                { text: 'Ignorar o mapa e continuar', step: 'continuar_jornada' }
            ]
        },
        fugir_bandidos: {
            title: 'Fugindo dos Bandidos',
            text: 'Você foge dos bandidos e acaba se perdendo na floresta. Após dias vagando, você encontra uma cidade desconhecida. O que você faz?',
            options: [
                { text: 'Explorar a cidade', step: 'explorar_cidade' },
                { text: 'Procurar um caminho de volta', step: 'procurar_caminho' }
            ]
        },
        ajudar_rei: {
            title: 'Ajudando o Rei',
            text: 'Você decide ajudar o rei e lidera o exército para a vitória. O rei lhe recompensa com riquezas e um título de nobreza. Parabéns, você venceu!',
            options: [
                { text: 'Recomeçar a aventura', step: 'inicio' }
            ]
        },
        seguir_em_frente: {
            title: 'Seguindo em Frente',
            text: 'Você decide seguir em frente e eventualmente encontra um dragão diferente guardando outro tesouro. O que você faz?',
            options: [
                { text: 'Enfrentar o novo dragão', step: 'enfrentar' },
                { text: 'Fugir novamente', step: 'fugir' }
            ]
        },
        seguir_mapa: {
            title: 'Seguindo o Mapa do Tesouro',
            text: 'Você segue o mapa do tesouro e encontra uma caverna cheia de riquezas. Parabéns, você encontrou o tesouro!',
            options: [
                { text: 'Recomeçar a aventura', step: 'inicio' }
            ]
        },
        explorar_cidade: {
            title: 'Explorando a Cidade',
            text: 'Você explora a cidade e descobre que é um centro de comércio mágico. Você decide se estabelecer e viver uma vida próspera. Fim.',
            options: [
                { text: 'Recomeçar a aventura', step: 'inicio' }
            ]
        },
        procurar_caminho: {
            title: 'Procurando um Caminho de Volta',
            text: 'Você procura um caminho de volta e eventualmente encontra seu caminho para casa. Você decide viver uma vida tranquila longe de aventuras. Fim.',
            options: [
                { text: 'Recomeçar a aventura', step: 'inicio' }
            ]
        }
    };

    function renderStep(step) {
        const stepData = story[step];
        if (!stepData) {
            window.location.href = `?step=${lastStep}`;
            return;
        }

        localStorage.setItem('lastStep', step);

        contentDiv.innerHTML = `
            <h1>${stepData.title}</h1>
            <p>${stepData.text}</p>
            ${stepData.options.map(option => `<a href="?step=${option.step}">${option.text}</a>`).join('<br>')}
        `;
    }

    renderStep(currentStep);
});