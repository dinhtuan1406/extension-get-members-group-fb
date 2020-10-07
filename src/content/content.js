import './content.css';

var timer;

chrome.runtime.onMessage.addListener(async function (msg, sender, response) {
  if (msg.trigger) {
    var origin = window.origin;
    var href = window.location.href;
    var arrHref = href.split('/');
    var linkGroupMembers = origin + `/groups/${arrHref[4]}/members/`;
    window.location.replace(linkGroupMembers);
  } else if (msg.export) {
    exportExcel();
  }
  response(msg);
});

function exportExcel() {
  clearInterval(timer);
  var listItem = $(
    'a.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.oo9gr5id.gpro0wi8.lrazzd5p'
  );
  var arrayProfile = [];
  for (var i = 0; i < listItem.length; i++) {
    var arrHref = listItem[i].href.split('?');
    var link = arrHref[0].includes('profile.php')
      ? arrHref[0] + '?' + arrHref[1].split('&')[0]
      : arrHref[0];
    arrayProfile.push({
      Name: listItem[i].title,
      Link: link
    });
  }
  chrome.runtime.sendMessage(
    {
      msg: 'arrayProfile',
      data: arrayProfile
    },
    function (res) {
      $('#loading-09').remove();
    }
  );
}

$(document).ready(async function () {
  var origin = window.origin;
  var href = window.location.href;
  var arrHref = href.split('/');
  var linkGroupMembers = origin + `/groups/${arrHref[4]}/members/`;
  if (window.location.href === linkGroupMembers) {
    chrome.runtime.sendMessage(
      {
        msg: 'getStatusTrigger'
      },
      function (response) {
        if (response.data) {
          $('body').append(`<div class="load-9" id="loading-09">
          <div class="spinner">
            <div class="bubble-1"></div>
            <div class="bubble-2"></div>
          </div>
        </div>`);
          var totalHeight = 0;
          var distance = 1000;
          timer = setInterval(() => {
            var scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            if (totalHeight >= scrollHeight) {
              if (
                $(
                  'div.oh7imozk.dati1w0a.qt6c0cv9.hv4rvrfc.jb3vyjys.i1fnvgqd.cbu4d94t.j83agx80.rq0escxv'
                ).length === 0
              ) {
                clearInterval(timer);
                var listItem = $(
                  'a.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.oo9gr5id.gpro0wi8.lrazzd5p'
                );
                var arrayProfile = [];
                for (var i = 0; i < listItem.length; i++) {
                  var arrHref = listItem[i].href.split('?');
                  var link = arrHref[0].includes('profile.php')
                    ? arrHref[0] + '?' + arrHref[1].split('&')[0]
                    : arrHref[0];
                  arrayProfile.push({
                    Name: listItem[i].title,
                    Link: link
                  });
                }
                chrome.runtime.sendMessage(
                  {
                    msg: 'arrayProfile',
                    data: arrayProfile
                  },
                  function (res) {
                    $('#loading-09').remove();
                  }
                );
              }
            }
          }, 10);
        }
      }
    );
  }
});
