function updateLoading(el: HTMLElement, value: boolean | string) {
  const overlay = (el as any)._loadingOverlay as HTMLElement | undefined;
  if (!overlay) return;

  if (!value && value !== '') {
    overlay.style.display = 'none';
    return;
  }

  overlay.style.display = 'flex';
  const label = overlay.querySelector<HTMLSpanElement>('[data-loading-text]')!;
  label.textContent = typeof value === 'string' ? value : '';
}

export default defineNuxtPlugin((app) => {
  useHead({
    style: [{
      id: 'v-loading-ssr',
      innerHTML: `
        [data-v-loading]{position:relative}
        [data-v-loading]::before{content:'';position:absolute;inset:0;z-index:10;background:rgba(255,255,255,.7);backdrop-filter:blur(4px);border-radius:inherit}
        .dark [data-v-loading]::before{background:rgba(23,23,23,.7)}
        [data-v-loading]::after{content:'';position:absolute;top:50%;left:50%;width:1.5rem;height:1.5rem;margin:-0.75rem 0 0 -0.75rem;z-index:11;border-radius:50%;border:2px solid currentColor;border-top-color:transparent;animation:v-loading-spin .6s linear infinite}
        @keyframes v-loading-spin{to{transform:rotate(360deg)}}
      `.trim(),
    }],
  });

  app.vueApp.directive<HTMLElement, boolean | string>('loading', {
    getSSRProps(binding) {
      if (!binding.value && binding.value !== '') return {};
      return {
        'data-v-loading': '',
        style: { position: 'relative' },
      };
    },

    mounted(el, binding) {
      // SSR에서 주입된 data-v-loading 제거 (JS 오버레이로 전환)
      el.removeAttribute('data-v-loading');

      const overlay = document.createElement('div');
      overlay.className =
        'absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-[inherit] bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm';
      overlay.style.display = 'none';

      const spinner = document.createElement('div');
      spinner.className =
        'size-6 animate-spin rounded-full border-2 border-current border-t-transparent text-primary';

      const label = document.createElement('span');
      label.dataset.loadingText = '';
      label.className = 'text-sm text-muted';

      overlay.append(spinner, label);
      ;(el as any)._loadingOverlay = overlay;

      if (getComputedStyle(el).position === 'static') {
        el.style.position = 'relative';
        ;(el as any)._loadingPositionSet = true;
      }

      el.appendChild(overlay);
      updateLoading(el, binding.value);
    },

    updated(el, binding) {
      if (binding.value !== binding.oldValue) {
        updateLoading(el, binding.value);
      }
    },

    unmounted(el) {
      ;(el as any)._loadingOverlay?.remove();
      delete (el as any)._loadingOverlay;
      if ((el as any)._loadingPositionSet) {
        el.style.position = '';
        delete (el as any)._loadingPositionSet;
      }
    },
  });
});
