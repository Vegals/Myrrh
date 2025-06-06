# CSS Structure Documentation

This directory contains all the source CSS files that get compiled by Vite into the theme assets.

## Directory Structure

```
src/css/
├── theme/
│   ├── styles.css          # Main theme entry point (compiled to styles.css)
│   ├── header.css          # Header component styles
│   ├── footer.css          # Footer component styles
│   └── hello-world.css     # Hello World section styles
├── collection/
│   ├── import--collection.css  # Collection page entry point (compiled to collection.css)
│   └── collection-grid.css     # Collection grid layout styles
├── product/
│   ├── import--product.css     # Product page entry point (compiled to product.css)
│   └── product-form.css        # Product form and page styles
├── password/
│   ├── import--password.css    # Password page entry point (compiled to password.css)
│   └── password-form.css       # Password form and page styles
└── README.md                   # This documentation file
```

## How it works

1. **Entry Files**: The `import--*.css` and `styles.css` files are entry points defined in `vite.config.mjs`
2. **Component Files**: Individual component CSS files are imported into the entry files using `@import`
3. **Compilation**: Vite compiles these into corresponding files in `theme/assets/`
4. **Usage**: Liquid templates include the compiled CSS files using `{{ 'filename.css' | asset_url | stylesheet_tag }}`

## CSS Loading Strategy

- **styles.css**: Loaded globally in `theme.liquid` - contains all theme-wide styles
- **collection.css**: Loaded only on collection pages via `collection.liquid` section
- **product.css**: Loaded only on product pages via `product.liquid` section  
- **password.css**: Loaded only on password pages via `password.liquid` section

## Adding New Styles

1. Create component-specific CSS files in appropriate directories
2. Import them in the relevant entry file using `@import './component.css'`
3. Run `npm run build` to compile
4. Reference in liquid templates using `{{ 'entry-name.css' | asset_url | stylesheet_tag }}` 