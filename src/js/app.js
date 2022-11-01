import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

/*
import Swiper, { Navigation, Pagination } from 'swiper';
const swiper = new Swiper();
*/
/* (() => {
  var J = Object.defineProperty,
    le = Object.defineProperties;
  var de = Object.getOwnPropertyDescriptors;
  var Q = Object.getOwnPropertySymbols;
  var ue = Object.prototype.hasOwnProperty,
    he = Object.prototype.propertyIsEnumerable;
  var X = (n, e, t) =>
      e in n
        ? J(n, e, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: t,
          })
        : (n[e] = t),
    G = (n, e) => {
      for (var t in e || (e = {})) ue.call(e, t) && X(n, t, e[t]);
      if (Q) for (var t of Q(e)) he.call(e, t) && X(n, t, e[t]);
      return n;
    },
    Z = (n, e) => le(n, de(e));
  var j = (n, e) => () => (n && (e = n((n = 0))), e);
  var fe = (n, e) => {
    for (var t in e)
      J(n, t, {
        get: e[t],
        enumerable: !0,
      });
  };
  var P = (n, e, t) =>
    new Promise((s, o) => {
      var i = (c) => {
          try {
            a(t.next(c));
          } catch (d) {
            o(d);
          }
        },
        r = (c) => {
          try {
            a(t.throw(c));
          } catch (d) {
            o(d);
          }
        },
        a = (c) => (c.done ? s(c.value) : Promise.resolve(c.value).then(i, r));
      a((t = t.apply(n, e)).next());
    });
  var I,
    y,
    q = j(() => {
      I = class extends EventTarget {
        emit(e, t) {
          this.dispatchEvent(
            new CustomEvent(e, {
              detail: t,
            })
          );
        }
      };
      Object.assign(I.prototype, {
        on: EventTarget.prototype.addEventListener,
        off: EventTarget.prototype.removeEventListener,
      });
      y = I;
    });
  var se = {};
  fe(se, {
    default: () => xe,
  });

  function ne(n) {
    return n.getBoundingClientRect();
  }

  function we(n, e, t) {
    return Math.max(n, Math.min(e, t));
  }
  var $,
    xe,
    oe = j(() => {
      q();
      ($ = class extends y {
        constructor({ rootElement: e }) {
          super(),
            (this.refs = {
              rootElement: e,
              input: e.querySelector(".search__input"),
              suggestionContainer: e.querySelector(".search__suggestion"),
              suggestionContent: e.querySelector(".search__suggestion-content"),
              suggestionList: e.querySelector(".suggestion-list"),
            }),
            (this.state = {
              highlightedIndex: -1,
            }),
            [
              "enter",
              "exit",
              "openSuggestion",
              "closeSuggestion",
              "closeSuggestionOnKeyUp",
              "closeSuggestionOnOutSideClick",
              "onSearch",
              "onCursorChange",
            ].forEach((t) => (this[t] = this[t].bind(this))),
            document.addEventListener(
              "click",
              this.closeSuggestionOnOutSideClick
            ),
            this.refs.rootElement.addEventListener(
              "keyup",
              this.closeSuggestionOnKeyUp
            ),
            this.refs.rootElement.addEventListener("submit", (t) => {
              this.refs.input.value.trim() === "" && t.preventDefault(),
                this.state.highlightedIndex >= 0 &&
                  this.isSuggestionOpen &&
                  t.preventDefault();
            }),
            this.refs.input.addEventListener("input", this.onSearch),
            document.addEventListener("keydown", (t) => {
              t.code === "Slash" &&
                document.activeElement !== this.refs.input &&
                t.preventDefault();
            }),
            document.addEventListener("keyup", (t) => {
              t.code === "Slash" &&
                setTimeout(() => {
                  this.enter();
                });
            });
        }
        enter() {
          var e;
          (e = this.refs.input) == null || e.focus();
        }
        exit() {
          let { input: e } = this.refs;
          e && ((e.value = ""), e.blur()), (this.state.highlightedIndex = -1);
        }
        openSuggestion() {
          let { suggestionContainer: e } = this.refs;
          e == null || e.classList.remove("search__suggestion--hide"),
            document.addEventListener("keydown", this.onCursorChange),
            document.addEventListener("keydown", this.preventEscape);
        }
        closeSuggestion() {
          let { suggestionContainer: e } = this.refs;
          e == null || e.classList.add("search__suggestion--hide"),
            document.removeEventListener("keydown", this.onCursorChange),
            document.removeEventListener("keydown", this.preventEscape);
        }
        get isSuggestionOpen() {
          let { suggestionContainer: e } = this.refs;
          return !(
            e != null && e.classList.contains("search__suggestion--hide")
          );
        }
        preventEscape(e) {
          e.code === "Escape" && e.preventDefault();
        }
        closeSuggestionOnKeyUp(e) {
          e.code === "Escape" &&
            this.isSuggestionOpen &&
            (e.stopPropagation(), this.closeSuggestion());
        }
        closeSuggestionOnOutSideClick(e) {
          let { rootElement: t } = this.refs;
          t.contains(e.target) || this.closeSuggestion();
        }
        onSearch(e) {
          this.emit("search", e.target.value);
        }
        onCursorChange(e) {
          switch (e.code) {
            case "ArrowDown": {
              this.moveCursor(1), e.preventDefault();
              break;
            }
            case "ArrowUp": {
              this.moveCursor(-1), e.preventDefault();
              break;
            }
            case "Enter": {
              this.selectHighlightedElement();
              break;
            }
          }
        }
        selectHighlightedElement() {
          let { suggestionList: e } = this.refs,
            t = e.querySelectorAll(".suggestion-list__link");
          if (t.length === 0) return;
          let s = this.state.highlightedIndex;
          s < 0 || t[s].click();
        }
        moveCursor(e) {
          var l;
          let { suggestionList: t, suggestionContent: s } = this.refs,
            o = t.querySelectorAll(".suggestion-list__link");
          if (o.length === 0) return;
          (l = t.querySelector(".suggestion-list__link--highlighted")) ==
            null || l.classList.remove("suggestion-list__link--highlighted");
          let i = this.state.highlightedIndex,
            r = we(0, i + e, o.length - 1);
          (this.state.highlightedIndex = r),
            o[r].classList.add("suggestion-list__link--highlighted");
          let a = ne(s),
            c = ne(o[r]),
            d = parseFloat(window.getComputedStyle(s).paddingTop) || 0;
          c.top < a.top && (s.scrollTop += c.top - a.top - d),
            c.bottom > a.bottom && (s.scrollTop += c.bottom - a.bottom + d);
        }
        clearOutput() {
          let { suggestionList: e } = this.refs;
          (e.innerHTML = ""), (this.state.highlightedIndex = -1);
        }
        renderResults(e) {
          let { suggestionList: t } = this.refs,
            s =
              !e || e.length === 0
                ? "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E"
                : e
                    .map((o) => {
                      let i = o.originalTitle.replace(
                        /`(.*?)`/g,
                        '<code class="suggestion-list__code font-theme font-theme--code">$1</code>'
                      );
                      return `
                <li class="suggestion-list__item" style="--accent-color: var(--color-${
                  o.category
                });">
                  <a class="suggestion-list__link link" href="${
                    o.url
                  }">${i.replace(/<[/]*mark>/gi, "")}</a>
                </li>
              `;
                    })
                    .join("");
          t.innerHTML = s;
        }
      }),
        (xe = new $({
          rootElement: document.querySelector(".search"),
        }));
    });

  function me(n, e = new Date()) {
    let t = (e - n) / 1e3,
      s,
      o = new Intl.RelativeTimeFormat("ru", {
        localeMatcher: "best fit",
        numeric: "always",
        style: "long",
      });
    return (
      t >= 86400
        ? ((t = Math.round(t / 86400)), (s = "day"))
        : t >= 3600
        ? ((t = Math.round(t / 3600)), (s = "hour"))
        : t >= 60
        ? ((t = Math.round(t / 60)), (s = "minute"))
        : ((t = Math.round(t)), (s = "second")),
      o.format(-t, s)
    );
  }
  document.querySelectorAll("[data-relative-time]").forEach((n) => {
    try {
      let e = n.dateTime,
        t = new Date(e),
        s = new Date();
      if (Math.abs((s - t) / 1e3) > 60 * 60 * 24) return;
      let i = me(t, s);
      n.textContent = i;
    } catch (e) {
      console.error(e);
    }
  });

  function ge() {
    let n = document.querySelector(".articles-gallery");
    if (!n) return;
    let e = n.querySelector(".articles-gallery__more-button");
    if (!e) return;
    let t = n.querySelector(".featured-artices-list"),
      s = Array.from(
        (t == null
          ? void 0
          : t.querySelectorAll(".featured-artices-list__item")) || []
      );
    if (s.length === 0) return;
    let o = "featured-artices-list__item--active",
      i =
        parseInt(getComputedStyle(t).getPropertyValue("--page-size"), 10) || 1,
      r = i;

    function a() {
      s.slice(r, r + i).forEach((c) => {
        c.classList.add(o);
      }),
        (r += i),
        r >= s.length && (e.hidden = !0);
    }
    e.addEventListener("click", a);
  }
  try {
    ge();
  } catch (n) {
    console.error(n);
  }
  document.querySelectorAll(".persons-list").forEach((n) => {
    let e = n.querySelectorAll(".persons-list__item[hidden]"),
      t = n.querySelector(".persons-list__button"),
      s = n.querySelector(".persons-list__extra");
    t == null ||
      t.addEventListener("click", () => {
        e.forEach((o) => {
          o.hidden = !1;
        }),
          s && (s.hidden = !0);
      });
  });

  function pe() {
    let n = document.querySelector(".article-nav");
    if (!n) return;
    let e = n.querySelector(".article-nav__button"),
      t = n.querySelector(".article-nav__content");
    e.addEventListener("click", () => {
      n.classList.toggle("article-nav--open");
    }),
      t.addEventListener("click", (s) => {
        s.target.closest("a") && n.classList.remove("article-nav--open");
      });
  }
  pe();

  function T(n, e) {
    let t;
    return function (s) {
      t && clearTimeout(t),
        (t = setTimeout(function () {
          n(s);
        }, e));
    };
  }

  function Se() {
    var Y;
    let n = ".toc",
      e = ".toc__link",
      t = ".article-heading",
      s = ".article-heading__link",
      o = Array.from(document.querySelectorAll(e)),
      i = Array.from(document.querySelectorAll(t)).filter(
        (u) => !u.closest("details")
      );
    if (!(o.length && i.length)) return;
    let r = {},
      a = {},
      c,
      d,
      l = "toc__link--active",
      h = "article-heading--visible",
      m = 0;

    function S() {
      return parseFloat(window.getComputedStyle(i[0]).scrollMarginTop);
    }

    function E() {
      return i
        .filter((u) => {
          let g = u.getBoundingClientRect(),
            _ = S();
          return g.top + g.height * m < _;
        })
        .pop();
    }

    function f(u) {
      var g, _;
      (g = r[c == null ? void 0 : c.id]) == null || g.classList.remove(l),
        (_ = r[u == null ? void 0 : u.id]) == null || _.classList.add(l),
        (c = u);
    }

    function k(u) {
      for (let R of u) R.target.classList.toggle(h, R.isIntersecting);
      let _ = i.filter((R) => R.classList.contains(h)).pop() || E();
      _ && f(_);
    }

    function p(u) {
      var _;
      let g = u.slice(1);
      return (_ = a[g]) == null ? void 0 : _.element;
    }

    function O(u) {
      let g = u == null ? void 0 : u.getBoundingClientRect(),
        _ = 1;
      return window.scrollY + (g.top + g.height * m + _) - S();
    }

    function ie(u) {
      history.pushState(null, null, u);
    }

    function re(u) {
      let g = p(u);
      window.scrollTo({
        top: O(g),
        behavior: "smooth",
      });
    }
    o.forEach((u) => {
      let g = u.hash.slice(1);
      r[g] = u;
    }),
      i.forEach((u, g) => {
        a[u.id] = {
          element: u,
          index: g,
        };
      });

    function ce() {
      (d = new IntersectionObserver(k, {
        rootMargin: `0px 0px -${window.innerHeight - S()}px 0px`,
        threshold: [m],
      })),
        i.forEach((u) => {
          d.observe(u);
        });
    }

    function ae() {
      i.forEach((u) => {
        d.unobserve(u);
      }),
        d.disconnect(),
        (d = null);
    }

    function z() {
      d && ae(),
        ce(),
        i.forEach((u) => {
          d.observe(u);
        });
    }
    setTimeout(z),
      window.addEventListener("resize", T(z, 200)),
      window.addEventListener("load", () => {
        let u = E();
        u && f(u);
      }),
      (Y = document.querySelector(n)) == null ||
        Y.addEventListener("click", (u) => {
          let g = u.target.closest(`${e}, ${s}`);
          !g || (u.preventDefault(), re(g.hash), ie(g.hash));
        });
  }
  Se();

  function F(
    n,
    e,
    t = {
      leading: !0,
    }
  ) {
    let s = !1,
      o,
      i;
    return function () {
      if (s) {
        (o = arguments), (i = this);
        return;
      }
      t.leading && n.apply(this, arguments),
        (s = !0),
        setTimeout(function () {
          (s = !1), o && (n.apply(i, o), (o = i = null));
        }, e);
    };
  }
  q();
  var U = "header--open",
    ee = "fixedHeaderAnimation",
    B = class extends y {
      constructor({ rootElement: e }) {
        super(),
          (this.refs = {
            rootElement: e,
            input: e.querySelector(".search__input"),
            toggleButtons: e.querySelectorAll(".menu-toggle"),
          }),
          (this.state = {
            headerHeight: null,
            fixedHeaderHeight: null,
            lastScroll: 0,
            getScrollThreshold: window.innerHeight,
          });
        let t = [
          {
            condition: () => !!document.querySelector(".article"),
            getter: () =>
              this.state.headerHeight +
              document.querySelector(".article__header").offsetHeight,
          },
          {
            condition: () => !!document.querySelector(".index-block"),
            getter: () => {
              let i = window.matchMedia("(min-width: 1366px)")
                ? 0
                : document.querySelector(".index-block__header").offsetHeight;
              return this.state.headerHeight + i;
            },
          },
          {
            condition: () => !!document.querySelector(".standalone-page"),
            getter: () =>
              this.state.headerHeight +
              document.querySelector(".standalone-page__header").offsetHeight,
          },
          {
            condition: () => !0,
            getter: () => window.innerHeight,
          },
        ];
        for (let { condition: i, getter: r } of t)
          if (i()) {
            this.getScrollThreshold = r;
            break;
          }
        [
          "openOnKeyUp",
          "closeOnKeyUp",
          "closeOnClickOutSide",
          "openMenu",
          "closeMenu",
          "fixHeader",
          "checkFixed",
        ].forEach((i) => {
          this[i] = this[i].bind(this);
        });
        let s = () => {
            this.calculateHeaderHeight(), this.calculateScrollThreshold();
          },
          o = T(s, 200);
        window.addEventListener("resize", o),
          window.addEventListener("orientationchange", o),
          s(),
          this.isClosableHeader &&
            (this.refs.toggleButtons.forEach((i) => {
              i.addEventListener("click", () => {
                this.isMenuOpen ? this.closeMenu() : this.openMenu();
              });
            }),
            document.addEventListener("keyup", this.openOnKeyUp),
            window.addEventListener(
              "scroll",
              F(this.checkFixed, 250, {
                leading: !1,
              }),
              {
                passive: !0,
              }
            ),
            this.checkFixed());
      }
      get isFixed() {
        return this.refs.rootElement.classList.contains("header--fixed");
      }
      get isClosableHeader() {
        let e = this.refs.rootElement;
        return [
          !e.classList.contains("header--static"),
          !e.classList.contains("search-page__header"),
        ].every(Boolean);
      }
      get isMenuOpen() {
        return this.refs.rootElement.classList.contains(U);
      }
      calculateHeaderHeight() {
        let e = this.refs.rootElement,
          t = this.state;
        this.isFixed
          ? ((t.fixedHeaderHeight = e.offsetHeight),
            e.classList.remove("header--fixed"),
            (t.headerHeight = e.offsetHeight),
            e.classList.add("header--fixed"))
          : ((t.headerHeight = e.offsetHeight),
            e.classList.add("header--fixed"),
            (t.fixedHeaderHeight = e.offsetHeight),
            e.classList.remove("header--fixed")),
          document.documentElement.style.setProperty(
            "--fixed-header-height",
            t.fixedHeaderHeight
          ),
          document.documentElement.style.setProperty(
            "--not-fixed-header-height",
            t.headerHeight
          );
      }
      calculateScrollThreshold() {
        this.scrollThreshold = this.getScrollThreshold();
      }
      openOnKeyUp(e) {
        e.code === "Slash" && this.openMenu();
      }
      closeOnKeyUp(e) {
        e.code === "Escape" && this.closeMenu();
      }
      closeOnClickOutSide(e) {
        e.target.closest(".header__inner") || this.closeMenu();
      }
      openMenu() {
        this.refs.rootElement.classList.add(U),
          document.removeEventListener("keyup", this.openOnKeyUp),
          document.addEventListener("keyup", this.closeOnKeyUp),
          document.addEventListener("click", this.closeOnClickOutSide);
      }
      closeMenu() {
        let { rootElement: e } = this.refs;
        e.classList.remove(U),
          document.removeEventListener("keyup", this.closeOnKeyUp),
          document.removeEventListener("click", this.closeOnClickOutSide),
          document.addEventListener("keyup", this.openOnKeyUp),
          this.emit("menu.close");
      }
      showHeader() {
        let { rootElement: e } = this.refs,
          t = ["header--animating", "header--fixed-show"];
        e.addEventListener(
          "animationend",
          (s) => {
            s.animationName === ee && e.classList.remove(...t);
          },
          {
            once: !0,
          }
        ),
          this.fixHeader(!0),
          e.classList.add(...t),
          this.emit("fixed");
      }
      //Закрытие меню

      hideHeader() {
        let { rootElement: e } = this.refs,
          t = ["header--animating", "header--fixed-hide"];
        e.addEventListener(
          "animationend",
          (s) => {
            s.animationName === ee &&
              (this.fixHeader(!1), e.classList.remove(...t));
          },
          {
            once: !0,
          }
        ),
          e.classList.add(...t),
          this.emit("unfixed");
      }
      fixHeader(e) {
        this.refs.rootElement.classList.toggle("header--fixed", e),
          document.documentElement.style.setProperty(
            "--is-header-fixed",
            Number(e)
          );
      }
      checkFixed() {
        let { lastScroll: e } = this.state,
          t = window.scrollY,
          s = t > e,
          o = t === 0;
        if (((this.state.lastScroll = t), o)) {
          this.isFixed && (this.fixHeader(!1), this.emit("unfixed"));
          return;
        }
        if (t <= this.scrollThreshold) {
          this.isFixed && this.hideHeader();
          return;
        }
        s
          ? this.isFixed && this.hideHeader()
          : this.isFixed || this.showHeader();
      }
    },
    A = new B({
      rootElement: document.querySelector(".header"),
    });

  function Ee() {
    let n = document.querySelector(".article__aside");
    if (!(n && A)) return;
    let e = "article__aside--offset";
    A.on("fixed", () => {
      n.classList.add(e);
    }),
      A.on("unfixed", () => {
        n.classList.remove(e);
      });
  }
  Ee();

  function ye() {
    let n = document.querySelector(".index-block");
    if (!n) return;
    let e = n.querySelector(".index-block__filter-control"),
      t = n.querySelectorAll(".index-section");
    if (!e && !t) return;
    let s = "view",
      o = {
        THEMES: "themes",
        ALPHABET: "alphabet",
      };

    function i(d) {
      for (let l of t) l.hidden = l.id !== d;
    }

    function r(d) {
      let l = new URLSearchParams({
        [s]: d,
      });
      history.replaceState(null, null, `?${l}`);
    }
    e.addEventListener("change", (d) => {
      let { value: l } = d.target;
      !l || (i(l), r(l));
    });
    let a = new URLSearchParams(window.location.search);
    i(a.get(s) || o.THEMES);
    let c = window.location.hash;
    c &&
      window.addEventListener("load", () => {
        var d;
        (d = document.querySelector(c)) == null || d.scrollIntoView();
      });
  }
  ye();
  var { replace: ve } = "";
  var _e = /[&<>'"]/g,
    ke = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    },
    Te = (n) => ke[n],
    te = (n) => ve.call(n, _e, Te);
  var V = class {
      static get defaultSearchSettings() {
        return {
          getRankingInfo: !0,
          analytics: !0,
          enableABTest: !1,
          attributesToRetrieve: "*",
          attributesToSnippet: "*:20",
          responseFields: "*",
          explain: "*",
          facets: ["*", "category", "tags"],
        };
      }
      constructor(e) {
        this.url = e;
      }
      search(e, t = []) {
        let s = new URL(this.url),
          o = new URLSearchParams(s.search);
        return (
          o.append("search", e.replaceAll("+", "%2B").replaceAll("-", "%2D")),
          t.forEach((i) => {
            o.append(i.key, i.val);
          }),
          fetch(s.toString() + "?" + o.toString(), {
            method: "POST",
            headers: {
              Accept: "application/json",
              Origin: "https://doka.guide",
            },
          }).then((i) => i.json())
        );
      }
    },
    Le = new V("https://search.doka.guide"),
    N = Le;
  var M = new Set([
    "a",
    "b",
    "br",
    "dd",
    "dl",
    "dt",
    "em",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "i",
    "li",
    "ol",
    "p",
    "q",
    "rb",
    "rp",
    "rt",
    "s",
    "td",
    "th",
    "tr",
    "tt",
    "u",
    "ul",
    "ch",
    "cm",
    "em",
    "ex",
    "ic",
    "in",
    "is",
    "lh",
    "mm",
    "ms",
    "pc",
    "pt",
    "px",
    "s",
    "vh",
    "vw",
    "if",
    "of",
  ]);

  function D(n) {
    return n
      ? n.map((e) => ({
          originalTitle: e.title,
          title: e.title,
          summary: e.fragments ? e.fragments : [],
          url: `${e.link}`,
          category: e.category,
          tags: e.tags,
        }))
      : [];
  }
  var b = class {
      static get constants() {
        return {
          animationStateClass: "logo__image--animation",
          animationName: "logoAnimation",
        };
      }
      constructor() {
        let e = Array.from(document.querySelectorAll(".logo")).pop();
        (this.refs = {
          rootElement: e,
          image: e.querySelector(".logo__image"),
        }),
          (this._isAnimation = !1);
      }
      startAnimation() {
        this._isAnimation ||
          ((this._isAnimation = !0),
          this.refs.image.classList.add(b.constants.animationStateClass));
      }
      endAnimation() {
        this.refs.image.addEventListener(
          "animationiteration",
          (e) => {
            e.animationName === b.constants.animationName &&
              ((this._isAnimation = !1),
              this.refs.image.classList.remove(
                b.constants.animationStateClass
              ));
          },
          {
            once: !0,
          }
        );
      }
    },
    H = new b();

  function Ce() {
    return P(this, null, function* () {
      return (yield Promise.resolve().then(() => (oe(), se))).default;
    });
  }

  function be() {
    return P(this, null, function* () {
      if (window.location.pathname.indexOf("/search/") > -1) return;
      let e = yield Ce();
      if (!e) return;
      let t = 150;

      function s(o) {
        let i = o.detail;
        if (!(i.length >= 3 || M.has(i))) {
          e.clearOutput();
          return;
        }
        e.openSuggestion(),
          H.startAnimation(),
          N.search(i)
            .then((r) => {
              let a = D(r).map((c) =>
                Z(G({}, c), {
                  title: te(c.title),
                })
              );
              e.renderResults(a);
            })
            .catch(console.error)
            .finally(() => {
              H.endAnimation();
            });
      }
      A.on("menu.close", () => {
        e.exit();
      }),
        e.on("search", T(s, t));
    });
  }
  be();
  q();
  var W = class extends y {
      constructor({ form: e }) {
        super(),
          (this.refs = {
            form: e,
          }),
          Array.from(e.elements)
            .filter((t) => !!t.name)
            .forEach((t) => {
              t.addEventListener("input", this);
            }),
          e.addEventListener("reset", () => {
            setTimeout(() => {
              this.emit("reset", this.state);
            });
          }),
          queueMicrotask(() => {
            this.emit("change.query", this.state);
          });
      }
      get state() {
        let e = new FormData(),
          t = new FormData(this.refs.form);
        for (let [s, o] of t) o && e.append(s, o);
        return e;
      }
      set state(e) {
        let { form: t } = this.refs;
        for (let [s, o] of e.entries())
          switch (s) {
            case "query": {
              t.elements[s].value = o;
              break;
            }
            case "tag":
            case "category": {
              let r = Array.from(t.elements[s]).find((a) => a.value === o);
              r.checked = !0;
              break;
            }
          }
      }
      handleEvent(e) {
        let { name: t } = e.target;
        switch (t) {
          case "query": {
            this.emit("change.query", this.state);
            break;
          }
          default:
            this.emit("change.filter", this.state);
        }
        this.emit("change", this.state);
      }
    },
    v = class extends y {
      static get matchedItems() {
        return 3;
      }
      static isPlaceholder(e) {
        return e.tags.includes("placeholder");
      }
      static replaceBackticks(e, t) {
        return e.replace(/`(.*?)`/g, t);
      }
      static get templates() {
        return {
          summaryItem: (e) =>
            `<p class="search-hit__summary-item">${e.replaceAll(
              "<mark>",
              '<mark class="search-hit__marked">'
            )}</p>`,
          titleCode:
            '<code class="search-hit__link-code code-fix font-theme font-theme--code">$1</code>',
          textCode:
            '<code class="search-hit__text-code code-fix font-theme font-theme--code">$1</code>',
          placeholderIcon:
            '<span class="search-hit__edit font-theme font-theme--code" aria-hidden="true"></span>',
          hit: (e) => {
            let t = v.isPlaceholder(e) ? v.templates.placeholderIcon : "",
              s = v.replaceBackticks(
                e.title.replaceAll(
                  "<mark>",
                  '<mark class="search-hit__marked">'
                ),
                v.templates.titleCode
              ),
              o = e.summary
                .slice(0, v.matchedItems)
                .map((i) => v.templates.summaryItem(i))
                .join("");
            return `
          <article class="search-hit" style="--accent-color: var(--color-base-${e.category})">
            <h3 class="search-hit__title">
              <a class="search-hit__link link" href="${e.url}">
                ${t}${s}
              </a>
            </h3>
            <div class="search-hit__summary">
              ${o}
            </div>
          </article>
        `;
          },
          hits: (e) => `
        <ol class="search-result-list base-list">
          ${e
            .map(
              (t) => `
              <li class="search-result-list__item">
                ${v.templates.hit(t)}
              </li>
            `
            )
            .join("")}
        </ol>
      `,
          emptyResults: () => `
        <div class="search-page__empty">\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E</div>
      `,
        };
      }
      constructor({ element: e }) {
        super(),
          (this.refs = {
            element: e,
          });
      }
      renderHits(e, t, s) {
        let { element: o } = this.refs,
          i =
            !e || e.length === 0
              ? v.templates.emptyResults()
              : v.templates.hits(e, t, s);
        o.innerHTML = i;
      }
      clear() {
        let { element: e } = this.refs;
        e.innerHTML = "";
      }
    };

  function Ae() {
    let n = ".search",
      e = ".search__input",
      t = ".search__output",
      s = document.querySelector(n),
      o = document.querySelector(e),
      i = document.querySelector(t),
      r = new W({
        form: s,
      });
    r.state = new URLSearchParams(location.search);
    let a = new v({
      element: i,
    });

    function c(f) {
      return [
        [...f.getAll("category")].map((p) => ({
          key: "category",
          val: p,
        })),
        [...f.getAll("tag")].map((p) => ({
          key: "tags",
          val: p,
        })),
      ].flat();
    }

    function d(f, k) {
      let p = new URLSearchParams(f).toString();
      return (p = p ? "?" + p : k), p;
    }

    function l(f, k) {
      f.length >= 3 || M.has(f)
        ? (H.startAnimation(),
          N.search(f, k)
            .then(function (p) {
              let O = D(p);
              a.renderHits(O, f, 150);
            })
            .catch((p) => {
              console.error(p);
            })
            .finally(() => {
              H.endAnimation();
            }))
        : a.clear();
    }

    function h(f) {
      let k = f.detail,
        p = k.get("query") || "",
        O = c(k);
      l(p, O);
    }

    function m(f) {
      let k = f.detail,
        p = d(k, location.pathname);
      history.replaceState(null, null, p);
    }
    let S = T(h, 150);

    function E() {
      o.focus(),
        s.addEventListener("submit", (f) => {
          f.preventDefault();
        }),
        document.addEventListener("keydown", (f) => {
          f.code === "Slash" &&
            document.activeElement !== o &&
            f.preventDefault();
        }),
        document.addEventListener("keyup", (f) => {
          f.code === "Escape" && s.reset(),
            f.code === "Slash" &&
              document.activeElement !== o &&
              setTimeout(() => {
                o.focus();
              });
        });
    }
    E(),
      r.on("change", m),
      r.on("reset", m),
      r.on("reset", () => {
        a.clear();
      }),
      r.on("change.filter", h),
      r.on("change.query", S);
  }
  var He = window.location.pathname.indexOf("/search/") > -1;
  He && Ae();

  function Oe() {
    let n = document.querySelector(".search-page__aside"),
      e = document.querySelector(".search-page__aside-button");
    (!n && !e) ||
      e.addEventListener("click", () => {
        n.classList.toggle("search-page__aside--open");
      });
  }
  Oe();
  q();
  var L = class extends y {
      static get EVENTS() {
        return {
          ANSWER: "answer",
          CORRECTION: "correction",
        };
      }
      constructor({
        rootElement: e,
        childsSelector: t,
        childActiveClass: s,
        answerCondition: o = (i) => i.type !== "button",
      }) {
        super();
        let i = e == null ? void 0 : e.querySelectorAll(t);
        e.addEventListener("click", (r) => {
          let a = r.target.closest(t);
          if (!a) return;
          for (let l of i) l.classList.toggle(s, l === a);
          let d = o(a) ? L.EVENTS.ANSWER : L.EVENTS.CORRECTION;
          this.emit(d, a.value);
        });
      }
    },
    w = class extends y {
      static get EVENTS() {
        return {
          ANSWER: "answer",
        };
      }
      static get TEXT_THRESHOLD() {
        return 4;
      }
      constructor({ rootElement: e }) {
        super(),
          (this.textarea = e.querySelector("textarea")),
          (this.button = e.querySelector("button")),
          this.button.addEventListener("click", () => {
            let t = this.textarea.value.trim();
            t.length >= w.TEXT_THRESHOLD && this.emit(w.EVENTS.ANSWER, t);
          }),
          ["keydown", "keyup"].forEach((t) => {
            this.textarea.addEventListener(t, (s) => {
              s.stopPropagation();
            });
          });
      }
      focus() {
        this.textarea.focus();
      }
    };

  function Re() {
    let n = document.querySelector(".feedback-form");
    if (!n) return;
    let e = n.querySelector(".vote--down"),
      t = n.querySelector(".vote--up"),
      s = n.querySelector(".feedback-form__fieldset--reason"),
      o = n.querySelector(".feedback-form__text"),
      i = !1;

    function r() {
      return fetch("/api.json")
        .then((h) => h.json())
        .then((h) => h.token);
    }

    function a(h) {
      let m = JSON.stringify({
          type: "feedback",
          data: JSON.stringify(h),
          author_id: 1,
        }),
        S = "https://api.doka.guide/form";
      return r()
        .then((E) =>
          fetch(S, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: E,
            },
            body: m,
          })
        )
        .then((E) => {
          if (!E.ok) throw E;
          return E;
        });
    }
    let c = new w({
      rootElement: o,
    });
    c.on(w.EVENTS.ANSWER, () => {
      setTimeout(() => {
        (s.disabled = !0), (t.disabled = !0);
      });
    });
    let d = new L({
      rootElement: n.querySelector(".feedback-form__fieldset--vote"),
      childsSelector: ".vote",
      childActiveClass: "vote--active",
    });
    d.on(
      L.EVENTS.ANSWER,
      () => {
        setTimeout(() => {
          (e.disabled = !0), (s.disabled = !0);
        });
      },
      {
        once: !0,
      }
    ),
      d.on(L.EVENTS.CORRECTION, () => {
        s.hidden = !1;
      });
    let l = new L({
      rootElement: s,
      childsSelector: ".feedback-form__reason-button",
      childActiveClass: "button--active",
    });
    l.on(
      L.EVENTS.ANSWER,
      () => {
        setTimeout(() => {
          (s.disabled = !0), (t.disabled = !0), (o.hidden = !0);
        });
      },
      {
        once: !0,
      }
    ),
      l.on(L.EVENTS.CORRECTION, () => {
        (o.hidden = !1), c.focus();
      }),
      n.addEventListener("submit", (h) => {
        var E;
        if ((h.preventDefault(), i)) return;
        let S =
          new FormData(n).get("answer") ||
          ((E = h.submitter) == null ? void 0 : E.value);
        !(S && S.length >= w.TEXT_THRESHOLD) ||
          ((i = !0),
          a({
            answer: S,
            article_id: window.location.pathname,
          })
            .then(() => {
              n.dataset.state = "success";
            })
            .catch((f) => {
              (n.dataset.state = "error"), console.error(f);
            })
            .finally(() => {
              i = !1;
            }));
      });
  }
  try {
    Re();
  } catch (n) {
    console.error(n);
  }
  q();
  var x = class extends y {
      static get EVENTS() {
        return {
          QUESTION: "question",
          CORRECTION: "correction",
        };
      }
      constructor({
        rootElement: e,
        childsSelector: t,
        childActiveClass: s,
        questionCondition: o = (i) => i.type !== "button",
      }) {
        super();
        let i = e == null ? void 0 : e.querySelectorAll(t);
        e.addEventListener("click", (r) => {
          let a = r.target.closest(t);
          if (!a) return;
          for (let l of i) l.classList.toggle(s, l === a);
          let d = o(a) ? x.EVENTS.QUESTION : x.EVENTS.CORRECTION;
          this.emit(d, a.value);
        });
      }
    },
    C = class extends y {
      static get EVENTS() {
        return {
          QUESTION: "question",
        };
      }
      static get TEXT_THRESHOLD() {
        return 4;
      }
      constructor({ rootElement: e }) {
        super(),
          (this.textarea = e.querySelector("textarea")),
          (this.button = e.querySelector("button")),
          this.button.addEventListener("click", () => {
            let t = this.textarea.value.trim();
            t.length >= C.TEXT_THRESHOLD && this.emit(C.EVENTS.QUESTION, t);
          }),
          ["keydown", "keyup"].forEach((t) => {
            this.textarea.addEventListener(t, (s) => {
              s.stopPropagation();
            });
          });
      }
      focus() {
        this.textarea.focus();
      }
    };

  function Ie() {
    let n = document.querySelector(".question-form");
    if (!n) return;
    let e = n.querySelector(".question-form__fieldset"),
      t = n.querySelector(".question-form__text"),
      s = !1;

    function o() {
      return fetch("/api.json")
        .then((c) => c.json())
        .then((c) => c.token);
    }

    function i(c) {
      let d = JSON.stringify({
          type: "question",
          data: JSON.stringify(c),
          author_id: 1,
        }),
        l = "https://api.doka.guide/form";
      return o()
        .then((h) =>
          fetch(l, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: h,
            },
            body: d,
          })
        )
        .then((h) => {
          if (!h.ok) throw h;
          return h;
        });
    }
    let r = new C({
      rootElement: t,
    });
    r.on(C.EVENTS.QUESTION, () => {
      setTimeout(() => {
        e.disabled = !0;
      });
    });
    let a = new x({
      rootElement: e,
      childsSelector: ".question-form__question-button",
      childActiveClass: "button--active",
    });
    a.on(
      x.EVENTS.QUESTION,
      () => {
        setTimeout(() => {
          (e.disabled = !0), (t.hidden = !0);
        });
      },
      {
        once: !0,
      }
    ),
      a.on(x.EVENTS.CORRECTION, () => {
        (t.hidden = !1), r.focus();
      }),
      n.addEventListener("submit", (c) => {
        var m;
        if ((c.preventDefault(), s)) return;
        let d = new FormData(n),
          l =
            d.get("question") || ((m = c.submitter) == null ? void 0 : m.value),
          h = d.get("person");
        !(l && l.length >= C.TEXT_THRESHOLD) ||
          ((s = !0),
          i({
            question: l,
            person: h,
            date: new Date().toUTCString(),
          })
            .then(() => {
              n.dataset.state = "success";
            })
            .catch((S) => {
              (n.dataset.state = "error"), console.error(S);
            })
            .finally(() => {
              s = !1;
            }));
      });
  }
  try {
    Ie();
  } catch (n) {
    console.error(n);
  }

  function Ne() {
    let n = document.querySelectorAll("pre[data-lang]");
    if (n.length === 0) return;

    function e() {
      n.forEach((s) => {
        let o = s.querySelectorAll(".block-code__original-line"),
          i = s.querySelectorAll(".block-code__line");
        o.forEach((r, a) => {
          i[a].style.height = `${getComputedStyle(r).height}`;
        });
      });
    }
    let t = T(e, 100);
    window.addEventListener("resize", t),
      window.addEventListener("orientationchange", t),
      e();
  }
  Ne();

  function Me() {
    let n = document.querySelector(".cookie-notification"),
      e = n == null ? void 0 : n.querySelector("button");
    if (!n && !e) return;
    let t = "cookie-notification";
    try {
      if (JSON.parse(localStorage.getItem(t))) return;
    } catch (s) {
      console.error(s);
    }
    (n.hidden = !1),
      e.addEventListener(
        "click",
        () => {
          (n.hidden = !0), localStorage.setItem(t, !0);
        },
        {
          once: !0,
        }
      );
  }
  Me();

  function De() {
    if (!!!document.querySelector(".article__content-inner")) return;
    let e = {
        IDLE: "idle",
        SUCCESS: "success",
        ERROR: "error",
      },
      t = 5e3;
    document.addEventListener("click", (s) => {
      let o = s.target.closest(".block-code__copy-button");
      if (!o) return;
      let i = o.closest(".block-code");
      if (!i) return;
      let r = i.querySelector(".block-code__highlight");
      !r ||
        ((o.disabled = !0),
        navigator.clipboard
          .writeText(r.textContent)
          .then(() => {
            o.dataset.state = e.SUCCESS;
          })
          .catch(() => {
            o.dataset.state = e.ERROR;
          })
          .finally(() => {
            setTimeout(() => {
              (o.dataset.state = e.IDLE), (o.disabled = !1);
            }, t);
          }));
    });
  }
  De();

  function Pe() {
    let n = document.querySelector(".people-page");
    if (!n) return;
    let e = n.querySelector(".people-page__filter"),
      t = n.querySelector(".person-grid"),
      [s, ...o] = Array.from(n.querySelectorAll(".tag-filter__control"));

    function i() {
      return o.filter((l) => l.checked).map((l) => l.value);
    }

    function r() {
      t.dataset.filters = i().join(",");
    }

    function a() {
      let l = [...new FormData(e).entries()].filter(([, m]) => !!m),
        h =
          l.length !== 0
            ? "?" + new URLSearchParams(l)
            : window.location.pathname;
      history.pushState(null, null, h);
    }

    function c() {
      let l = new URLSearchParams(window.location.search),
        h = new Set([...l.values()]);
      for (let m of o) m.checked = h.has(m.value);
      s.checked = h.size === 0;
    }

    function d(l) {
      let { value: h, checked: m } = l.target;
      switch (!0) {
        case !h && m: {
          for (let S of o) S.checked = !1;
          break;
        }
        case !h && !m: {
          s.checked = !0;
          break;
        }
        case h && m: {
          s.checked = !1;
          break;
        }
        case h && !m: {
          i().length === 0 && (s.checked = !0);
          break;
        }
      }
      r(), a();
    }
    e.addEventListener("change", d), c(), r();
  }
  Pe();

  function Fe() {
    let n = document.querySelector(".filter-panel"),
      e = document.querySelector(".filter-panel__button");
    (!n && !e) ||
      e.addEventListener("click", () => {
        n.classList.toggle("filter-panel--open");
      });
  }
  Fe();

  function Ue() {
    let [n, e] = [
      document.querySelector(".linked-article--previous .linked-article__link"),
      document.querySelector(".linked-article--next .linked-article__link"),
    ];
    if (!(n || e)) return;

    function t(s) {
      window.location = s.href;
    }
    document.addEventListener("keyup", (s) => {
      if (!s.altKey) return;
      let o = {
        ArrowLeft: n,
        ArrowRight: e,
      }[s.code];
      o && t(o);
    });
  }
  Ue();
})();
 */
