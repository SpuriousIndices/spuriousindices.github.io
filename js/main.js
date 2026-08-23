/* ==========================================================================
   GitHub Pages Interactive JavaScript
   Powered by jQuery 3.7 & Modern Web APIs
   ========================================================================== */

$(document).ready(function () {
  'use strict';

  /* ------------------------------------------------------------------------
   * 1. Theme Switcher (Dark / Light Mode)
   * ------------------------------------------------------------------------ */
  const $themeBtn = $('#theme-toggle');
  const $themeIcon = $('#theme-icon');
  const $themeText = $('#theme-text');

  // Retrieve stored theme preference or default to dark
  const currentTheme = localStorage.getItem('site-theme') || 'dark';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('site-theme', theme);

    if (theme === 'light') {
      $themeIcon.removeClass('fa-moon').addClass('fa-sun');
      $themeText.text('Light Mode');
    } else {
      $themeIcon.removeClass('fa-sun').addClass('fa-moon');
      $themeText.text('Dark Mode');
    }
  }

  // Initial apply
  applyTheme(currentTheme);

  // Toggle on button click
  $themeBtn.on('click', function () {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  });

  /* ------------------------------------------------------------------------
   * 2. Hero Typing Animation
   * ------------------------------------------------------------------------ */
  const $typedTextSpan = $('.typed-text');
  const phrases = [
    'Full-Stack Developer',
    'Open Source Contributor',
    'UI/UX Enthusiast',
    'Software Engineer'
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const newTextDelay = 2000;

  function typeEffect() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      $typedTextSpan.text(currentPhrase.substring(0, charIdx - 1));
      charIdx--;
    } else {
      $typedTextSpan.text(currentPhrase.substring(0, charIdx + 1));
      charIdx++;
    }

    let delay = isDeleting ? erasingSpeed : typingSpeed;

    if (!isDeleting && charIdx === currentPhrase.length) {
      delay = newTextDelay;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 500;
    }

    setTimeout(typeEffect, delay);
  }

  if ($typedTextSpan.length) {
    setTimeout(typeEffect, 1000);
  }

  /* ------------------------------------------------------------------------
   * 3. Portfolio Project Category Filter
   * ------------------------------------------------------------------------ */
  $('.filter-btn').on('click', function () {
    // Update active filter button
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    const filterValue = $(this).attr('data-filter');

    $('.project-card-col').each(function () {
      const categories = $(this).attr('data-category');
      
      if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
        $(this).stop().fadeIn(300);
      } else {
        $(this).stop().fadeOut(300);
      }
    });
  });

  /* ------------------------------------------------------------------------
   * 4. Copy-to-Clipboard Functionality with Dynamic Toast
   * ------------------------------------------------------------------------ */
  $('[data-copy]').on('click', function (e) {
    e.preventDefault();
    const textToCopy = $(this).attr('data-copy');
    const label = $(this).attr('data-copy-label') || 'Text';

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy).then(showToast);
    } else {
      // Fallback for non-HTTPS or legacy browsers
      const $tempInput = $('<input>');
      $('body').append($tempInput);
      $tempInput.val(textToCopy).select();
      document.execCommand('copy');
      $tempInput.remove();
      showToast();
    }

    function showToast() {
      const $toast = $('#custom-toast');
      $toast.find('.toast-body-text').html(`<i class="fa-solid fa-circle-check text-success me-2"></i> Copied <strong>${label}</strong> to clipboard!`);
      $toast.addClass('show');

      setTimeout(function () {
        $toast.removeClass('show');
      }, 3000);
    }
  });

  /* ------------------------------------------------------------------------
   * 5. Smooth Scroll Navigation & Scroll-to-Top Button
   * ------------------------------------------------------------------------ */
  const $backToTopBtn = $('#back-to-top');

  $(window).on('scroll', function () {
    // Toggle Back to Top button visibility
    if ($(this).scrollTop() > 300) {
      $backToTopBtn.addClass('show');
    } else {
      $backToTopBtn.removeClass('show');
    }

    // ScrollSpy active link updating
    const scrollPos = $(document).scrollTop() + 100;
    $('.nav-link[href^="#"]').each(function () {
      const currLink = $(this);
      const refElement = $(currLink.attr('href'));

      if (refElement.length && refElement.position()) {
        const top = refElement.position().top;
        const bottom = top + refElement.outerHeight();

        if (scrollPos >= top && scrollPos <= bottom) {
          $('.nav-link').removeClass('active');
          currLink.addClass('active');
        }
      }
    });
  });

  // Back to top click handler
  $backToTopBtn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 500);
  });
});
