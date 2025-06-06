import shopifyEslintPlugin from '@shopify/eslint-plugin';

export default [
  ...shopifyEslintPlugin.configs.esnext,
  {
    files: ['theme/assets/*.js'],
    languageOptions: {
      globals: {
        // Browser globals
        window: true,
        document: true,
        console: true,
        fetch: true,
        setTimeout: true,
        clearTimeout: true,
        setInterval: true,
        clearInterval: true,
        DOMParser: true,
        Event: true,
        CustomEvent: true,
        MutationObserver: true,
        IntersectionObserver: true,
        sessionStorage: true,
        getComputedStyle: true,
        requestAnimationFrame: true,
        cancelAnimationFrame: true,
        HTMLElement: true,
        customElements: true,
        FormData: true,
        URL: true,
        URLSearchParams: true,
        
        // Shopify globals
        Shopify: true,
        
        // jQuery
        $: true,
        jQuery: true,

        // Your global functions and classes
        initializeCarousel: true,
        Ajaxinate: true,
        initResponsiveImages: true,
        showDebugInfo: true,
        currentSlide: true
      }
    },
    rules: {
      // Disable or warn for common issues
      'no-console': 'off',  // Allow console for debugging
      'no-unused-vars': 'warn',
      'no-shadow': 'warn',
      'no-nested-ternary': 'warn',
      'no-lonely-if': 'off',
      'no-return-assign': 'off',
      'no-inner-declarations': 'off',
      'no-loop-func': 'warn',
      'no-var': 'error',  // Encourage using let/const
      'no-redeclare': 'error',
      'block-scoped-var': 'warn',

      // Disable other strict rules
      'id-length': 'off',
      '@shopify/binary-assignment-parens': 'off',
      'line-comment-position': 'off',
      '@babel/no-invalid-this': 'off',
      'consistent-this': 'off',
      '@shopify/prefer-early-return': 'off',
      'no-negated-condition': 'off',
      'radix': 'off',
      'func-style': 'off',
      'prefer-rest-params': 'off',
      '@babel/no-unused-expressions': 'off',
      'promise/no-return-wrap': 'off',
      'no-void': 'off'
    }
  }
];
