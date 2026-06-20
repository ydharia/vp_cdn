# Third-Party Notice -- VP_Panel_CDN

This CDN bundle hosts the static client-side assets (JavaScript, CSS,
fonts, images) consumed by the Virtual Pharmacist Panel platform. The
bundle is published from this repository to jsDelivr at
<https://cdn.jsdelivr.net/gh/vpltd/vp_panel_cdn@main/>.

An internal third-party-library inventory identified **53 distinct
open-source libraries** vendored within `assets/`. This notice
attributes each one with its licence, version (where determinable from
the file banner or filename pattern), and upstream source. Where a
library is dual-licensed Virtual Pharmacist Ltd makes the licence
election explicit below.

A separate document, `UPSTREAM_PROVENANCE.md`, records an unresolved
question about the originating admin-dashboard template from which this
bundle's overall structure may be derived. That question is tracked
independently from the open-source-library attributions below.

---

## 1. Copyleft and dual-licensed components -- election required

### 1.1 `tinymce` (TinyMCE rich-text editor)

- Detected files: 112 across `assets/libs/tinymce/`
- Detected version: see file banner inside `tinymce.min.js` (version
  string recorded in the internal inventory)
- Licence: **LGPL-2.1-or-later**
- Upstream: <https://www.tiny.cloud/> -- <https://github.com/tinymce/tinymce>

Under the LGPL, this product satisfies the runtime source-availability
obligation by linking to the upstream TinyMCE repository at the pinned
version. To replace TinyMCE with a modified version, replace the files
under `assets/libs/tinymce/` with the modified build. The upstream
source for TinyMCE remains available at
<https://github.com/tinymce/tinymce> under the LGPL-2.1-or-later
licence.

Virtual Pharmacist Ltd has not modified the upstream TinyMCE source.

### 1.2 `plupload` v2.1.2 -- GPL-licensed, replacement tracked

- Detected version: **2.1.2** (per the version banner inside
  `assets/libs/plupload/plupload.dev.js`: `"Plupload - multi-runtime
  File Uploader / v2.1.2 / Copyright 2013, Moxiecode Systems AB /
  Released under GPL License"`). The bundled `moxie.js` runtime is
  v1.2.1, also "Released under GPL License" per its banner.
- Licence: **GPL** as declared by the upstream banner. The
  plupload.com licence page documents this as dual GPL / Commercial
  (commercial requires a paid Moxiecode / Tiny licence).
- Use within this product: file-upload UI on certain admin pages
  (referenced from chunk_uploader.js). The plupload runtime currently
  falls back to HTML5 in all modern browsers because the Flash and
  Silverlight runtime URLs in chunk_uploader.js point to paths that
  no longer exist (see section 4 below).

This is a deal-relevant licence finding for a proprietary
multi-tenant SaaS. A replacement is tracked internally as an
engineering project. Until then, this notice does not constitute an
election or acceptance of GPL terms; the file-upload paths that load
plupload are documented for the planned migration.

### 1.3 `jszip` -- MIT election

- Detected files: 2 (`assets/libs/jszip/jszip.min.js` and
  `assets/user/libs/jszip/jszip.min.js`)
- Detected version: 3.3.0
- Licence as published: **(MIT OR GPL-3.0)** (dual)
- Election: Virtual Pharmacist Ltd elects to use `jszip` under the
  terms of the **MIT Licence**.
- Upstream: <https://stuk.github.io/jszip/>

### 1.4 `multi-select`

- Licence as published: **WTFPL/MIT** dual
- Election: Virtual Pharmacist Ltd elects to use `multi-select` under
  the terms of the **MIT Licence**.
- Upstream: <http://loudev.com/>

---

## 2. Attribution-required components

### 2.1 `bootstrap-datepicker`, `bootstrap-maxlength`, `bootstrap-touchspin`, `pdf.js`

These four components are licensed under the **Apache-2.0** licence.
Apache-2.0 requires preservation of the upstream copyright notice and
licence file. The bundled package files contain the required notices
in their headers and the copies of LICENSE / NOTICE files (where
supplied by the upstream project). No additional action is required
beyond not removing those headers.

Upstreams:

- `bootstrap-datepicker` -- <https://github.com/uxsolutions/bootstrap-datepicker>
- `bootstrap-maxlength` -- <https://github.com/mimo84/bootstrap-maxlength>
- `bootstrap-touchspin` -- <https://github.com/istvan-ujjmeszaros/bootstrap-touchspin>
- `pdf.js` -- <https://mozilla.github.io/pdf.js/> (Mozilla)

### 2.2 `jquery-sparkline` -- BSD-3-Clause

- Detected files: 2
- Licence: **BSD-3-Clause**
- Upstream: <https://omnipotent.net/jquery.sparkline/>

Attribution preserved in the bundled file's banner.

---

## 3. MIT-licensed components (the bulk of the bundle)

The libraries below are vendored under the standard **MIT Licence**. No
licence election is required. The bundled banners preserve the original
copyright notices. Virtual Pharmacist Ltd has not modified any of these
libraries.

