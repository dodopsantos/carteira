"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 3422:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "k": () => (/* binding */ ArrowIndicator)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);



function ArrowIndicator() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("svg", {
    className: "absolute left-2/4 bottom-5 ml-[-30px] h-[72px] w-[60px]",
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("path", {
      className: "animation-delay:-1s; animate-[arrow_2s_infinite] fill-transparent stroke-[#2994D1] stroke-[1px]",
      d: "M0 0 L30 32 L60 0"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("path", {
      className: "animation-delay:-0.5s animate-[arrow_2s_infinite] fill-transparent stroke-[#2994D1] stroke-[1px]",
      d: "M0 20 L30 52 L60 20"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("path", {
      className: "animation-delay:0s animate-[arrow_2s_infinite] fill-transparent stroke-[#2994D1] stroke-[1px]",
      d: "M0 40 L30 72 L60 40"
    })]
  });
}

/***/ }),

/***/ 8340:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ BackgroundVideo)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);



function BackgroundVideo() {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
      className: "absolute z-0 hidden min-h-full w-full min-w-full justify-center overflow-hidden opacity-70 md:flex",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("video", {
        className: "flex w-full",
        autoPlay: true,
        muted: true,
        playsInline: true,
        loop: true,
        preload: "/preload.webp",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("source", {
          src: "/background.webm",
          type: "video/webm"
        })
      })
    })
  });
}

/***/ }),

