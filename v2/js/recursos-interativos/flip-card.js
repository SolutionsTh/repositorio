document.querySelectorAll('.flip-card-content').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
  });
});




/* document.querySelectorAll('.flip-card-content').forEach(card => {
  const video = card.querySelector('.cover-video');
  if (!video) return;

  card.querySelectorAll('.flip-back-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();

      card.classList.toggle('is-flipped');

      const isFlipped = card.classList.contains('is-flipped');

      if (isFlipped) {
        video.pause();
        video.currentTime = 0;

        // pequeno delay para garantir que o verso está visível
        setTimeout(() => {
          video.play().catch(err => {
            console.log('play bloqueado:', err);
          });
        }, 350);
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  });
}); */