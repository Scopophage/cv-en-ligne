// Exemple d'une interaction dynamique : afficher/masquer des informations
document.querySelectorAll('.job').forEach(job => {
    job.addEventListener('click', function() {
        this.classList.toggle('expanded');
    });
});