/***/ 5470:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Carousel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6197);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_1__]);
framer_motion__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const images = ['/image7.webp', '/image1.webp', '/image4.webp', '/image6.webp', '/image2.webp', '/image3.webp', '/image5.webp'];
function Carousel() {
  const carousel = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const {
    0: width,
    1: setWidth
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
  }, []);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
    className: "my-0 my-auto flex w-full max-w-[80vw] items-center justify-center md:max-w-[60vw]",
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
      ref: carousel,
      className: "cursor-grab overflow-hidden",
      whileTap: {
        cursor: 'grabbing'
      },
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
        className: "flex",
        drag: "x",
        dragConstraints: {
          right: 0,
          left: -width + 200
        },
        initial: {
          x: 200
        },
        animate: {
          x: 0
        },
        transition: {
          duration: 0.8
        },
        children: images.map((image, index) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
          className: "min-h-[400px] min-w-[527px] p-4",
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("img", {
            className: "h-11/12 pointer-events-none w-full rounded border-2 border-gray-800",
            src: image,
            alt: "Game images",
            loading: "lazy"
          })
        }, index))
      })
    })
  });
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 332:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Effects)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./src/utils/data/effects.json
const effects_namespaceObject = JSON.parse('[{"title":"Sorte","description":"O atributo SORTE desempenha um papel crucial na obtenção de itens e recompensas ao derrotar monstros. A sorte é representada como uma porcentagem que multiplica a chance fixa de drop de um determinado monstro ao ser derrotado. Suponhamos que um monstro tenha uma taxa de drop de 5% para um item valioso. Se o personagem tiver um valor de sorte de 150%, a chance de drop desse item será multiplicada por 1,5, resultando em uma chance de 7,5% de obtê-lo ao derrotar o monstro.","source":"/luck.mkv"},{"title":"Regeneração de vida","description":"Quando o personagem não está envolvido em combates ativos, a regeneração de vida entra em ação, permitindo que ele se recupere gradualmente ao longo do tempo. Isso é particularmente útil para restabelecer a vida após batalhas intensas ou situações de perigo. Suponhamos que um personagem tenha uma regeneração de vida de 20% por segundo e sua vida máxima seja de 1000 pontos. Nesse caso, o personagem regenerará 200 pontos de vida a cada segundo fora de combate, permitindo uma recuperação constante e progressiva.","source":"/life-regen.mkv"},{"title":"Regeneração de mana","description":"Quando o personagem não está envolvido em combates ativos, a regeneração de mana entra em ação, permitindo que ele recupere gradualmente sua reserva de mana. Isso é particularmente útil para personagens mágicos, pois lhes permite recuperar recursos mágicos rapidamente. Suponhamos que um personagem tenha uma regeneração de mana de 20% pontos por segundo e uma mana máxima de 1000 pontos. Nesse caso, o personagem regenerará 200 pontos de mana a cada segundo fora de combate, possibilitando uma recuperação constante e progressiva.","source":"/mana-regen.mkv"},{"title":"Roubo de vida","description":"Quando o personagem ataca um inimigo, uma parte do dano causado é transformada em uma quantidade correspondente de vida recuperada. Essa recuperação de vida ocorre simultaneamente ao dano infligido ao oponente, permitindo que o personagem mantenha sua saúde durante o combate. Por exemplo, suponha que o personagem tenha uma habilidade de roubo de vida com uma taxa de 20% e cause um dano de 1000 pontos em um inimigo. Nesse caso, o personagem recuperaria 200 pontos de vida como resultado do ataque.","source":"/lifesteal.mkv"},{"title":"Roubo de mana","description":"Quando o personagem ataca um inimigo, uma parte do dano causado é transformada em uma quantidade correspondente de mana recuperada. Essa recuperação de mana ocorre simultaneamente ao dano infligido ao oponente, permitindo que o personagem mantenha sua reserva de mana durante o combate. Por exemplo, suponha que o personagem tenha uma habilidade de roubo de mana com uma taxa de 20% e cause um dano de 1000 pontos em um inimigo. Nesse caso, o personagem recuperaria 200 pontos de mana como resultado do ataque.","source":"/manasteal.mkv"},{"title":"Resiliência","description":"A resiliência é representada por uma taxa ou valor que determina a chance de um personagem evitar ou resistir a efeitos negativos. Quanto maior for o valor de resiliência, maior será a probabilidade de evitar ou mitigar os efeitos adversos que normalmente afetariam o personagem. Por exemplo, se um personagem tiver uma resiliência de 20%, ele terá uma chance de 20% de evitar ou reduzir os efeitos negativos que normalmente seriam aplicados a ele. Isso permite que o personagem permaneça ativo e continue contribuindo para o combate, evitando ser imobilizado, envenenado ou debilitado.","source":"/resilience.mkv"},{"title":"Velocidade de ataque","description":"Um alto valor de velocidade de ataque permite que o personagem ataque mais vezes em um curto espaço de tempo, aumentando seu potencial de dano e a capacidade de derrotar inimigos mais rapidamente. Isso é particularmente útil para personagens que se especializam em combate corpo a corpo e dependem de ataques físicos para causar dano. Por exemplo, se um personagem tiver uma velocidade de ataque de 2 ataques por segundo, ele será capaz de executar dois ataques físicos em um segundo. Isso pode ser vantajoso em confrontos de curta duração, permitindo que o personagem cause mais dano em um período menor.","source":"/speed.mkv"},{"title":"Bônus de EXP","description":"Quando um personagem possui um bônus de experiência ativo, ele recebe uma quantidade adicional de experiência em relação à quantidade padrão fornecida pela ação concluída. Por exemplo, se um personagem ganhar 100 pontos de experiência ao derrotar um monstro e tiver um bônus de experiência de 20%, ele receberá 120 pontos de experiência no total. O bônus de experiência é especialmente útil para acelerar o crescimento e o desenvolvimento do personagem. Ao ganhar experiência mais rapidamente, o personagem pode subir de nível mais rapidamente, desbloquear novas habilidades e melhorar suas estatísticas. Isso permite que o jogador acesse conteúdos mais desafiadores e se torne mais poderoso ao longo do tempo.","source":"/exp.mkv"},{"title":"Taxa crítica","description":"A taxa crítica é representada por um valor percentual que indica a chance de um ataque do personagem ser considerado crítico. Normalmente, um ataque crítico causa mais dano do que um ataque comum, resultando em um impacto maior no oponente. A taxa crítica é influenciada por fatores como atributos do personagem, equipamentos, habilidades especiais ou buffs temporários. Por exemplo, se um personagem tiver uma taxa crítica de 20%, isso significa que ele tem uma chance de 20% de executar um ataque crítico em um determinado golpe. Esse ataque crítico pode causar um multiplicador de dano adicional, como 1,5x ou 2x, dependendo das mecânicas do jogo.","source":"/crit.mkv"}]');
// EXTERNAL MODULE: ./node_modules/next/dynamic.js
var dynamic = __webpack_require__(5152);
var dynamic_default = /*#__PURE__*/__webpack_require__.n(dynamic);
// EXTERNAL MODULE: ./src/components/Heading/index.tsx
var Heading = __webpack_require__(9031);
// EXTERNAL MODULE: ./src/components/Text/index.tsx
var Text = __webpack_require__(1605);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./src/modules/homepage/components/effects.tsx