| Library | Detected version | Files | Upstream |
|---------|------------------|------:|----------|
| `apexcharts` | 3.19.0 | 10 | <https://apexcharts.com/> |
| `bootstrap` | 3.3.0 + 4.5.0 | 24 | <https://getbootstrap.com/> |
| `bootstrap-colorpicker` | -- | 4 | <https://itsjavi.com/bootstrap-colorpicker/> |
| `bootstrap-editable` (x-editable) | 1.5.1 | 4 | <https://github.com/vitalets/x-editable> |
| `bootstrap-rating` | 1.3.2 | 2 | <https://github.com/dreyescat/bootstrap-rating> |
| `bs-custom-file-input` | 1.3.4 | 2 | <https://github.com/Johann-S/bs-custom-file-input> |
| `chance` | -- | 2 | <https://chancejs.com/> |
| `chart.js` | 2.9.3 | 4 | <https://www.chartjs.org/> |
| `curiosityx-bootstrap-session-timeout` | -- | 2 | <https://github.com/orangehill/bootstrap-session-timeout> |
| `datatables.net` | 1.10.21 | 6 | <https://datatables.net/> |
| `datatables.net-autofill` | 2.3.5 | 4 | <https://datatables.net/extensions/autofill/> |
| `datatables.net-buttons` | 1.6.2 | 14 | <https://datatables.net/extensions/buttons/> |
| `datatables.net-keytable` | 2.5.2 | 2 | <https://datatables.net/extensions/keytable/> |
| `datatables.net-responsive` | 2.2.5 | 6 | <https://datatables.net/extensions/responsive/> |
| `datatables.net-select` | 1.3.1 | 4 | <https://datatables.net/extensions/select/> |
| `dragula` | -- | 2 | <https://bevacqua.github.io/dragula/> |
| `dropzone` | -- | 14 | <https://www.dropzone.dev/> |
| `flot.curvedlines` | -- | 6 | <https://github.com/MichaelZinsmaier/CurvedLines> |
| `fullcalendar` | 3.10.2 | 164 | <https://fullcalendar.io/> |
| `gmaps` | -- | 26 | <https://github.com/HPNeo/gmaps> |
| `inputmask` | -- | 4 | <https://github.com/RobinHerbots/Inputmask> |
| `ion-rangeslider` | 2.3.1 | 4 | <https://github.com/IonDen/ion.rangeSlider> |
| `jquery` | 1.3.2, 1.8.3, 1.12.4, 3.4.1 | 14 | <https://jquery.com/> |
| `jquery-countdown` | 2.2.0 | 2 | <https://github.com/hilios/jQuery.countdown> |
| `jquery-knob` | -- | 2 | <https://github.com/aterrien/jQuery-Knob> |
| `jquery-ui` | 1.12.1 | 8 | <https://jqueryui.com/> |
| `jquery.flot` | 0.8.3 | 64 | <http://www.flotcharts.org/> |
| `jquery.flot.tooltip` | -- | 4 | <https://github.com/krzysu/flot.tooltip> |
| `magnific-popup` | 1.1.0 | 4 | <https://dimsemenov.com/plugins/magnific-popup/> |
| `metismenu` | -- | 8 | <https://github.com/onokumus/metismenu> |
| `moment` | -- | 262 | <https://momentjs.com/> |
| `node-waves` | 0.7.6 | 4 | <https://github.com/fians/Waves> |
| `owl.carousel` | 2.3.4 | 4 | <https://owlcarousel2.github.io/OwlCarousel2/> |
| `parsleyjs` | -- | 96 | <https://parsleyjs.org/> |
| `pdfmake` | 0.1.65 | 4 | <https://pdfmake.github.io/> |
| `round-slider` | 1.5.2 | 4 | <https://roundsliderui.com/> |
| `select2` | 4.0.13 | 38 | <https://select2.org/> |
| `simplebar` | 4.2.3 | 6 | <https://grsmto.github.io/simplebar/> |
| `summernote` | -- | 107 | <https://summernote.org/> |
| `sweetalert2` | -- | 6 | <https://sweetalert2.github.io/> |
| `toastr` | -- | 12 | <https://github.com/CodeSeven/toastr> |
| `twitter-bootstrap-wizard` | -- | 2 | <https://github.com/VinceG/twitter-bootstrap-wizard> |
| `webcamjs` | 1.0.25 | 2 | <https://github.com/jhuckaby/webcamjs> |

A subset of the bundle (32 files under `admin-resources`) consists of
multi-library composite files whose individual upstream attributions
are preserved in their file headers.

---

## 4. Removed: end-of-life plug-in runtimes and historical archives

The bundle previously included the following files which have now been
removed. They were end-of-life Adobe Flash / Microsoft Silverlight
runtime binaries (no current browser loads either format) or
historical NuGet packaging archives that were never served from the
CDN.

Removed Flash / Silverlight binaries:

- `assets/libs/plupload/Moxie.swf` (plupload Flash runtime)
- `assets/libs/plupload/Moxie.xap` (plupload Silverlight runtime)
- `assets/libs/datatables.net-buttons/swf/flashExport.swf` (DataTables Flash exporter)
- `assets/user/libs/datatables.net-buttons/swf/flashExport.swf` (mirror of the above)
- `assets/webcamjs/webcam.swf` (webcamjs Flash fallback)

Removed historical archives:

- `assets/libs/plupload.zip` (plupload 2.x source distribution archive)
- `assets/libs/toastr/nuget/` (43 historical toastr NuGet packages, versions 1.0.0 through 2.0.3)
- `assets/user/libs/toastr/nuget/` (mirror of the above)

Plupload, DataTables Buttons and webcamjs are still loaded from this
bundle; each one falls back to HTML5 implementations in current
browsers, so removing the legacy plug-in binaries does not change
runtime behaviour.
