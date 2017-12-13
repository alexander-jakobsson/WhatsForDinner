// Wrap every letter in a span
$('.ml16').each(function(){
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});

anime.timeline({loop: true})
    .add({
        targets: '.ml16 .letter',
        translateY: [-100,0],
        easing: "easeOutExpo",
        duration: 2000,
        delay: function(el, i) {
            return 30 * i;
        }
    }).add({
    targets: '.ml16',
    duration: 20000,
    easing: "easeOutExpo",
    delay: 1000
});
function myFunction() {
    var e = document.getElementById("infopop");
    if(e.style.display === 'inline-block')
        e.style.display = 'none';
    else
        e.style.display = 'inline-block'
}