const ReactPlayer = dynamic_default()(() => Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 782, 23)), {
  ssr: false,
  loadableGenerated: {
    modules: ["..\\modules\\homepage\\components\\effects.tsx -> " + 'react-player/lazy']
  }
});
function Effects() {
  const {
    0: activated,
    1: setActivated
  } = (0,external_react_.useState)(0);
  const {
    0: source,
    1: setSource
  } = (0,external_react_.useState)('/luck.mkv');
  (0,external_react_.useEffect)(() => {
    setSource(effects_namespaceObject[activated].source);
  }, [activated]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "block h-4/5 w-full justify-center gap-12 md:flex md:w-[80vw]",
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "flex justify-center md:w-1/5",
      children: /*#__PURE__*/jsx_runtime_.jsx("ul", {
        className: "grid h-full w-full grid-flow-col grid-rows-3 gap-2 rounded md:flex md:flex-col md:gap-2",
        children: effects_namespaceObject.map((item, idx) => /*#__PURE__*/jsx_runtime_.jsx("li", {
          onClick: () => setActivated(idx),
          className: `rounded text-xs md:relative md:text-sm ${activated === idx ? 'bg-teal-700 p-2 hover:bg-teal-600' : 'bg-gray-700 p-2 hover:bg-gray-600 '} flex cursor-pointer items-center justify-center before:absolute before:top-0 before:left-0 before:block before:h-1 before:w-full before:bg-[url('/label.webp')] before:bg-contain before:bg-repeat-x after:absolute after:bottom-0 after:left-0 after:block after:h-1 after:w-full after:bg-[url('/label.webp')] after:bg-contain after:bg-repeat-x`,
          children: /*#__PURE__*/jsx_runtime_.jsx(Text/* Text */.x, {
            size: "lg",
            children: item.title
          })
        }, idx))
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "mt-4 w-full md:mt-0 md:w-4/5 xl:w-3/5",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "w-full rounded border-4 border-double border-teal-700 bg-gray-900/50 p-6",
        children: [/*#__PURE__*/jsx_runtime_.jsx(Heading/* Heading */.X, {
          size: "md",
          className: "max-h-1/5 text-center uppercase",
          children: effects_namespaceObject[activated].title
        }), /*#__PURE__*/jsx_runtime_.jsx(Text/* Text */.x, {
          size: "lg",
          asChild: true,
          children: /*#__PURE__*/jsx_runtime_.jsx("p", {
            className: "max-h-1/5 mx-auto my-4 text-justify",
            children: effects_namespaceObject[activated].description
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(ReactPlayer, {
          light: "/thumbnail.png",
          className: "max-h-3/5 mx-auto my-0 hidden md:block",
          url: source,
          width: "100%",
          height: "100%",
          controls: true
        })]
      })
    })]
  });
}

/***/ }),

/***/ 9198:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ MenuInfo)
/* harmony export */ });
/* harmony import */ var _components_Heading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9031);
/* harmony import */ var _components_Text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1605);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);






