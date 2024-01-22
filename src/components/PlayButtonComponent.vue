<template>
  <button class="play-button">
    <span class="text-container">
      <span class="text"><slot /></span>
    </span>
  </button>
</template>

<style scoped>
.play-button,
.play-button *,
.play-button :after,
.play-button :before,
.play-button:after,
.play-button:before {
  border: 0 solid;
  box-sizing: border-box;
}

.play-button {
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: button;
  appearance: button;
  background-color: var(--vt-c-black);
  background-image: none;
  color: var(--vt-c-white);
  cursor: pointer;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-size: 100%;
  font-weight: 900;
  line-height: 1.5;
  margin: 0;
  -webkit-mask-image: -webkit-radial-gradient(var(--vt-c-black), var(--vt-c-white));
  mask-image: radial-gradient(var(--vt-c-black), var(--vt-c-white));
  padding: 0;
}

.play-button:disabled {
  cursor: default;
}

.play-button:-moz-focusring {
  outline: auto;
}

.play-button svg {
  display: block;
}

.play-button [hidden] {
  display: none;
}

.play-button {
  border-width: 1px;
  padding: 1rem 2rem;
  position: relative;
  text-transform: uppercase;
}

.play-button:before {
  --progress: 100%;
  background: var(--vt-c-white);
  -webkit-clip-path: polygon(
    100% 0,
    var(--progress) var(--progress),
    0 100%,
    100% 100%
  );
  clip-path: polygon(
    100% 0,
    var(--progress) var(--progress),
    0 100%,
    100% 100%
  );
  content: "";
  inset: 0;
  position: absolute;
  transition: -webkit-clip-path 0.2s ease;
  transition: clip-path 0.2s ease;
  transition: clip-path 0.2s ease, -webkit-clip-path 0.2s ease;
}

.play-button:hover:before {
  --progress: 0%;
}

.play-button .text-container {
  display: block;
  overflow: hidden;
  position: relative;
}

.play-button .text {
  display: block;
  font-weight: 900;
  mix-blend-mode: difference;
  position: relative;
}

.play-button:hover .text {
  -webkit-animation: move-up-alternate 0.3s ease forwards;
  animation: move-up-alternate 0.3s ease forwards;
}

@-webkit-keyframes move-up-alternate {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(80%);
  }

  51% {
    transform: translateY(-80%);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes move-up-alternate {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(80%);
  }

  51% {
    transform: translateY(-80%);
  }

  to {
    transform: translateY(0);
  }
}
</style>