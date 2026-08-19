document.addEventListener('DOMContentLoaded', () => {
  const nodes = document.querySelectorAll('.hobby-node');

  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
    });
  });

  // Subtle parallax on branch stage
  const stage = document.querySelector('.branch-stage');
  if (stage && window.matchMedia('(pointer: fine)').matches) {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      nodes.forEach(node => {
        const speed = 6;
        node.style.transform = `translate(calc(-50% + ${x * speed}px), calc(-50% + ${y * speed}px))`;
      });
    });

    stage.addEventListener('mouseleave', () => {
      nodes.forEach(node => {
        node.style.transform = '';
      });
    });
  }
});
