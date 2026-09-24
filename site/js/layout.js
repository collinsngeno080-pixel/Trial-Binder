// Shared header and footer for every Trial Binder page.
// Each page includes <div id="site-header"></div> and <div id="site-footer"></div>;
// edit the nav links or footer here and every page updates.
(function () {
  var NAV = [
    { href: 'index.html', label: 'Home' },
    { href: 'services.html', label: 'Services' },
    { href: 'how-it-works.html', label: 'How It Works' },
    { href: 'about.html', label: 'About' },
    { href: 'contact.html', label: 'Contact' }
  ];

  var current = location.pathname.split('/').pop() || 'index.html';

  var navLinks = NAV.map(function (item) {
    var active = item.href === current ? ' aria-current="page"' : '';
    return '<a href="' + item.href + '"' + active + '>' + item.label + '</a>';
  }).join('');

  var header =
    '<header class="site-header">' +
      '<a class="site-logo" href="index.html" aria-label="Lit &amp; More home">' +
        '<img src="images/logo-nav.gif" alt="Lit &amp; More" width="400" height="250">' +
      '</a>' +
      '<nav class="site-nav" aria-label="Trial Binder">' + navLinks + '</nav>' +
      '<a class="site-header-cta" href="contact.html">Order Your Binder</a>' +
    '</header>';

  var footer =
    '<footer class="site-footer">' +
      '<div class="site-footer-grid">' +
        '<div class="site-footer-col">' +
          '<a class="site-footer-brand" href="index.html"><img src="images/logo-footer.png" alt="Lit &amp; More" width="1575" height="696"></a>' +
          '<p>Professional trial binders that keep your case documents organized, accessible and courtroom-ready.</p>' +
        '</div>' +
        '<div class="site-footer-col">' +
          '<div class="site-footer-heading">Trial Binders</div>' +
          '<a href="services.html">Services</a>' +
          '<a href="how-it-works.html">How It Works</a>' +
          '<a href="about.html">About</a>' +
        '</div>' +
        '<div class="site-footer-col">' +
          '<div class="site-footer-heading">More from Lit &amp; More</div>' +
          '<a href="https://litnmore.com/ediscovery/">eDiscovery</a>' +
          '<a href="https://litnmore.com/litigation-stats">Litigation Stats</a>' +
          '<a href="https://litnmore.com/edrm">EDRM</a>' +
        '</div>' +
        '<div class="site-footer-col">' +
          '<div class="site-footer-heading">Contact</div>' +
          '<address>1629 Hendry Street<br>Fort Myers, FL 33901</address>' +
          '<a href="tel:+12393323369">(239) 332-3369</a>' +
          '<a href="mailto:support@litnmore.com">support@litnmore.com</a>' +
        '</div>' +
      '</div>' +
      '<div class="site-footer-bottom">' +
        '<span>&copy; ' + new Date().getFullYear() + ' Lit &amp; More, Inc. All rights reserved.</span>' +
        '<span><a href="https://litnmore.com/terms-and-conditions/">Terms</a><a href="https://litnmore.com/privacy-policy/">Privacy</a></span>' +
      '</div>' +
    '</footer>';

  function mount(id, html) {
    var el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }

  mount('site-header', header);
  mount('site-footer', footer);
})();