function MenuInfo() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "align-center z-10 mt-[10vh] flex max-w-3xl flex-col justify-center rounded p-6 md:mt-0",
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
      className: "flex w-full justify-center",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
        src: "/SOF2.webp",
        className: "header__logo",
        alt: "Sword of Fate Logo",
        width: 3500,
        height: 696
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "mb-16 rounded bg-gray-900/70",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_components_Heading__WEBPACK_IMPORTED_MODULE_0__/* .Heading */ .X, {
        size: "lg",
        className: "mb-5 text-center",
        children: "Explore um Mundo Totalmente Novo!"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_components_Text__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .x, {
        size: "xl",
        asChild: true,
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("p", {
          className: " text-center",
          children: "Uma experi\xEAncia \xE9pica de MMORPG, focada em jogabilidade, comunidade e no design \xFAnico do Bleach!"
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "mb-14 flex flex-col justify-around gap-2 md:flex-row md:gap-0",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_components_Text__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .x, {
        size: "lg",
        asChild: true,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("a", {
          className: "flex w-full justify-center gap-x-5 rounded border-2 border-solid border-white bg-gradient-to-l from-gray-800 to-gray-900 py-6 px-9 text-center text-white hover:border-yellow hover:text-yellow md:w-2/5",
          href: "#",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
            src: "/AccountIcon.svg",
            width: "25.89",
            height: "25.89",
            alt: "Create"
          }), "CRIE UMA CONTA"]
        })
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_components_Text__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .x, {
        size: "lg",
        asChild: true,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("a", {
          className: "flex w-full justify-center gap-x-5 rounded border-2 border-solid border-white bg-gradient-to-l from-gray-800 to-gray-900 py-6 px-9 text-center text-white hover:border-yellow hover:text-yellow md:w-2/5",
          href: "#",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
            src: "/download.svg",
            width: "25.89",
            height: "25.89",
            alt: "download"
          }), "BAIXAR JOGO"]
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "relative block w-full max-w-3xl",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "absolute top-[calc(50%_-_9px)] right-1/2 h-1 w-[calc(100%_-_84px)] translate-x-1/2 translate-y-1/2 \r before:absolute \r before:top-1 \r before:left-0 \r before:block \r before:h-1 \r before:w-full \r before:bg-[url('/label.webp')] \r before:bg-contain \r before:bg-repeat-x\r after:absolute \r after:bottom-1 \r after:left-0 \r after:block \r after:h-1 \r after:w-full \r after:bg-[url('/label.webp')] \r after:bg-contain \r after:bg-repeat-x",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("span", {
          className: "z-1 absolute block h-1 w-full rounded bg-black"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("span", {
          className: "z-2 absolute block h-1 w-full w-1/3 rounded border-y border-[#8aaa1b] bg-[#b1d435]"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("ul", {
        className: "align-center flex flex-row justify-between",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("li", {
          className: "min-w-28 relative cursor-pointer gap-0.5 text-center",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
            src: "/bleachLogo.webp",
            width: "60px",
            height: "60px",
            quality: 100,
            alt: "logo"
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_components_Text__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .x, {
            asChild: true,
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("p", {
              className: "md:uppercase",
              children: "Beta interno"
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("li", {
          className: "min-w-28 relative cursor-pointer gap-0.5 text-center",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
            src: "/bleachLogo.webp",
            width: 60,
            height: 60,
            quality: 100,
            alt: "logo"
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_components_Text__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .x, {
            size: "lg",
            asChild: true,
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("p", {
              className: "text-hollow md:uppercase",
              children: "Beta fechado"
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("li", {
          className: "min-w-28 relative cursor-pointer gap-0.5 text-center",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
            src: "/incomplete.webp",
            width: 60,
            height: 60,
            quality: 100,
            alt: "logo"
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_components_Text__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .x, {
            asChild: true,
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("p", {
              className: "md:uppercase",
              children: "Beta aberto"
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("li", {
          className: "min-w-28 relative cursor-pointer gap-0.5 text-center",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
            src: "/incomplete.webp",
            width: 60,
            height: 60,
            quality: 100,
            alt: "logo"
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_components_Text__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .x, {
            asChild: true,
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("p", {
              className: "md:uppercase",
              children: "Lan\xE7amento"
            })
          })]
        })]
      })]
    })]
  });
}

/***/ }),

/***/ 9880:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ PlayableClasses)
/* harmony export */ });
/* harmony import */ var _components_Heading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9031);
/* harmony import */ var _components_Text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1605);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);





function PlayableClasses({
  callback
}) {
  const {
    0: activity,
    1: setActivity
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);

  const handleCallback = data => {
    setActivity(data);
    callback(data);
  };

  const metadata = [{
    title: 'Shinigami',
    type: 'shinigami',
    description: 'Cada Shinigami começa sua jornada empunhando uma Zanpakuto única, uma espada espiritual imbuida com habilidades especiais. Ao longo da progressão, o jogador tem a oportunidade de desbloquear poderosas formas Shikai e, eventualmente, a lendária forma Bankai de sua Zanpakuto, expandindo seu arsenal de habilidades.'
  }, {
    title: 'Hollow',
    type: 'hollow',
    description: 'A principal característica dos Hollows é a capacidade de se transformarem em diferentes formas. Os jogadores começam como Hollows básicos, mas podem evoluir para formas mais poderosas à medida que progridem, como Gillians, Adjuchas e até mesmo Arrankars, ganhando habilidades especiais em cada estágio.'
  }, {
    title: 'Quincy',
    type: 'quincy',
    description: 'Os Quincy possuem um talento natural para a manipulação de Reishi, a energia espiritual. Isso se traduz em habilidades de combate excepcionais, como a capacidade de criar armas espirituais chamadas "Armas Quincy" a partir de Reishi, disparar flechas espirituais de alta precisão e aprimorar seus sentidos espirituais.'
  }, {
    title: 'Humano',
    type: 'ryoka',
    description: 'Os Humanos começam sua jornada com habilidades espirituais emergentes. Isso inclui a habilidade de detectar energias espirituais e, em alguns casos, manifestar poderes psíquicos. Cada jogador humano pode desenvolver essas habilidades ao longo do jogo, desbloqueando novas capacidades e refinando suas técnicas.'
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_components_Text__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .x, {
      size: "lg",
      asChild: true,
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("p", {
        className: "mx-auto max-w-3xl rounded bg-gray-800/95 px-6 py-2",
        children: "Cada um dos Arqu\xE9tipos oferece uma s\xE9rie de habilidades \xFAnicas. Se lan\xE7ar no calor do combate, atirar em seus inimigos \xE0 dist\xE2ncia, ou ser um curandeiro que tamb\xE9m pode causar estragos usando a for\xE7a dos elementos? Em Ravendawn, tudo isso \xE9 poss\xEDvel! Combine at\xE9 tr\xEAs Arqu\xE9tipos para personalizar verdadeiramente seu estilo de jogo."
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
      className: "mt-6",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "mx-auto my-0 max-w-full bg-gray-800/95 py-2 md:max-w-[60%]",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("ul", {
          className: "w-100 h-100 flex justify-around p-4",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("li", {
            className: `relative h-14 w-14 origin-center rotate-45 ${activity === 0 && 'shadow-[0_0_17px_rgba(255,94,0,1)] duration-300 ease-in'}`,
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
              className: "pointer bg-transparent",
              onClick: () => handleCallback(0),
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("img", {
                className: "-rotate-45",
                src: "/shinigami.png",
                alt: ""
              })
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("li", {
            className: `relative h-14 w-14 origin-center rotate-45 ${activity === 1 && 'shadow-[0_0_17px_rgba(166,254,49,1)] duration-300 ease-in'}`,
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
              className: "pointer bg-transparent",
              onClick: () => handleCallback(1),
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("img", {
                className: "-rotate-45",
                src: "/arrankar.png",
                alt: ""
              })
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("li", {
            className: `relative h-14 w-14 origin-center rotate-45 ${activity === 2 && 'shadow-[0_0_17px_rgba(0,82,162,1)] duration-300 ease-in'}`,
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
              className: "pointer bg-transparent",
              onClick: () => handleCallback(2),
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("img", {
                className: "-rotate-45",
                src: "/quincy.png",
                alt: ""
              })
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("li", {
            className: `relative h-14 w-14 origin-center rotate-45 ${activity === 3 && 'shadow-[0_0_17px_rgba(255,251,0,1)] duration-300 ease-in'}`,
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
              className: "pointer bg-transparent",
              onClick: () => handleCallback(3),
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("img", {
                className: "-rotate-45",
                src: "ryoka.png",
                alt: ""
              })
            })
          })]
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
          className: `my-4 border duration-300 ease-in ${activity === 0 ? 'border-shinigami' : activity === 1 ? 'border-hollow' : activity === 2 ? 'border-quincy' : activity === 3 ? 'border-ryoka' : ''}  `
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "mx-auto my-0 mt-4 max-w-[80%] py-2",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_components_Heading__WEBPACK_IMPORTED_MODULE_0__/* .Heading */ .X, {
            size: "sm",
            className: `mb-4 text-center uppercase duration-300 ease-in ${activity === 0 ? 'text-shinigami' : activity === 1 ? 'text-hollow' : activity === 2 ? 'text-quincy' : activity === 3 ? 'text-ryoka' : ''}  `,
            children: metadata[activity.toString()]?.title
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_components_Text__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .x, {
            size: "lg",
            asChild: true,
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("p", {
              className: "text-justify duration-300 ease-in",
              children: metadata[activity.toString()]?.description
            })
          })]
        })]
      })
    })]
  });
}

/***/ }),

