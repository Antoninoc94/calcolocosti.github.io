document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('costoServizioForm');
    const risultatoContainer = document.getElementById('risultatoContainer');
    const risultatoDiv = document.getElementById('risultato');
    const secondoAutistaDiv = document.getElementById('secondoAutista');
    const giorniSecondoAutistaDiv = document.getElementById('giorniSecondoAutista');
    const stampareBtn = document.getElementById('stampareBtn');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Recupera i valori inseriti nel modulo
        const kmTotali = parseInt(form.km.value) || 0;
        const giorniImpegnati = parseInt(form.giorniExtra.value) || 0;
        const secondAutista = form.secondoAutistaInput.value.toLowerCase() === 'si';
        const secondAutistaGiorni = secondAutista ? parseInt(form.giorniSecondoAutistaInput.value) || 0 : 0;
        const giorniFestiviExtra = parseInt(form.giorniFestivi.value) || 0;
        const spesePermessiExtra = parseFloat(form.spesePermessi.value) || 0;

        // Calcola il costo totale del servizio secondo la logica fornita
        const costoKm = kmTotali * 1.80 + 200;
        const costoGiorniImpegnati = giorniImpegnati * 800;
        const costoSecondAutista = secondAutista && secondAutistaGiorni > 0 ? secondAutistaGiorni * 200 : 0;
        const costoGiorniFestiviExtra = giorniFestiviExtra * 100;
        const totale = costoKm + costoGiorniImpegnati + costoSecondAutista + costoGiorniFestiviExtra + spesePermessiExtra;

        // Mostra il risultato nella pagina HTML
        risultatoDiv.innerHTML = "<div class='result'>" +
            "<p>Costo per km: €" + costoKm.toFixed(2) + "</p>" +
            "<p>Costo per giorni Oltre il viaggio Bus: €" + costoGiorniImpegnati.toFixed(2) + "</p>" +
            "<p>Costo per secondo Autista: €" + costoSecondAutista.toFixed(2) + "</p>" +
            "<p>Costo per giorni Festivi extra (tipo Natale, Pasqua): €" + costoGiorniFestiviExtra.toFixed(2) + "</p>" +
            "<p>Costo per spese o permessi extra: €" + spesePermessiExtra.toFixed(2) + "</p>" +
            "<p class='label-bold'>Prezzo totale del preventivo: €" + totale.toFixed(2) + "</p>" +
            "</div>";
        risultatoContainer.style.display = 'block';
    });

    // Aggiungi un gestore di eventi per l'evento "click" del pulsante "Stampa"
    stampareBtn.addEventListener('click', function(event) {
        event.preventDefault();
        window.print();
    });

    // Mostra/nascondi il campo per il secondo autista in base alla risposta
    form.giorniExtra.addEventListener('input', function() {
        const giorniExtra = parseInt(this.value) || 0;
        secondoAutistaDiv.style.display = giorniExtra > 0 ? 'block' : 'none';
    });

    // Mostra/nascondi il campo per i giorni del secondo autista in base alla risposta
    form.secondoAutistaInput.addEventListener('input', function() {
        const secondoAutistaInput = this.value.toLowerCase();
        giorniSecondoAutistaDiv.style.display = secondoAutistaInput === 'si' ? 'block' : 'none';
    });
});
