# Upstream provenance -- CONFIRMED Skote admin template

This document records the identified upstream origin of the assets in
this CDN bundle and the licensing questions that follow from that
identification. It is a flag for the Virtual Pharmacist Ltd commercial
and legal tracks.

## Identified upstream

The assets in this repository are derived from the **Skote -- Bootstrap
4 Admin & Dashboard Template** by **Themesbrand** (sold on ThemeForest,
item ID 24863098).

Confirmation evidence:

- **Bundled JavaScript stack**: Bootstrap 4.5.0 + metismenu (collapsible
  sidebar) + simplebar (custom scrollbar) + node-waves (Material Design
  button ripple effects) + toastr + sweetalert2 -- this exact combination
  is the Skote signature stack.
- **CSS class names in `assets/user/css/app.min.css`** (Skote-specific,
  not generic Bootstrap): `page-topbar`, `navbar-brand-box`,
  `vertical-menu`, `logo-light` / `logo-dark`, `app-search`,
  `simplebar-content`, `main-content`.
- **Skote brand colour palette** present in `app.min.css`: `#505d69`
  (navbar text), `#74788d` (secondary text), `#f1f5f7` (light
  background).
- **Asset filename conventions** under `assets/user/images/` match
  Skote's distribution: `authentication-bg.jpg`, `comingsoon-bg.jpg`,
  `error-img.png`, `maintenance-bg.png`, `megamenu-img.png`, and the
  `logo-light` / `logo-dark` / `logo-sm-light` / `logo-sm-dark`
  multi-variant logo set.

The same fingerprint set would not match Velzon (also Themesbrand, but
built on Bootstrap 5, with different sidebar and scrollbar libraries)
or Hyper (Coderthemes, different sidebar library).

## Licensing situation

Skote is sold under standard Envato licensing. Two tiers exist:

- **Regular Licence** (current price ~24 USD): permits use in a single
  end product where end users are **not charged**. Does NOT cover
  multi-tenant SaaS where users pay for access.
- **Extended Licence** (current price ~995 USD): permits use in a single
  end product where end users **can be charged**. Covers multi-tenant
  SaaS.

In addition, Envato licences are **non-transferable to acquirers** by
default. A sale or material change of control to a third party requires written
consent from Themesbrand or from Envato.

Virtual Pharmacist is a paid multi-tenant SaaS used by pharmacists and
practice clinicians, so the **Extended Licence is the applicable tier**
for the current usage. The current operating state is unverified -- it
is not yet known whether the original purchase was a Regular or
Extended Licence.

## Why this matters

Any third-party SCA / commercial-licensing review will fingerprint this
bundle against ThemeForest commercial templates and identify Skote.
The reviewer will then request:

1. Evidence of the original purchase (Envato invoice with order
   number).
2. Evidence that the licence in use is Extended (covers multi-tenant
   SaaS).
3. Evidence that the licence can transfer to any acquirer in a sale
   or material change of control.

If those three pieces of evidence cannot be produced, the reviewer will
treat the Skote dependency as a commercial-licensing blocker.

## Action required (legal / commercial track)

This question is NOT something the engineering team can resolve. It
requires the following steps, in order:

1. **Locate the original Envato / ThemeForest purchase receipt** for
   the Skote template. Search:
   - Email archives for "themeforest", "envato", "Skote", "Themesbrand"
   - Accounting records for ThemeForest or Envato transactions
   - The ThemeForest account "Downloads" page (login + downloads
     section shows historical purchases with licence tier)
2. **Confirm which licence tier was purchased**. ThemeForest stamps the
   licence tier on the invoice and on the download page.
3. **If a Regular Licence was purchased**: upgrade to an Extended
   Licence through ThemeForest. Themesbrand support also handles
   upgrades.
4. **For any change of control or acquisition**: request written
   permission from Themesbrand (or Envato Support) for the Skote
   licence to transfer. State the acquirer's name and intended use.

If the licence cannot be confirmed and upgraded, the practical paths
forward are (engineering-led, but only after a legal decision):

- Negotiate an Extended Licence plus a transfer addendum with
  Themesbrand or Envato.
- Replace Skote with a theme whose licence does cover this usage --
  for example, an MIT-licensed open-source admin theme such as Tabler,
  CoreUI Free, or an internally-built CSS layer on Bootstrap 5.

Both paths are tracked internally as multi-week projects.

## What about the OSS libraries Skote bundles

Skote distributes a curated set of permissively-licensed third-party
libraries (jQuery, Bootstrap, fullcalendar, etc.). Those have their
own licences which are documented separately in `NOTICE.md`. The
licence question covered by this document is specifically about the
**Skote template itself** (the layout, the CSS, the asset bundle, the
page templates) -- not the OSS dependencies it ships with.

## Theme replacement options if needed (engineering reference)

Permissively-licensed alternatives that are commonly used as
SaaS-suitable replacements for Skote-style admin templates:

| Replacement | Licence | Pros | Cons |
|-------------|---------|------|------|
| Tabler | MIT | Active development, modern Bootstrap 5, good docs | Different layout patterns; requires re-skin |
| CoreUI Free | MIT | Long-standing, multiple framework variants | Free version is limited; pro version is Envato-class |
| AdminLTE 3+ | MIT | Mature, widely supported | Older visual style |
| Internal CSS on Bootstrap 5 | n/a | Maximum control, no third-party risk | Larger engineering investment |
