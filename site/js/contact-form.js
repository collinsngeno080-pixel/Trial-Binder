// Sends the contact form to HubSpot (Forms Submission API) while keeping the site's own form design.
// Field "name" attributes in contact.html must match the HubSpot property internal names.
(function () {
  var PORTAL_ID = '243506781';
  var FORM_ID = '3ece5750-594d-4612-8566-2afc4118cbbb';
  var ENDPOINT = 'https://api.hsforms.com/submissions/v3/integration/submit/' + PORTAL_ID + '/' + FORM_ID;

  var form = document.getElementById('trial-binder-form');
  if (!form) return;
  var button = form.querySelector('button[type="submit"]');

  var status = document.createElement('p');
  status.setAttribute('role', 'status');
  status.style.cssText = 'grid-column: span 2; margin: 0; font-size: 16px; line-height: 1.6; display: none';
  button.parentNode.parentNode.insertBefore(status, button.parentNode.nextSibling);

  function show(message, isError) {
    status.innerHTML = message;
    status.style.color = isError ? '#8B1A1A' : '#1A1A1A';
    status.style.fontWeight = isError ? '700' : '600';
    status.style.display = 'block';
  }

  function cookie(name) {
    var m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var fields = [];
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name || el.disabled || el.type === 'submit') return;
      var value = el.value.trim();
      if (!value) return;
      // Law firm is mapped to the company record in the HubSpot form (0-2 / name).
      if (el.name === 'company') { fields.push({ objectTypeId: '0-2', name: 'name', value: value }); return; }
      // HubSpot date properties expect midnight UTC in milliseconds.
      if (el.type === 'date') { var d = value.split('-'); value = String(Date.UTC(+d[0], +d[1] - 1, +d[2])); }
      fields.push({ objectTypeId: '0-1', name: el.name, value: value });
    });

    var context = { pageUri: location.href, pageName: document.title };
    var hutk = cookie('hubspotutk');
    if (hutk) context.hutk = hutk;

    var label = button.textContent;
    button.disabled = true;
    button.textContent = 'Sending…';
    status.style.display = 'none';

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: fields, context: context })
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HubSpot responded ' + res.status);
        form.reset();
        show('Thank you. We’ve received your request and will reply with a plan and a timeline.', false);
      })
      .catch(function () {
        show('Sorry, your request didn’t go through. Please call <a href="tel:+12393323369">(239) 332-3369</a> or email <a href="mailto:msooley@litnmore.com">msooley@litnmore.com</a>.', true);
      })
      .then(function () {
        button.disabled = false;
        button.textContent = label;
      });
  });
})();
