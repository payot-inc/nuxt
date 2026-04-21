function updateLoading(el: HTMLElement, value: boolean | string) {
  const overlay = (el as any)._loadingOverlay as HTMLElement | undefined;
  
  // 1. SSR 속성 제어: 값이 falsy하면 SSR CSS를 트리거하는 속성을 확실히 제거
  if (!value && value !== '') {
    el.removeAttribute('data-v-loading');
    if (overlay) overlay.style.display = 'none';
    return;
  }

  // 2. 값이 존재하면 SSR 속성을 제거하고 JS 오버레이를 활성화
  el.removeAttribute('data-v-loading');
  if (overlay) {
    overlay.style.display = 'flex';
    const label = overlay.querySelector<HTMLSpanElement>('[data-loading-text]');
    if (label) label.textContent = typeof value === 'string' ? value : '';
  }
}

export default defineNuxtPlugin((app) => {
  // SSR 스타일 정의 (기존과 동일)
  useHead({
    style: [{
      id: 'v-loading-ssr',
      innerHTML: `
        [data-v-loading="true"]{position:relative !important}
        [data-v-loading="true"]::before{content:'';position:absolute;inset:0;z-index:10;background:rgba(255,255,255,.7);backdrop-filter:blur(4px);border-radius:inherit}
        .dark [data-v-loading="true"]::before{background:rgba(23,23,23,.7)}
        [data-v-loading="true"]::after{content:'';position:absolute;top:50%;left:50%;width:1.5rem;height:1.5rem;margin:-0.75rem 0 0 -0.75rem;z-index:11;border-radius:50%;border:2px solid currentColor;border-top-color:transparent;animation:v-loading-spin .6s linear infinite}
        @keyframes v-loading-spin{to{transform:rotate(360deg)}}
      `.trim(),
    }],
  });

  app.vueApp.directive<HTMLElement, boolean | string>('loading', {
    getSSRProps(binding) {
      if (!binding.value && binding.value !== '') return {};
      // SSR 상태임을 명시적으로 불리언 문자열로 저장
      return { 'data-v-loading': 'true' };
    },

    mounted(el, binding) {
      // 오버레이 생성 로직
      const overlay = document.createElement('div');
      overlay.className = 'absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-[inherit] bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm';
      overlay.style.display = 'none';

      const spinner = document.createElement('div');
      spinner.className = 'size-6 animate-spin rounded-full border-2 border-current border-t-transparent text-primary';

      const label = document.createElement('span');
      label.dataset.loadingText = '';
      label.className = 'text-sm text-muted';

      overlay.append(spinner, label);
      (el as any)._loadingOverlay = overlay;

      if (window.getComputedStyle(el).position === 'static') {
        el.style.position = 'relative';
        (el as any)._loadingPositionSet = true;
      }

      el.appendChild(overlay);
      
      // 초기 상태 업데이트
      updateLoading(el, binding.value);
    },

    updated(el, binding) {
      if (binding.value !== binding.oldValue) {
        updateLoading(el, binding.value);
      }
    },

    unmounted(el) {
      (el as any)._loadingOverlay?.remove();
      el.removeAttribute('data-v-loading');
      if ((el as any)._loadingPositionSet) {
        el.style.position = '';
      }
    },
  });
});
