$(document).ready(function () {
    // Função para fechar o menu ao clicar em um link/botão dentro do menu
    $('.menu .nav-link').on('click', function () {
        if ($('.menu-toggle').attr('aria-expanded') === 'true') {
            $('.menu-toggle').click();
        }
    });

    // Função para marcar o botão selecionado com base na posição da página
    function markSelectedButton() {
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var documentHeight = $(document).height();

        // Define uma margem para ativar a marcação no fim da página
        var bottomMargin = 100;

        if (scrollTop + windowHeight >= documentHeight - bottomMargin) {
            $('.menu .menu-item .nav-link').removeClass('selected');
            $('.menu .menu-item .nav-link[href="#footer"]').addClass('selected');
        } else {
            var minDistance = Number.MAX_SAFE_INTEGER;
            var selectedLink = null;

            $('.menu .menu-item .nav-link').each(function () {
                var linkHref = $(this).attr('href');
                var sectionTop = $(linkHref).offset().top;
                var distance = Math.abs(sectionTop - scrollTop);

                if (sectionTop <= scrollTop + windowHeight / 3.3 && scrollTop <= sectionTop + $(linkHref).height()) {
                    if (distance < minDistance) {
                        minDistance = distance;
                        selectedLink = $(this);
                    }
                }
            });

            if (selectedLink) {
                $('.menu .menu-item .nav-link').removeClass('selected');
                selectedLink.addClass('selected');
            }
        }
    }

    // Função para encolher o cabeçalho a partir de uma certa altura
    function shrinkHeader() {
        var scrollPosition = $(window).scrollTop();
        var windowHeight = $(window).height();
        var startShrinkPercent = 50;

        var startShrinkPosition = $('#inicio').offset().top + ($('#inicio').height() * startShrinkPercent / 20);
        var endShrinkPosition = $('.secao-sobre').offset().top;

        if (scrollPosition >= startShrinkPosition) {
            $('.cabecalho').addClass('header-shrink').height(60);
            $('.spacer').height($('.cabecalho').height());
        } else {
            $('.cabecalho').removeClass('header-shrink').height(95);
            $('.spacer').height(95);
        }
    }

    // Chamar a função ao carregar a página e ao rolar a página
    markSelectedButton();
    shrinkHeader();
    $(window).scroll(function () {
        shrinkHeader();
        markSelectedButton();
    });

    // Inicializar o mapa
    var map = L.map('map').setView([-23.702935650904923, -46.613611275895074], 15);

    // Adicionar camada de mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Adicionar marcador com pop-up estilizado
    L.marker([-23.702935650904923, -46.613611275895074]).addTo(map)
        .bindPopup('<div class="popup-content">' +
            '<h4 class="popup-title" style="margin: 5px 0;">FP Car Multimarcas</h4>' +
            '<p class="popup-address" style="margin: 5px 0;">R. Margarida Maria Alves, 127 - Serraria</p>' +
            '<p class="popup-info" style="margin: 5px 0;">Estamos aqui!</p>' +
            '</div>')
        .openPopup();
});