/***/ 7494:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Homepage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_backgroundVideo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8340);
/* harmony import */ var _components_menuInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9198);
/* harmony import */ var _components_carousel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5470);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_effects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(332);
/* harmony import */ var _components_playableClasses__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9880);
/* harmony import */ var _components_ArrowIndicator_arrowIndicator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3422);
/* harmony import */ var _components_Heading__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9031);
/* harmony import */ var _components_Text__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1605);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_carousel__WEBPACK_IMPORTED_MODULE_3__]);
_components_carousel__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];













function Homepage() {
  const {
    0: background,
    1: setBackground
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("section", {
      className: "flex min-h-screen items-center justify-center bg-gray-900 bg-[url('/backgroundNews.webp')] text-gray-100 md:bg-none",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_components_backgroundVideo__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {}), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_components_menuInfo__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {}), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_components_ArrowIndicator_arrowIndicator__WEBPACK_IMPORTED_MODULE_7__/* .ArrowIndicator */ .k, {})]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("section", {
      className: "z-1 before:z-1 relative flex justify-center bg-[url('/backgroundNews.webp')] text-center text-gray-100 before:absolute before:top-0 before:left-0 before:block before:h-7 before:w-full before:bg-[url('/module.webp')] before:bg-contain before:bg-repeat-x after:bg-[url('/module.webp')]",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
        className: "pt-24 pb-36 md:px-6",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_components_Heading__WEBPACK_IMPORTED_MODULE_8__/* .Heading */ .X, {
          size: "lg",
          className: "uppercase",
          children: "Explore um mundo de aventuras"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
          alt: "Logo",
          src: "/divider.svg",
          width: 100,
          height: 100,
          quality: 100
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_components_Text__WEBPACK_IMPORTED_MODULE_9__/* .Text */ .x, {
          size: "lg",
          asChild: true,
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("p", {
            className: "mx-auto my-0 max-w-3xl px-6 text-center text-justify md:px-0",
            children: "Em Sword of Fate, o mundo \xE9 seu para conquistar! A imensid\xE3o dos mapas permite que voc\xEA explore praticamente em qualquer lugar - Entre o mundo dos humanos, shinigamis e hollows. Tudo o que voc\xEA precisa fazer \xE9 adquirir poder e reunir amigos para estabelecer seu dominio e construir sua pr\xF3pria guild. Sword of Fate \xE9 a sua nova experiencia no universo de Bleach, construi sua hist\xF3ria e principalmente, divirta-se!"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
          className: "flex items-center gap-1",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("div", {
            className: "relative h-8 w-8 max-w-[10vw]",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
              src: "/arrow-left.svg",
              color: "teal",
              layout: "fill",
              objectFit: "contain",
              alt: "arrows-left"
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_components_carousel__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {}), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("div", {
            className: "relative h-8 w-8 max-w-[10vw]",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
              src: "/arrow-right.svg",
              color: "teal",
              layout: "fill",
              objectFit: "contain",
              alt: "arrows-right"
            })
          })]
        })]
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_components_ArrowIndicator_arrowIndicator__WEBPACK_IMPORTED_MODULE_7__/* .ArrowIndicator */ .k, {})]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("section", {
      className: `before:z-1 relative flex justify-center bg-[#242424] ${background === 0 ? 'bg-[url(/ryujin.webp)]' : background === 1 ? 'bg-[url(/ulquiorra.webp)]' : background === 2 ? 'bg-[url(/quincy.webp)]' : background === 3 ? 'bg-[url(/ryoka.webp)]' : ''}   bg-bottom bg-no-repeat text-center text-gray-100 duration-300 ease-in before:absolute before:top-0 before:left-0 before:block before:h-7 before:w-full before:bg-[url('/module.webp')] before:bg-contain before:bg-repeat-x`,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
        className: "px-6 pt-24 pb-36",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_components_Heading__WEBPACK_IMPORTED_MODULE_8__/* .Heading */ .X, {
          size: "lg",
          className: `mx-auto w-fit rounded bg-gray-800/95 px-2 uppercase`,
          children: "Classes jog\xE1veis"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
          alt: "Logo",
          src: "/divider.svg",
          width: 100,
          height: 100,
          quality: 100
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_components_playableClasses__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
          callback: e => setBackground(e)
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_components_ArrowIndicator_arrowIndicator__WEBPACK_IMPORTED_MODULE_7__/* .ArrowIndicator */ .k, {})]
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("section", {
      className: "before:z-1 relative flex justify-center bg-[#242424] bg-[url('/mechanics.webp')]  bg-bottom bg-no-repeat text-center text-gray-100 before:absolute before:top-0 before:left-0 before:block before:h-7 before:w-full before:bg-[url('/module.webp')] before:bg-contain before:bg-repeat-x",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
        className: "px-6 pt-24 pb-36",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_components_Heading__WEBPACK_IMPORTED_MODULE_8__/* .Heading */ .X, {
          size: "lg",
          className: "uppercase",
          children: "Mec\xE2nicas e efeitos \xFAnicos"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
          alt: "Logo",
          src: "/divider.svg",
          width: 100,
          height: 100,
          quality: 100
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_components_effects__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {})]
      })
    })]
  });
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3639:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Home),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_homepage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7494);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7783);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_modules_homepage__WEBPACK_IMPORTED_MODULE_1__]);
_modules_homepage__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




function Home() {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("main", {
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_components_layout__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_modules_homepage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {})
      })
    })
  });
}
const getServerSideProps = async ctx => {
  // const { ['nextauth-token']: token } = parseCookies(ctx);
  // if (!token) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false
  //     }
  //   };
  // }
  return {
    props: {}
  };
};
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2324:
/***/ ((module) => {

module.exports = require("@radix-ui/react-slot");

/***/ }),

/***/ 8103:
/***/ ((module) => {

module.exports = require("clsx");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 5832:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/loadable.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 782:
/***/ ((module) => {

module.exports = require("react-player/lazy");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 6197:
/***/ ((module) => {

module.exports = import("framer-motion");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [383,61,152,339,783], () => (__webpack_exec__(3639)));
module.exports = __webpack_exports__;

})();