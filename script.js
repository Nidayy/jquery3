$(document).ready(function () {
  $.fn.shake = function (interval = 100, distance = 10, times = 3) {
    let $el = $(this);
    $el.css("position", "relative");

    for (let i = 0; i < times; i++) {
      $el.animate({ left: -distance }, interval)
        .animate({ left: distance }, interval);
    }
    $el.animate({ left: 0 }, interval);
    return this;
  };

  $("#veriYukleDugmesi").click(function () {
    $(this).shake();

    $.ajax({
      url: "https://randomuser.me/api/?results=6",
      dataType: "json",
      success: function (apiVerisi) {
        $("#kartListeAlani").empty();

        apiVerisi.results.forEach(function (profil) {
          const kartIcerik = `
            <div class="kart" data-isim="${profil.name.first} ${profil.name.last}"
                 data-eposta="${profil.email}" data-resim="${profil.picture.large}">
              <img src="${profil.picture.medium}" alt="Profil fotoğrafı">
              <h4>${profil.name.first} ${profil.name.last}</h4>
              <p>${profil.email}</p>
              <p>${profil.location.country}</p>
            </div>
          `;

          const $profilKart = $(kartIcerik);
          $profilKart.appendTo("#kartListeAlani").slideDown("slow");
        });

        $(".kart").hover(
          function () {
            $(this).fadeTo("fast", 0.85);
          },
          function () {
            $(this).fadeTo("fast", 1);
          }
        );

        $(".kart").click(function () {
          $("#modalAd").text($(this).data("isim"));
          $("#modalEposta").text($(this).data("eposta"));
          $("#modalProfilFoto").attr("src", $(this).data("resim"));

          $.fancybox.open({
            src: "#kullaniciDetayModal",
            type: "inline"
          });
        });
      }
    });
  });
});
