
document.addEventListener("DOMContentLoaded", function() {
  // Menu Toggle Functionality
  const menuIcon = document.querySelector(".menu-icon");
  const menu = document.querySelector(".menu");
  const menuBtn = document.querySelector("#menuBtn"); // Assuming menuBtn is an ID

  if (menuIcon) {
    menuIcon.addEventListener("click", function() {
      menu.classList.toggle("active");
      menuIcon.classList.toggle("open");
    });
  }

  if (menuBtn) {
    menuBtn.addEventListener('change', function() {
      if (this.checked) {
        menu.style.display = 'block';
      } else {
        menu.style.display = 'none';
      }
    });
  }

  window.addEventListener('resize', function() {
    if (window.innerWidth > 965) {
      menu.style.display = 'flex';
      if (menuBtn) menuBtn.checked = false;
    } else {
      menu.style.display = 'none';
    }
  });

  // Adjust Banner Height
  function adjustBannerHeight() {
    const banner = document.getElementById('search-banner');
    if (banner) {
      if (window.innerWidth <= 500) {
        banner.style.height = '200px';
      } else if (window.innerWidth <= 750) {
        banner.style.height = '300px';
      } else if (window.innerWidth <= 965) {
        banner.style.height = '400px';
      } else {
        banner.style.height = '500px';
      }
    }
  }

  window.addEventListener('resize', adjustBannerHeight);
  adjustBannerHeight(); // Call initially

  // Lazy Loading of Images
  const lazyImages = [].slice.call(document.querySelectorAll("img[data-src]"));

  if ("IntersectionObserver" in window) {
    const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.removeAttribute("data-src");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach(function(lazyImage) {
      lazyImage.src = lazyImage.dataset.src;
      lazyImage.removeAttribute("data-src");
    });
  }

  // Smooth Scroll for Internal Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Sticky Header
  const header = document.getElementById("header");
  const sticky = header ? header.offsetTop : 0;

  function stickFunction() {
    if (window.pageYOffset > sticky) {
      if (header) header.classList.add("sticky");
    } else {
      if (header) header.classList.remove("sticky");
    }
  }

  window.addEventListener('scroll', stickFunction);

  // Scroll-to-Top Button
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  if (scrollTopBtn) {
    window.addEventListener("scroll", function() {
      if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = "block";
      } else {
        scrollTopBtn.style.display = "none";
      }
    });

    scrollTopBtn.addEventListener("click", function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Modal Functionality
  const openModalBtn = document.getElementById("openModalBtn");
  const modal = document.getElementById("modal");
  const closeModal = document.querySelector(".close");

  if (openModalBtn) {
    openModalBtn.addEventListener("click", function() {
      if (modal) modal.style.display = "block";
    });
  }

  if (closeModal) {
    closeModal.addEventListener("click", function() {
      if (modal) modal.style.display = "none";
    });
  }

  if (modal) {
    window.addEventListener("click", function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }
});
