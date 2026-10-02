  document.getElementById('year').textContent = '© ' + new Date().getFullYear() + ' CreaTTech Hub';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stage = document.getElementById('stage');
  var mockup = document.getElementById('mockup');

  if (stage && mockup && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
    var raf = null;
    stage.addEventListener('pointermove', function (e) {
      var rect = stage.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var rotY = -14 + x * 18;
        var rotX = 7 - y * 14;
        mockup.style.transform = 'rotateY(' + rotY + 'deg) rotateX(' + rotX + 'deg) rotateZ(1deg)';
      });
    });
    stage.addEventListener('pointerleave', function () {
      mockup.style.transform = '';
    });
  }

  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.service-card').forEach(function (card) {
      var cardRaf = null;
      card.addEventListener('pointermove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        if (cardRaf) cancelAnimationFrame(cardRaf);
        cardRaf = requestAnimationFrame(function () {
          card.style.transform = 'perspective(700px) rotateX(' + (-y * 12) + 'deg) rotateY(' + (x * 12) + 'deg) translateY(-6px)';
        });
      });
      card.addEventListener('pointerleave', function () {
        card.style.transform = '';
      });
    });
  }

  if (!reduceMotion) {
    document.documentElement.classList.add('js-reveal');
    var revealTargets = document.querySelectorAll('.section-head, .service-card, .step, .trust li, .values li');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
  }
