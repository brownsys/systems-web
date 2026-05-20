$(document).ready(function() {
    $('a.abstract').click(function() {
        $(this).parent().parent().find(".abstract.hidden").toggleClass('open');
    });
    $('a.bibtex').click(function() {
        $(this).parent().parent().find(".bibtex.hidden").toggleClass('open');
    });
});

(function(){
    const N = 10; // keep first N rows visible
    const table = document.getElementById('news-table');
    const link = document.getElementById('news-toggle');
    const rows = Array.from(table.querySelectorAll('tr'));
    let expanded = false;
  
    function apply() {
      rows.forEach((tr, i) => tr.style.display = (!expanded && i >= N) ? 'none' : '');
      link.textContent = expanded ? 'Hide older news' : 'Older news';
    }
  
    link.addEventListener('click', (e) => {
      e.preventDefault(); // prevent page jump
      expanded = !expanded;
      apply();
    });
  
    apply();
  })();
  