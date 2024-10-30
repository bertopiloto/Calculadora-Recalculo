document.getElementById('calcForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const gradeFechada = parseFloat(document.getElementById('gradeFechada').value);
    const valorCredito = parseFloat(document.getElementById('valorCredito').value);
    const creditosPermitidos = parseFloat(document.getElementById('creditosPermitidos').value);
    const creditosPegos = parseFloat(document.getElementById('creditosPegos').value);
    const primeiraParcelaPaga = document.getElementById('primeiraParcelaPaga').value;
    const funcionalidade = document.getElementById('funcionalidade').value;

    let valorTotalComExtras = gradeFechada;
    let mensagemResultado = '';

    if (creditosPegos > creditosPermitidos) {
        const creditosExtras = creditosPegos - creditosPermitidos;
        valorTotalComExtras += (valorCredito * creditosExtras);
        mensagemResultado = `Você adicionou créditos extras. `;
    } else if (creditosPegos < creditosPermitidos) {
        const creditosMenos = creditosPermitidos - creditosPegos;
        valorTotalComExtras -= (valorCredito * creditosMenos);
        mensagemResultado = `Você pegou menos créditos. `;
    }

    const valorTotalSemestre = valorTotalComExtras * 6;
    let valorRestanteParaParcelar;
    let parcelasRestantes;

    if (funcionalidade === 'segundaParcela') {
        valorRestanteParaParcelar = valorTotalSemestre - (2 * gradeFechada);
        parcelasRestantes = 4;
    } else if (funcionalidade === 'terceiraParcela') {
        valorRestanteParaParcelar = valorTotalSemestre - (3 * gradeFechada);
        parcelasRestantes = 3;
    } else {
        parcelasRestantes = primeiraParcelaPaga === 'sim' ? 5 : 6;
        valorRestanteParaParcelar = primeiraParcelaPaga === 'sim'
            ? (valorTotalSemestre - gradeFechada)
            : valorTotalSemestre;
    }

    const valorParcelaRestante = valorRestanteParaParcelar / parcelasRestantes;
    const valorParcelaRestanteFormatado = valorParcelaRestante.toFixed(2).replace('.', ',');
    const valorTotalMensalidade = valorTotalSemestre / 6;
    const valorTotalMensalidadeFormatado = valorTotalMensalidade.toFixed(2).replace('.', ',');

    document.getElementById('resultado').innerText = mensagemResultado + `Valor da Parcela Restante: R$ ${valorParcelaRestanteFormatado}\nValor Total da Mensalidade: R$ ${valorTotalMensalidadeFormatado}`;
});
