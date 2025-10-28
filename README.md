# VP CDN

A public CDN repository for hosting static assets (CSS, JavaScript, fonts, and images) for the VP project.

## 📖 Overview

This repository serves as a content delivery network (CDN) for the main VP project's theme assets. All files are publicly accessible via jsDelivr CDN, providing fast and reliable delivery of static resources.

## 🚀 Usage

All assets in this repository can be accessed via jsDelivr CDN using the following base URL:

```
https://cdn.jsdelivr.net/gh/vpltd/vp_panel_cdn@main/
```

### Example Usage

#### Loading CSS Files

```html
<!-- Bootstrap CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/vpltd/vp_panel_cdn@main/assets/css/bootstrap.min.css">

<!-- App CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/vpltd/vp_panel_cdn@main/assets/css/app.min.css">

<!-- Icons CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/vpltd/vp_panel_cdn@main/assets/css/icons.min.css">
```

#### Loading JavaScript Files

```html
<!-- App JS -->
<script src="https://cdn.jsdelivr.net/gh/vpltd/vp_panel_cdn@main/assets/js/app.js"></script>

<!-- Chunk Uploader -->
<script src="https://cdn.jsdelivr.net/gh/vpltd/vp_panel_cdn@main/assets/js/chunk_uploader.js"></script>
```

#### Loading Images

```html
<!-- Logo -->
<img src="https://cdn.jsdelivr.net/gh/vpltd/vp_panel_cdn@main/assets/images/logo-dark.png" alt="Logo">

<!-- Favicon -->
<link rel="icon" href="https://cdn.jsdelivr.net/gh/vpltd/vp_panel_cdn@main/assets/images/favicon.ico">
```

## 📂 Project Structure

```
vp_panel_cdn/
├── assets/
│   ├── css/                    # Stylesheets
│   │   ├── bootstrap.min.css   # Bootstrap framework
│   │   ├── app.min.css         # Main application styles
│   │   ├── icons.min.css       # Icon fonts
│   │   └── ...
│   ├── js/                     # JavaScript files
│   │   ├── app.js              # Main application script
│   │   ├── chunk_uploader.js   # File upload utility
│   │   └── pages/              # Page-specific scripts
│   ├── fonts/                  # Web fonts
│   │   ├── Font Awesome
│   │   ├── Material Design Icons
│   │   ├── Remix Icons
│   │   └── ...
│   ├── images/                 # Image assets
│   │   ├── logos
│   │   ├── icons
│   │   ├── backgrounds
│   │   └── ...
│   ├── libs/                   # Third-party libraries
│   └── webcamjs/              # Webcam utility
├── manifest/                   # PWA manifest files
└── sw.js                       # Service worker
```

## 🎨 Available Assets

### CSS Files
- **Bootstrap**: `bootstrap.min.css`, `bootstrap-dark.min.css`, `bootstrap.css`
- **Application**: `app.min.css`, `app-dark.min.css`, `app-rtl.min.css`
- **Icons**: `icons.min.css`
- **PDF Viewer**: `pdfjs-viewer.css`

### JavaScript Files
- **Core**: `app.js`
- **Utilities**: `chunk_uploader.js`, `html_text_diff_highlighter.js`, `pdfjs-viewer.js`
- **Page Scripts**: Available in `assets/js/pages/` directory

### Icon Fonts
- Font Awesome (Brands, Regular, Solid)
- Material Design Icons
- Remix Icons
- Dripicons v2

### Third-Party Libraries
Located in `assets/libs/` with various UI components and utilities.

## 🔗 CDN Benefits

- ✅ **Fast Delivery**: Global CDN with automatic caching
- ✅ **Version Control**: Use specific commits or tags for stability
- ✅ **No Hosting Costs**: Free CDN hosting via jsDelivr
- ✅ **Automatic Minification**: jsDelivr provides automatic compression
- ✅ **High Availability**: 99.9% uptime SLA

## 📌 Version Pinning

To ensure stability, you can pin to a specific version:

```html
<!-- Using a specific commit -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/vpltd/vp_panel_cdn@{commit-hash}/assets/css/app.min.css">

<!-- Using a tag/release -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/vpltd/vp_panel_cdn@v1.0.0/assets/css/app.min.css">

<!-- Using main branch (latest) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/vpltd/vp_panel_cdn@main/assets/css/app.min.css">
```

## 🛠️ Updating Assets

1. Make changes to the files in this repository
2. Commit and push to the `main` branch
3. Wait for jsDelivr to update its cache (usually 12-24 hours)
4. Or use a versioned URL to bypass cache immediately

### Force Cache Refresh

To force jsDelivr to update the cache, you can:
- Use a specific commit hash in the URL
- Create and use a new tag/release
- Wait for the automatic cache expiration

## 📝 Notes

- This is a **public repository** - all files are accessible to anyone
- Changes to `main` branch may take time to reflect due to CDN caching
- Use version pinning in production environments for stability
- Minified files are recommended for production use

## 📄 License

This project contains various assets with their respective licenses. Please refer to individual library documentation for licensing information.

## 🤝 Contributing

This repository is maintained by the VP team. For issues or suggestions, please contact the project maintainers.

---

**Repository**: [vpltd/vp_panel_cdn](https://github.com/vpltd/vp_panel_cdn)  
**CDN Provider**: [jsDelivr](https://www.jsdelivr.com/)
