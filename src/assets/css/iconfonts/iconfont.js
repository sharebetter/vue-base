(function (window) { let svgSprite = '<svg><symbol id="icon-iconfontjiantou2" viewBox="0 0 1024 1024"><path d="M723.696401 533.102744c0.486519-0.973037 1.337926-1.824445 1.702815-2.797482 8.514075-17.757928 5.716593-39.651265-9.365483-53.881934L372.30835 151.307281c-18.730966-17.757928-48.28697-16.906521-66.044898 1.824445-17.757928 18.730966-16.906521 48.28697 1.824445 66.044898l308.452785 291.789524L309.304193 807.012709c-18.609336 17.879558-19.095855 47.435562-1.216296 66.044898 9.122224 9.487112 21.406818 14.352298 33.569783 14.352298 11.676446 0 23.352892-4.378667 32.353486-13.136002l340.563012-328.278418c0.608148-0.608148 0.851408-1.581185 1.581185-2.189334 0.486519-0.486519 0.973037-0.851408 1.581185-1.337926C720.53403 539.670745 721.871956 536.265115 723.696401 533.102744L723.696401 533.102744zM723.696401 533.102744"  ></path></symbol></svg>'; let script = (function () { let scripts = document.getElementsByTagName('script'); return scripts[scripts.length - 1] }()); let shouldInjectCss = script.getAttribute('data-injectcss'); let ready = function (fn) { if (document.addEventListener) { if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState)) { setTimeout(fn, 0) } else { var loadFn = function () { document.removeEventListener('DOMContentLoaded', loadFn, false); fn() }; document.addEventListener('DOMContentLoaded', loadFn, false) } } else if (document.attachEvent) { IEContentLoaded(window, fn) } function IEContentLoaded (w, fn) { let d = w.document; let done = false; let init = function () { if (!done) { done = true; fn() } }; var polling = function () { try { d.documentElement.doScroll('left') } catch (e) { setTimeout(polling, 50); return }init() }; polling(); d.onreadystatechange = function () { if (d.readyState == 'complete') { d.onreadystatechange = null; init() } } } }; let before = function (el, target) { target.parentNode.insertBefore(el, target) }; let prepend = function (el, target) { if (target.firstChild) { before(el, target.firstChild) } else { target.appendChild(el) } }; function appendSvg () { let div, svg; div = document.createElement('div'); div.innerHTML = svgSprite; svgSprite = null; svg = div.getElementsByTagName('svg')[0]; if (svg) { svg.setAttribute('aria-hidden', 'true'); svg.style.position = 'absolute'; svg.style.width = 0; svg.style.height = 0; svg.style.overflow = 'hidden'; prepend(svg, document.body) } } if (shouldInjectCss && !window.__iconfont__svg__cssinject__) { window.__iconfont__svg__cssinject__ = true; try { document.write('<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>') } catch (e) { console && console.log(e) } }ready(appendSvg) })(window)
